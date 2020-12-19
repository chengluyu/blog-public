import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import "./post.scss"
import "katex/dist/katex.min.css"
import TagList from "../components/TagList"

export default function Template({ data }) {
  const { markdownRemark: post, site } = data
  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <div className="blog-post-container" lang={post.frontmatter.language}>
        <Helmet
          title={`${site.siteMetadata.title} - ${post.frontmatter.title}`}
        >
          <html lang={post.frontmatter.language} />
        </Helmet>
        <div className="blog-post">
          <div className="post-metadata">
            <time>{post.frontmatter.date}</time>
            <TagList tags={post.frontmatter.tags} />
          </div>
          <header className="post-title">{post.frontmatter.title}</header>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </div>
    </Layout>
  )
}

Template.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        language: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      }),
      html: PropTypes.string.isRequired,
    }),
    site: PropTypes.object.isRequired,
  }),
}

export const query = graphql`
  query BlogPostQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        language
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
