import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import PostList from "../components/PostList"
import "./index.scss"

const IndexPage = () => {
  const { edges: posts } = useStaticQuery(graphql`
    query IndexQuery {
      allMarkdownRemark(
        filter: {
          frontmatter: { draft: { ne: true } }
          fileAbsolutePath: { regex: "/posts/.*\\\\.md$/" }
        }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 5
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              tags
              language
              date(formatString: "MMMM DD, YYYY")
            }
          }
        }
      }
    }
  `).allMarkdownRemark
  return (
    <Layout>
      <SEO title="Home" />
      <header className="section-header">Recent Posts</header>
      <PostList posts={posts} />
      <Link className="more" to="/posts">
        More...
      </Link>
    </Layout>
  )
}

export default IndexPage
