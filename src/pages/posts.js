import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import PostList from "../components/PostList"

const PostsPage = () => {
  const posts = useStaticQuery(graphql`
    query ArticlesQuery {
      allFile(
        filter: {
          sourceInstanceName: { eq: "posts" }
          childMarkdownRemark: { frontmatter: { draft: { ne: true } } }
          extension: { eq: "md" }
        }
        sort: { fields: childMarkdownRemark___frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            childMarkdownRemark {
              frontmatter {
                title
                tags
                language
                date(formatString: "MMM DD, YYYY")
              }
              id
            }
          }
        }
      }
    }
  `).allFile.edges.map((x) => ({ node: x.node.childMarkdownRemark }))
  return (
    <Layout>
      <SEO title="Posts" />
      <header className="section-header">Posts</header>
      <PostList posts={posts} />
    </Layout>
  )
}

export default PostsPage
