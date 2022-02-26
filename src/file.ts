import { existsSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { is } from 'ramda'
import conventFileContent from './conventFileContent'


export type FileContent = string | number | Buffer | Object

export class File {
	readonly content: FileContent
	readonly encoding: BufferEncoding

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