import { expect } from 'chai'
import { resolve } from 'path'
import { mkdtempSync, existsSync } from 'fs'
import { tmpdir } from 'os'
import { FileDescriptor, file } from '../src/file'
import { DirectoryDescriptor } from '../src/directory'
import { createStructureDescriptor, makeStructure, makeStructureSync } from '../src/structure'

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

describe('Test makeStructure function', () => {
  let tempPath: string

  before(() => {
    tempPath = mkdtempSync(tmpdir() + '\\')
  })

  it('should create folders structure asynchronously', async () => {
    const hiTxtPath = resolve(tempPath, 'hi.txt')
    const folder1Path = resolve(tempPath, 'folder1')
    const folderPath = resolve(tempPath, 'folder1', 'folder')
    const folderFolderPath = resolve(tempPath, 'folder1', 'folder', 'folder')
    const emptyFolderPath = resolve(tempPath, 'folder1', 'empty folder')
    const fooPath = resolve(tempPath, 'folder1', 'foo.txt')
    const barPath = resolve(tempPath, 'folder1', 'bar.txt')
    const folder2Path = resolve(tempPath, 'folder2')

    const descriptor = new DirectoryDescriptor(resolve(tempPath), [
      new FileDescriptor(hiTxtPath, 'hi'),
      new DirectoryDescriptor(folder1Path, [
        new DirectoryDescriptor(folderPath, [
          new DirectoryDescriptor(folderFolderPath, [])
        ]),
        new DirectoryDescriptor(emptyFolderPath, []),
        new FileDescriptor(fooPath, ''),
        new FileDescriptor(barPath, '')
      ]),
      new DirectoryDescriptor(folder2Path, [])
    ])

    await makeStructure(descriptor)

    const pathes = [
      hiTxtPath,
      folder1Path,
      folderPath,
      folderFolderPath,
      emptyFolderPath,
      fooPath,
      barPath,
      folder2Path
    ]

    pathes.forEach((value) => {
      expect(existsSync(value)).to.be.true
    })
  })
})

describe('Test makeStructureSync function', () => {
  let tempPath: string

  before(() => {
    tempPath = mkdtempSync(tmpdir() + '\\')
  })

  it('should create folders structure synchronously', () => {
    const hiTxtPath = resolve(tempPath, 'hi.txt')
    const folder1Path = resolve(tempPath, 'folder1')
    const folderPath = resolve(tempPath, 'folder1', 'folder')
    const folderFolderPath = resolve(tempPath, 'folder1', 'folder', 'folder')
    const emptyFolderPath = resolve(tempPath, 'folder1', 'empty folder')
    const fooPath = resolve(tempPath, 'folder1', 'foo.txt')
    const barPath = resolve(tempPath, 'folder1', 'bar.txt')
    const folder2Path = resolve(tempPath, 'folder2')

    const descriptor = new DirectoryDescriptor(resolve(tempPath), [
      new FileDescriptor(hiTxtPath, 'hi'),
      new DirectoryDescriptor(folder1Path, [
        new DirectoryDescriptor(folderPath, [
          new DirectoryDescriptor(folderFolderPath, [])
        ]),
        new DirectoryDescriptor(emptyFolderPath, []),
        new FileDescriptor(fooPath, ''),
        new FileDescriptor(barPath, '')
      ]),
      new DirectoryDescriptor(folder2Path, [])
    ])

    makeStructureSync(descriptor)

    const pathes = [
      hiTxtPath,
      folder1Path,
      folderPath,
      folderFolderPath,
      emptyFolderPath,
      fooPath,
      barPath,
      folder2Path
    ]

    pathes.forEach((value) => {
      expect(existsSync(value)).to.be.true
    })
  })
})