import { existsSync, writeFileSync } from 'fs'
import { isArray, isBuffer, isNumber, isObject, isString } from 'lodash'
import { resolve } from 'path'
import conventFileContent from './conventFileContent'


export type FileContent = string | number | Buffer | Object

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
	const fileContent = conventFileContent(content)
	if (existsSync(path)) writeFileSync(resolve(path, name), fileContent, { encoding })
}