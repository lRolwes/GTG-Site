import { client } from './sanity-client'
import { AboutPage } from '@/app/types'

export async function fetchAboutPage(): Promise<AboutPage> {
  return await client.fetch(
    `*[_type == "aboutPage"][0]{
      storyTitle,
      storyParagraphs,
      teamTitle,
      teamDescription,
      "teamMembers": teamMembers[]{
        name,
        role,
        bio,
        "image": image.asset->url
      }
    }`
  )
} 