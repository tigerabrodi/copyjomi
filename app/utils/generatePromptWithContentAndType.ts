import type { ContentNameValue } from '~/schemas'

import { contentNames } from '~/schemas'

export function generatePromptWithContentAndType({
  content,
  selectedContentType,
}: {
  selectedContentType: ContentNameValue
  content: string
}) {
  switch (selectedContentType) {
    case contentNames.headline:
      return `This is my headline: ${content}. I want to generate a headline that's better than this one. The headline should be good copywriting. It should make people click on the link. It should be eye-catching, persuasive and impactful. It can not be longer than 50 characters.`
    case contentNames.text:
      return `This is my text: ${content}. I want generate a text that's better than this one. The text should be concise, in plain language, simple, clear and easy to digest. Don't shorten the text if that loses clarity. Don't make the paragraphs of the text too long. Add breaklines in the text. For each breakline, put "\n\n".`
    case contentNames.twitter:
      return `This is a tweet: ${content}. The entire tweet can not be longer than 280 characters. I want one tweet that's better than this one. The first line of the tweet should be eye-catching, persuasive and make people stop scrolling the feed. Make the first line concise and no longer than 50 characters. After the first line there should be a breakline. Then we want a body text and a last line after the body with a breakline that's a conclusion. Keep the language plain so the readers can connect with it. For each breakline, put "\n\n". Body text can not be longer than 150.`
    case contentNames.linkedin:
      return `This is a LinkedIn post: ${content}. I want one post that's better than this one. The first line of the post should be eye-catching, persuasive and make people stop scrolling the feed. Make the first line concise and no longer than 50 characters without double quotes. After the first line there should be a breakline. Then we want a body text and a last line after the body with a breakline that's a conclusion. Keep the language plain so the readers can connect with it. For each breakline, put "\n\n". Body text can not be longer than 205 characters.`
  }
}
