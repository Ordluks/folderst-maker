import { existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'
import { File } from './file'


export type Folder = {
	[key: string]: Folder | File
}

export const makeFolder = (path: string, name: string) => {
	const folderPath = resolve(path, name)
	mkdirSync(folderPath, { recursive: true })
	return folderPath
}