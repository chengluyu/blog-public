import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

const AboutPage = () => {
  const queryResult = useStaticQuery(graphql`
    query AboutQuery {
      file(sourceInstanceName: { eq: "pages" }, name: { eq: "about" }) {
        childMarkdownRemark {
          html
        }
      }
    }
  `)
  const content = queryResult.file.childMarkdownRemark
  return (
    <Layout>
      <SEO title="About" />
      <header className="section-header">About</header>
      {content === null ? null : (
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: content.html }}
        />
      )}
    </Layout>
  )
}

export default AboutPage
