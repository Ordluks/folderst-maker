import { expect } from 'chai'
import { mkdtemp } from 'fs/promises'
import { existsSync, mkdtempSync, readFileSync } from 'fs'
import { tmpdir } from 'os'
import {
  FileDescriptor,
  FileInfo,
  file,
  makeFile,
  makeFileSync
} from '../src/file'
import { resolve } from 'path'

describe('Test file function', () => {
  it('shoud return FileInfo', () => {
    const text = 'this is just some useless text'
    const info = file(text)
    expect(info).to.be.an.instanceof(FileInfo)
    expect(info).to.include({ content: text })
  })
})

describe('Test makeFile function', () => {
  let tempPath: string

  before(async () => {
    tempPath = await mkdtemp(tmpdir() + '\\')
  })

  it('should create file asynchronously', async () => {
    const path = resolve(tempPath, 'file.txt')
    const content = '!i!i!i!i'
    await makeFile(new FileDescriptor(path, content))
    expect(existsSync(path)).to.be.true
    expect(readFileSync(path, { encoding: 'utf-8' })).to.be.equal(content)
  })
})

describe('Test makeFileSync function', () => {
  let tempPath: string

  before(() => {
    tempPath = mkdtempSync(tmpdir() + '\\')
  })

  it('should create file synchronously', () => {
    const path = resolve(tempPath, 'file_.txt')
    const content = '!i!i!i!i!i!i'
    makeFileSync(new FileDescriptor(path, content))
    expect(existsSync(path)).to.be.true
    expect(readFileSync(path, { encoding: 'utf-8' })).to.be.equal(content)
  })
})
