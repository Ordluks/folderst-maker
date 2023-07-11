import R from 'ramda'
import { resolve } from 'path'
import { DirectoryInfo, DirectoryDescriptor, makeDirectorySync } from './directory'
import { FileInfo, FileDescriptor, makeFileSync } from './file'

type FileOrDirectoryDescriptor = FileDescriptor | DirectoryDescriptor

export const createStructureDescriptor = (
  info: DirectoryInfo,
  path: string
): DirectoryDescriptor => {
  const mapInfo = (info: DirectoryInfo, path: string): FileOrDirectoryDescriptor[] =>
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

export const makeSync = (descriptor: DirectoryDescriptor) => {
  const _makeSync = (descriptor: DirectoryDescriptor, index: number) => {
    if (index >= descriptor.content.length) return

    const contentItem = descriptor.content[index]

    if(R.is(FileDescriptor, contentItem)) {
      makeFileSync(contentItem)
    } else if (R.is(DirectoryDescriptor, contentItem)) {
      makeDirectorySync(contentItem)
      makeSync(contentItem)
    }

    _makeSync(descriptor, index + 1)
  }

  _makeSync(descriptor, 0)
}

