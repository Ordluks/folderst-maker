import { forEach, isNull } from 'lodash'
import { is } from 'ramda'
import { makeFolder, Folder } from './folder'
import { makeFile, File } from './file'


const structure = (folders: Folder, root: string = process.cwd()) => {
	forEach(Object.entries(folders), value => {
		const [name, item] = value
		if (is(File, item)) {
			makeFile(root, name, item.content, item.encoding)
		}
		else if (isNull(item)) {}
		else {
			const folderPath = makeFolder(root, name)
			structure(item, folderPath)
		}
	})
}

export default structure