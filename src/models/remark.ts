export type ChildMarkdownRemark<Frontmatter = Record<string, string>> = {
  id: string
  frontmatter: Frontmatter
  html: string
}
