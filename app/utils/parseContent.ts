export function parseContent(content: string) {
  const regex = /\d+\.\s+(.+?)(?=\n\d+\.\s+|$)/gs
  const matches = content.matchAll(regex)
  const result = []

  for (const match of matches) {
    result.push(match[1].trim())
  }

  return result
}
