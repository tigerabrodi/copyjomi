import { Listbox } from '@headlessui/react'
import { Form, Link } from '@remix-run/react'
import { useState } from 'react'

const typeOfContents = [
  { id: 1, name: 'headline' },
  { id: 2, name: 'text' },
  { id: 3, name: 'tweet' },
  { id: 4, name: 'linkedin' },
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
          <p className="mt-3 text-2xl text-navy-light">
            Let <span className="font-medium text-white">AI</span> rewrite your
            content and get more traction.
          </p>
        </div>

        <Form className="mt-20 flex w-[655px] flex-col items-center [row-gap:30px]">
          <div className="flex w-full flex-col [row-gap:15px]">
            <label htmlFor="select" className="text-xl font-medium text-white">
              Type of content
            </label>

            <Listbox value={selectedContent} onChange={setSelectedContent}>
              <Listbox.Button className="flex h-8 w-full items-center rounded-sm bg-white pl-3 text-lg font-medium text-navy-dark">
                {selectedContent.name}
              </Listbox.Button>
              <Listbox.Options>
                {typeOfContents.map((content) => (
                  <Listbox.Option key={content.id} value={content}>
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
              className="h-32 w-full rounded-sm bg-white text-navy-dark"
            />
          </div>

          <button
            type="submit"
            className="mt-11 rounded-md bg-white p-[10px] font-bold text-navy-dark"
          >
            Generate better content
          </button>
        </Form>

        <div className="mt-16 flex flex-col items-center">
          <h2 className="text-4xl font-medium text-white">Results</h2>
        </div>
      </main>
    </>
  )
}
