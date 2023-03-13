import type { LinksFunction, MetaFunction } from '@remix-run/node'

import Roboto400 from '@fontsource/roboto/400.css'
import Roboto500 from '@fontsource/roboto/500.css'
import Roboto700 from '@fontsource/roboto/700.css'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import styles from './tailwind.css'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'stylesheet', href: Roboto400 },
  { rel: 'stylesheet', href: Roboto500 },
  { rel: 'stylesheet', href: Roboto700 },
]

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Copyjomi',
  description: 'A tool to help with writing better content.',
  viewport: 'width=device-width,initial-scale=1',
  keywords:
    'copywriting, content, writing, write, better, ai, chatgpt, copyjomi',
  'og:title': 'Copyjomi',
  'og:type': 'website',
  'og:url': 'https://www.copyjomi.com/',
  'og:image':
    'https://user-images.githubusercontent.com/49603590/224631291-18ceaa9e-4797-4a9d-a00a-f5fe8516b28f.png',
  'og:card': 'summary_large_image',
  'og:creator': '@tabrodi',
  'og:site': 'https://www.copyjomi.com/',
  'og:description': 'A tool to help with writing better content.',
  'twitter:image':
    'https://user-images.githubusercontent.com/49603590/224631291-18ceaa9e-4797-4a9d-a00a-f5fe8516b28f.png',
  'twitter:card': 'summary_large_image',
  'twitter:creator': '@tabrodi',
  'twitter:title': 'Copyjomi',
  'twitter:description': 'A tool to help with writing better content.',
})

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-navy-dark">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
