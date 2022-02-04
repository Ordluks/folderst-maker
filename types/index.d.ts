declare module 'folderst-maker' {
	export function structure(folders: Folder, root?: string): void
	export function file(content?: FileContent): File

	class File {
		content: FileContent
		constructor(content: FileContent)
	}

	type FileContent = string | Object | Array<any>

	type Folder = {
		[key: string]: Folder | File
	}
}