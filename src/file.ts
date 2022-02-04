import { existsSync, writeFileSync } from 'fs'
import { isString } from 'lodash'
import { resolve } from 'path'


export type FileContent = string | Object | Array<any>

export class File {
	content: FileContent

	constructor(content: FileContent) {
		this.content= content
	}
}

export const file = (content?: FileContent) => new File(content || '')

export const makeFile = (path: string, name: string, content: FileContent) => {
	const fileContent = isString(content) ? content : JSON.stringify(content, null, 2)
	if (existsSync(path)) writeFileSync(resolve(path, name), fileContent)
}