export const parseContent = (content: string): string => {
  // remove the first two newlines
  const formattedContent = content.replace(/^\n{2}/, '')

  // remove any leading or trailing whitespace
  const trimmedContent = formattedContent.trim()

  return trimmedContent
}
