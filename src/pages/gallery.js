import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Gallery from "react-photo-gallery"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

const GalleryPage = () => {
  const queryResult = useStaticQuery(graphql`
    query GalleryPageQuery {
      allFile(filter: { sourceInstanceName: { eq: "gallery" } }) {
        nodes {
          childImageSharp {
            fixed {
              width
              height
              src
              srcSet
            }
          }
        }
      }
      file(sourceInstanceName: { eq: "pages" }, name: { eq: "gallery" }) {
        childMarkdownRemark {
          html
        }
      }
    }
  `)
  const content = queryResult.file.childMarkdownRemark
  const photos = queryResult.allFile.nodes.map((t) => t.childImageSharp.fixed)
  return (
    <Layout>
      <SEO title="Gallery" />
      <header className="section-header">Gallery</header>
      {content === null ? null : (
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: content.html }}
        />
      )}
      <Gallery photos={photos} />
    </Layout>
  )
}

export default GalleryPage
