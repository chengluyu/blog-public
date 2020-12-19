import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { slugify } from "transliteration"
import "./PostList.scss"

const PostList = ({ posts }) => (
  <ul className="post-list">
    {posts.map(({ node }) => (
      <li className="post-item" key={node.id}>
        <div className="post-metadata">
          <time className="post-time">{node.frontmatter.date}</time>
          {node.frontmatter.language ? (
            <div className="post-lang">{node.frontmatter.language}</div>
          ) : null}
        </div>
        <Link className="post-link" to={`/${slugify(node.frontmatter.title)}`}>
          {node.frontmatter.title}
        </Link>
      </li>
    ))}
  </ul>
)

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
}

export default PostList
