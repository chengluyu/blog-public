import React from "react"
import PropTypes from "prop-types"
import "./TagList.scss"

const TagList = ({ tags }) =>
  Array.isArray(tags) ? (
    <ul className="tag-list">
      {tags.map((t) => (
        <li key={t}>#{t}</li>
      ))}
    </ul>
  ) : null

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
}

export default TagList
