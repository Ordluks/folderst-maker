import { isBuffer, isNumber } from 'lodash'
import { compose, is } from 'ramda'
import { FileContent } from './file'


const notNumber = (content: FileContent) => isNumber(content) ? String(content) : content
const conventObject = (contnet: string | Object | Buffer) => is(Buffer, contnet) ? contnet : JSON.stringify(contnet, null, 2)

const conventFileContent = compose(conventObject, notNumber)

export default conventFileContent