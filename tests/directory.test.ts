import { expect } from 'chai'
import { mkdtemp } from 'fs/promises'
import { existsSync, mkdtempSync } from 'fs'
import { tmpdir } from 'os'
import { DirectoryDescriptor, makeDirectory, makeDirectorySync } from '../src/directory'
import { resolve } from 'path'

describe('Test makeDirectory function', () => {
  let tempPath: string

  before(async () => {
    tempPath = await mkdtemp(tmpdir() + '\\')
  })

  it('should create directory asynchronously', async () => {
    const path = resolve(tempPath, 'dir')
    await makeDirectory(new DirectoryDescriptor(path, []))
    expect(existsSync(path)).to.be.true
  })
})

describe('Test makeDirectorySync function', () => {
  let tempPath: string

  before(() => {
    tempPath = mkdtempSync(tmpdir() + '\\')
  })

  it('should create directory synchronously', () => {
    const path = resolve(tempPath, 'dir_')
    makeDirectorySync(new DirectoryDescriptor(path, []))
    expect(existsSync(path)).to.be.true
  })
})