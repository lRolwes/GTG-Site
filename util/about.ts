import { client } from './sanity-client'
import { AboutPage } from '@/app/types'

export async function fetchAboutPage(): Promise<AboutPage> {
  const aboutPage = await client.fetch(
    `*[_type == "aboutPage"][0]{
      storyTitle,
      storyParagraphs,
      teamTitle,
      teamDescription,
      teamMembers[]{
        name,
        role,
        bio,
        "image": image.asset->url
      }
    }`
  );
  console.log(aboutPage);
  return aboutPage;
} 