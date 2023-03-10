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
      return `This is my headline: ${content}. I want to generate three different headlines that are better than this one. The headlines should be good copywriting. They should make people click on the link. They should be eye-catching, concise and impactful.`
    case contentNames.text:
      return `This is my text: ${content}. I want to generate three different texts that are better than this one. The texts should be concise, in plain language, simple, clear and easy to digest. Don't make the paragraphs too long. Make sure there is a breakline between paragraphs for some space.`
    case contentNames.twitter:
      return `This is a tweet: ${content}. On Twitter the maximum number of characters is 280. I want to generate three different tweets that are better than this one. The first line of the tweets should be eye-catching, strong and make people stop scrolling the feed. Make the first line concise and make sure there is a breakline afterward for some space. The rest of the text should be concise, clear and impactful. Keep the language plain so the readers can connect with it. Do not include hashtags or mentions. Make sure the last sentence of the post is a nice conclusion or punchline, and it should have a breakline before that for some space. Prefix each tweet with 1, 2 or 3 so I know the differences.`
    case contentNames.linkedin:
      return `This is a LinkedIn post: ${content}. On LinkedIn the maximum number of characters is 3000. I want to generate three different posts that are better than this one. The first line of the posts should be eye-catching, strong and make people stop scrolling the feed. Make the first line concise and make sure there is a breakline afterward for some space. The rest of the text should be concise, clear and impactful. It should be nicely structured and paragraphs shouldn't be too long because then it gets tiring to read. Keep the language plain so the readers can connect with it. Do not include hashtags or mentions. Make sure the last sentence of the post is a nice conclusion or punchline, and it should have a breakline before that for some space. Prefix each post with 1, 2 or 3 so I know the differences.`
  }
}
