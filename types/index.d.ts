declare module 'folderst-maker' {
	export function structure(folders: Folder, root?: string): void
	export function file(content?: FileContent, encoding?: BufferEncoding): File

	class File {
		readonly content: FileContent
		readonly encoding: BufferEncoding
		constructor(content: FileContent, encoding: BufferEncoding)
	}

	type FileContent = string | number | Buffer | Object

	type Folder = {
		[key: string]: Folder | File
	}
}