export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface AboutPage {
  storyTitle: string;
  storyParagraphs: string[];
  teamTitle: string;
  teamDescription: string;
  teamMembers: TeamMember[];
} 