import { isNumber } from 'lodash'
import { compose, is } from 'ramda'
import { FileContent } from './file'

const notNumber = (content: FileContent) =>
  isNumber(content) ? String(content) : content
const conventBuffer = (content: string | Object | Buffer) =>
  is(Buffer, content) ? content.toString('utf-8') : content
const conventObject = (contnet: string | Object) =>
  is(String, contnet) ? contnet : JSON.stringify(contnet, null, 2)

const convertFileContent = compose(conventObject, conventBuffer, notNumber)

export default convertFileContent
