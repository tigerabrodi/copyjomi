import type { DataFunctionArgs } from '@remix-run/node'

import { Listbox } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Form, Link, useActionData, useTransition } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { choiceSchema, contentNames } from '~/schemas'
import { parseContent } from '~/utils'
import { generatePromptWithContentAndType } from '~/utils/generatePromptWithContentAndType'

const SELECTED_CONTENT_TYPE_NAME = 'selectedContentType'

const typeOfContents = [
  { id: 1, name: contentNames.headline },
  { id: 2, name: contentNames.text },
  { id: 3, name: contentNames.twitter },
  { id: 4, name: contentNames.linkedin },
] as const

export default function Index() {
  const [selectedContent, setSelectedContent] = useState(typeOfContents[0])
  const actionData = useActionData<typeof action>()
  const [content, setContent] = useState(actionData?.parsedContent ?? '')
  const transition = useTransition()
  const isSubmitting = transition.state === 'submitting'

  useEffect(() => {
    if (actionData?.parsedContent) {
      setContent(actionData.parsedContent)
    }
  }, [actionData])

  return (
    <>
      <nav className="flex h-20 w-full items-center pl-24">
        <Link to="/" className="text-3xl font-bold text-white">
          Copyjomi
        </Link>
      </nav>
      <main className="flex h-full w-full flex-col items-center">
        <div className="flex flex-col items-center pt-8">
          <h1 className="text-5xl font-medium text-white">
            Stop struggling with copywriting!
          </h1>
          <p className="mt-4 text-2xl text-navy-light">
            Let <span className="font-medium text-white">AI</span> rewrite your
            content and get more traction.
          </p>
        </div>

        <Form
          className="mt-20 flex w-[800px] flex-col items-center [row-gap:30px]"
          method="post"
        >
          <div className="relative flex w-full flex-col [row-gap:15px]">
            <label htmlFor="select" className="text-xl font-medium text-white">
              Type of content
            </label>

            <Listbox value={selectedContent} onChange={setSelectedContent}>
              <Listbox.Button className="flex h-9 w-full items-center justify-between rounded-sm bg-white px-2 text-lg font-medium text-navy-dark">
                <span>{selectedContent.name}</span>

                <ChevronUpDownIcon
                  aria-hidden="true"
                  className="h-5 w-5 text-navy-dark"
                />
              </Listbox.Button>
              <Listbox.Options className="absolute top-24 flex w-[655px] flex-col overflow-auto rounded-sm bg-white p-1 [row-gap:8px]">
                {typeOfContents.map((content) => (
                  <Listbox.Option
                    key={content.id}
                    value={content}
                    className="rounded-sm bg-navy-medium py-1 pl-2 text-lg font-medium text-white hover:bg-navy-dark"
                  >
                    {content.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>

          <div className="flex w-full flex-col [row-gap:15px]">
            <label htmlFor="content" className="text-xl font-medium text-white">
              Content
            </label>
            <textarea
              name="content"
              id="content"
              required
              className="h-80 w-full rounded-sm bg-white pl-3 pt-3 text-lg font-medium text-navy-dark"
            />
          </div>

          <input
            type="hidden"
            name={SELECTED_CONTENT_TYPE_NAME}
            value={selectedContent.name}
          />

          <button
            type="submit"
            className="mt-11 rounded-sm bg-white px-[10px] py-2 text-lg font-bold text-navy-dark hover:bg-navy-light"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Generating content...' : 'Generate better content'}
          </button>
        </Form>

        <div className="mt-16 flex flex-col items-center">
          <h2 className="mb-4 text-4xl font-medium text-white">Results</h2>

          {actionData?.parsedContent && (
            <textarea
              className="mt-4 h-72 w-[750px] whitespace-pre-wrap rounded-md bg-white p-2 text-lg leading-5 text-navy-dark"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          )}
        </div>
      </main>
    </>
  )
}

const FormSchema = zfd.formData(
  z.object({
    [SELECTED_CONTENT_TYPE_NAME]: z.union([
      z.literal(contentNames.headline),
      z.literal(contentNames.text),
      z.literal(contentNames.twitter),
      z.literal(contentNames.linkedin),
    ]),
    content: z.string(),
  })
)

const responseSchema = z.array(choiceSchema)

export async function action({ request }: DataFunctionArgs) {
  const { content, selectedContentType } = FormSchema.parse(
    await request.formData()
  )

  const prompt = generatePromptWithContentAndType({
    content,
    selectedContentType,
  })

  const payload = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
    max_tokens: 3000,
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })

  const data = await response.json()

  const choices = responseSchema.parse(data.choices)
  const choice = choices[0]

  const parsedContent = parseContent(choice.message.content)

  return { parsedContent }
}
