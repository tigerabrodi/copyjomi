import { z } from 'zod'

export type ValueOf<T> = T[keyof T]

export const contentNames = {
  headline: 'Headline',
  text: 'Text',
  twitter: 'Twitter',
  linkedin: 'LinkedIn',
} as const

export type ContentNameValue = ValueOf<typeof contentNames>

export const messageSchema = z.object({
  role: z.string(),
  content: z.string(),
})

export const choiceSchema = z.object({
  message: messageSchema,
  finish_reason: z.string().nullable(),
  index: z.number(),
})
