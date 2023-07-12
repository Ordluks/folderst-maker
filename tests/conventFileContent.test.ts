import R from 'ramda'
import { expect } from 'chai'
import convertFileContent from '../src/convertFileContent'

describe('Test conventing file content to string', () => {
  const testThisMotherF_cker = (input: any, expected: any) => {
    it(`should return string from ${R.toLower(
      input.__proto__.constructor.name
    )}`, () => {
      expect(convertFileContent(input)).to.equal(expected)
    })
  }

  const str = 'ok, dude'
  testThisMotherF_cker(str, str)

  const num = 1000
  testThisMotherF_cker(num, String(num))

  const obj = { foo: 'bar' }
  testThisMotherF_cker(obj, JSON.stringify(obj, null, 2))

  const buf = Buffer.from('Jopa')
  testThisMotherF_cker(buf, buf.toString())
})
