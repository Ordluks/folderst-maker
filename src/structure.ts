import { forEach } from 'lodash'
import { is } from 'ramda'
import { makeFolder, Folder } from './folder'
import { makeFile, File } from './file'


export type FolderStructure = (Folder | File)[]


const structure = (folders: FolderStructure, root: string = process.cwd()) => forEach(folders, value => {
	if (is(Folder, value)) {
		const { name, inner } = value
		const folderPath = makeFolder(root, name)
		structure(inner, folderPath)
	}
	// else if (isFile(value)) {

	// }
})

export default structure