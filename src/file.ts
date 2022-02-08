import { existsSync, writeFileSync } from 'fs'
import { isString } from 'lodash'
import { resolve } from 'path'


export type FileContent = string | Object | Array<any>

export class File {
	content: FileContent
	encoding: BufferEncoding

	constructor(content: FileContent, encoding: BufferEncoding) {
		this.content = content,
		this.encoding = encoding
	}
}

export const file = (content: FileContent = '', encoding: BufferEncoding = 'utf-8') => new File(content, encoding)

export const makeFile = (path: string, name: string, content: FileContent, encoding: BufferEncoding) => {
	const fileContent = isString(content) ? content : JSON.stringify(content, null, 2)
	if (existsSync(path)) writeFileSync(resolve(path, name), fileContent, { encoding })
}