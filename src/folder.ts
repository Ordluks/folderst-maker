import { existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'
import { FolderStructure } from './structure'


export class Folder {
	name: string
	inner?: FolderStructure

	constructor(name: string, inner?: FolderStructure) {
		this.name = name
		this.inner = inner
	}
}


type FolderFabricParams = {
	name: string
	inner?: FolderStructure
}

export const folder = ({ name, inner }: FolderFabricParams) => new Folder(name, inner)


export const makeFolder = (path: string, name: string) => {
	if (existsSync(path)) {
		const folderPath = resolve(path, name)
		mkdirSync(folderPath)
		return folderPath
	}
}