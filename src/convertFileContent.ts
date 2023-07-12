import R from 'ramda'
import { FileContent } from './file'

const notNumber = (content: FileContent) =>
  R.is(Number, content) ? String(content) : content
const conventBuffer = (content: string | Object | Buffer) =>
  R.is(Buffer, content) ? content.toString('utf-8') : content
const conventObject = (contnet: string | Object) =>
  R.is(String, contnet) ? contnet : JSON.stringify(contnet, null, 2)

const convertFileContent = R.compose(conventObject, conventBuffer, notNumber)

export default convertFileContent
