import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { BookmarkFrontmatter, ChildMarkdownRemark, Edge } from "../models"
import "./bookmarks.scss"

type BookmarkListProps = {
  bookmarks: Edge<ChildMarkdownRemark<BookmarkFrontmatter>>[]
}

const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks }) => {
  return (
    <div className="bookmark-list">
      {bookmarks.map((x) => (
        <a
          key={x.node.id}
          className="undecorated-link bookmark-wrapper"
          href={x.node.frontmatter.url}
        >
          <article className="bookmark-card">
            <h2 className="name">{x.node.frontmatter.name}</h2>
            <h3 className="description">{x.node.frontmatter.description}</h3>
          </article>
        </a>
      ))}
    </div>
  )
}

const BookmarksPage = () => {
  type BookmarksPageQueryResult = {
    allMarkdownRemark: {
      edges: Edge<ChildMarkdownRemark<BookmarkFrontmatter>>[]
    }
    file: { childMarkdownRemark: ChildMarkdownRemark<undefined> }
  }
  const {
    allMarkdownRemark: { edges: bookmarks },
    file: {
      childMarkdownRemark: { html: prologueHtml },
    },
  } = useStaticQuery<BookmarksPageQueryResult>(graphql`
    query BookmarksPageQuery {
      allMarkdownRemark(
        filter: {
          frontmatter: { draft: { ne: true } }
          fileAbsolutePath: { regex: "/bookmarks/.*\\\\.md$/" }
        }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            id
            frontmatter {
              name
              description
              url
            }
          }
        }
      }
      file(sourceInstanceName: { eq: "pages" }, name: { eq: "bookmarks" }) {
        childMarkdownRemark {
          html
        }
      }
    }
  `)
  return (
    <Layout>
      <SEO title="Bookmarks" />
      <header className="section-header">Bookmarks</header>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: prologueHtml }}
      />
      <BookmarkList bookmarks={bookmarks} />
    </Layout>
  )
}

export default BookmarksPage
