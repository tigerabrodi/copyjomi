import { expect, it } from 'vitest'

import { parseContent } from './parseContent'

const message = {
  content:
    '\n' +
    '\n' +
    'Boost Productivity with TDD! \n' +
    '\n' +
    'Are you tired of feeling lost and overwhelmed? Test Driven Development (TDD) can help. By focusing on one thing at a time, you can streamline your workflow and increase productivity. Give it a try! \n' +
    '\n' +
    'Try TDD today and experience the benefits for yourself.',
}

it('should parse content, content should return a string that is formatted nicely for textarea', () => {
  expect(parseContent(message.content)).toMatchInlineSnapshot(`
    "Boost Productivity with TDD! 

    Are you tired of feeling lost and overwhelmed? Test Driven Development (TDD) can help. By focusing on one thing at a time, you can streamline your workflow and increase productivity. Give it a try! 

    Try TDD today and experience the benefits for yourself."
  `)
})
