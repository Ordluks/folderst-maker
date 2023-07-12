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

export const makeDirectory = async (folder: DirectoryDescriptor) => {
  await mkdir(folder.path)
}

export const makeDirectorySync = (folder: DirectoryDescriptor) => {
  mkdirSync(folder.path)
}
