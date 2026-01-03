export type SocialLink = {
  name: string
  url: string
  icon: 'github' | 'twitter' | 'linkedin' | 'email' | 'huggingface'
}

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/goldbar123467', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/clarkkitchen', icon: 'linkedin' },
  { name: 'HuggingFace', url: 'https://huggingface.co/clarkkitchen22', icon: 'huggingface' },
  { name: 'Email', url: 'mailto:clarkkitchen22@gmail.com', icon: 'email' },
]
