import React from "react"
// import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import "./Footer.scss"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      allMarkdownRemark(
        filter: {
          frontmatter: { draft: { ne: true } }
          fileAbsolutePath: { regex: "/posts/.*\\\\.md$/" }
        }
        sort: { fields: [frontmatter___date] }
        limit: 1
      ) {
        edges {
          node {
            frontmatter {
              date(formatString: "YYYY")
            }
          }
        }
      }
    }
  `)
  const copyrightStartYear =
    data.allMarkdownRemark.edges.length > 0
      ? data.allMarkdownRemark.edges[0].node.frontmatter.date
      : new Date().getFullYear().toString()
  const copyrightEndYear = new Date().getFullYear().toString()
  const copyrightText =
    copyrightStartYear === copyrightEndYear
      ? copyrightStartYear
      : `${copyrightStartYear}-${copyrightEndYear}`
  return (
    <footer className="Footer__footer">
      <p className="copyright">
        © {copyrightText} Copyright Luyu Cheng. All Rights Reserved.
      </p>
      <p className="copyright">
        Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>, React, Node.js, and many
        other open source tools.
      </p>
    </footer>
  )
}

Footer.propTypes = {}

export default Footer
