import { existsSync, writeFileSync } from 'fs'
import { isString } from 'lodash'
import { resolve } from 'path'


export type FileContent = string | Object | Array<any>

export class File {
	name: string
	content?: FileContent

	constructor(name: string, content?: FileContent) {
		this.name = name
		this.content = content
	}
}


type FileFabricParams = {
	name: string
	content?: FileContent
}

export const file = ({ name, content }: FileFabricParams) => new File(name, content)


export const makeFile = (path: string, name: string, content: FileContent) => {
	const fileContent = isString(content) ? content : JSON.stringify(content, null, 2)
	if (existsSync(path)) writeFileSync(resolve(path, name), fileContent)
}