import { Listbox } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { DataFunctionArgs } from '@remix-run/node'
import { Form, Link } from '@remix-run/react'
import { useState } from 'react'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

const SELECTED_CONTENT_TYPE_NAME = 'selectedContentType'

const typeOfContents = [
  { id: 1, name: 'Headline' },
  { id: 2, name: 'Text' },
  { id: 3, name: 'Twitter' },
  { id: 4, name: 'LinkedIn' },
] as const

export default function Index() {
  const [selectedContent, setSelectedContent] = useState(typeOfContents[0])

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

        <Form className="mt-20 flex w-[655px] flex-col items-center [row-gap:30px]">
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
              className="h-48 w-full rounded-sm bg-white pl-3 pt-3 text-lg font-medium text-navy-dark"
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
          >
            Generate new content
          </button>
        </Form>

        <div className="mt-16 flex flex-col items-center">
          <h2 className="mb-4 text-4xl font-medium text-white">Results</h2>

          <p className="max-w-3xl rounded-md bg-white p-2 text-lg leading-5 text-navy-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </main>
    </>
  )
}

const FormSchema = zfd.formData(
  z.object({
    [SELECTED_CONTENT_TYPE_NAME]: z.string(),
    content: z.string(),
  })
)

export async function action({ request }: DataFunctionArgs) {
  const { content, selectedContentType } = FormSchema.parse(
    await request.formData()
  )
}
