import R from 'ramda'
import { resolve } from 'path'
import {
  DirectoryInfo,
  DirectoryDescriptor,
  makeDirectory,
  makeDirectorySync
} from './directory'
import { FileInfo, FileDescriptor, makeFile, makeFileSync } from './file'

type FileOrDirectoryDescriptor = FileDescriptor | DirectoryDescriptor

export const createStructureDescriptor = (
  info: DirectoryInfo,
  path: string
): DirectoryDescriptor => {
  const mapInfo = (
    info: DirectoryInfo,
    path: string
  ): FileOrDirectoryDescriptor[] =>
    R.reduce(
      (acc, [key, value]) => {
        const itemPath = resolve(path, key)

        if (value === null) return [...acc]
        const contentDescriptor = R.is(FileInfo, value)
          ? new FileDescriptor(itemPath, value.content)
          : new DirectoryDescriptor(itemPath, mapInfo(value, itemPath))

        return [...acc, contentDescriptor]
      },
      [] as FileOrDirectoryDescriptor[],
      Object.entries(info)
    )

  return {
    path: resolve(path),
    content: mapInfo(info, path)
  }
}

export const makeStructure = async (descriptor: DirectoryDescriptor) => {
  const _make = async (descriptor: DirectoryDescriptor, index: number) => {
    if (index >= descriptor.content.length) return

    const contentItem = descriptor.content[index]

    if (R.is(FileDescriptor, contentItem)) {
      await makeFile(contentItem)
    } else if (R.is(DirectoryDescriptor, contentItem)) {
      await makeDirectory(contentItem)
      await makeStructure(contentItem)
    }

    await _make(descriptor, index + 1)
  }

  await _make(descriptor, 0)
}

export const makeStructureSync = (descriptor: DirectoryDescriptor) => {
  const _makeSync = (descriptor: DirectoryDescriptor, index: number) => {
    if (index >= descriptor.content.length) return

    const contentItem = descriptor.content[index]

    if (R.is(FileDescriptor, contentItem)) {
      makeFileSync(contentItem)
    } else if (R.is(DirectoryDescriptor, contentItem)) {
      makeDirectorySync(contentItem)
      makeStructureSync(contentItem)
    }

    _makeSync(descriptor, index + 1)
  }

  _makeSync(descriptor, 0)
}

export const structure = R.compose(makeStructure, createStructureDescriptor)
export const structureSync = R.compose(makeStructureSync, createStructureDescriptor)
