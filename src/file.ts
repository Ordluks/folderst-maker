import R from 'ramda'
import { writeFileSync } from 'fs'
import { writeFile } from 'fs/promises'
import { resolve } from 'path'
import convertFileContent from './convertFileContent'

export type FileContent = string | number | Buffer | Object

export class FileDescriptor {
  readonly path: string
  readonly content: FileContent

  constructor(path: string, content: FileContent) {
    this.path = path
    this.content = content
  }
}

export class FileInfo {
  readonly content: FileContent

  constructor(content: FileContent) {
    this.content = content
  }
}

export const file = (content: FileContent = '') => new FileInfo(content)

const createFileMaker =
  <R extends void | Promise<void>>(fn: (path: string, content: string) => R) =>
  (file: FileDescriptor) => {
    const { path, content } = file
    const fileContent = convertFileContent(content)
    return fn(path, fileContent)
  }

export const makeFile = createFileMaker(R.partialRight(writeFile, ['utf-8']))

export const makeFileSync = createFileMaker(
  R.partialRight(writeFileSync, ['utf-8'])
)
