import R from 'ramda'
import { mkdirSync } from 'fs'
import { mkdir } from 'fs/promises'
import { resolve } from 'path'
import { FileInfo, FileDescriptor } from './file'

export class DirectoryDescriptor {
  readonly path: string
  readonly content: (FileDescriptor | DirectoryDescriptor)[]

  constructor(path: string, content: (FileDescriptor | DirectoryDescriptor)[]) {
    this.path = path
    this.content = content
  }
}

export interface DirectoryInfo {
  [key: string]: DirectoryInfo | FileInfo | null
}

const createDirectoryMaker =
  <R extends string | undefined | Promise<string | undefined>>(
    fn: (path: string) => R
  ) =>
  (folder: DirectoryDescriptor) => {
    return fn(resolve(folder.path))
  }

export const makeDirectory = createDirectoryMaker(
  R.partialRight(mkdir, [{ recursive: true }])
)

export const makeDirectorySync = createDirectoryMaker(
  R.partialRight(mkdirSync, [{ recursive: true }])
)
