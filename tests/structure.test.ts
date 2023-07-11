import { expect } from 'chai'
import { resolve } from 'path'
import { mkdtempSync } from 'fs'
import { tmpdir } from 'os'
import { FileDescriptor, file } from '../src/file'
import { DirectoryDescriptor } from '../src/directory'
import { createStructureDescriptor, makeSync } from '../src/structure'


describe('Test createStructureDescriptor function', () => {
  it('should return DirectoryDiscriptor', () => {
    const discriptor = createStructureDescriptor(
      {
        ['hi.txt']: file('hi'),
        folder1: {
          folder: {
            folder: {}
          },
          ['empty folder']: {},
          ['foo.txt']: file(),
          ['bar.txt']: file()
        },
        folder2: {}
      },
      ''
    )

    expect(discriptor).to.deep.equal(
      new DirectoryDescriptor(resolve(''), [
        new FileDescriptor(resolve('hi.txt'), 'hi'),
        new DirectoryDescriptor(resolve('', 'folder1'), [
          new DirectoryDescriptor(resolve('', 'folder1', 'folder'), [
            new DirectoryDescriptor(
              resolve('', 'folder1', 'folder', 'folder'),
              []
            )
          ]),
          new DirectoryDescriptor(resolve('', 'folder1', 'empty folder'), []),
          new FileDescriptor(resolve('', 'folder1', 'foo.txt'), ''),
          new FileDescriptor(resolve('', 'folder1', 'bar.txt'), '')
        ]),
        new DirectoryDescriptor(resolve('', 'folder2'), [])
      ])
    )
  })
})

describe('Test makeSync function', () => {
  let tempPath: string

  before(() => {
    tempPath = mkdtempSync(tmpdir() + '\\')
  })

  it('should create folders structure synchronously', function() {
    this.timeout(60 * 1000)

    const descriptor = new DirectoryDescriptor(resolve(tempPath), [
      new FileDescriptor(resolve(tempPath, 'hi.txt'), 'hi'),
      new DirectoryDescriptor(resolve(tempPath, 'folder1'), [
        new DirectoryDescriptor(resolve(tempPath, 'folder1', 'folder'), [
          new DirectoryDescriptor(
            resolve(tempPath, 'folder1', 'folder', 'folder'),
            []
          )
        ]),
        new DirectoryDescriptor(resolve(tempPath, 'folder1', 'empty folder'), []),
        new FileDescriptor(resolve(tempPath, 'folder1', 'foo.txt'), ''),
        new FileDescriptor(resolve(tempPath, 'folder1', 'bar.txt'), '')
      ]),
      new DirectoryDescriptor(resolve(tempPath, 'folder2'), [])
    ])

    makeSync(descriptor)
  })
})
