import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import "./Header.scss"

const HamburgerButton = ({ opened, onClick }) => {
  return (
    <button
      className={`hamburger-button ${opened ? "opened" : ""}`}
      aria-label="Menu"
      aria-expanded={opened}
      onClick={onClick}
    >
      <svg width="2rem" height="2rem" viewBox="0 0 100 100">
        <path
          className="line line1"
          d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
        />
        <path className="line line2" d="M 20,50 H 80" />
        <path
          className="line line3"
          d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
        />
      </svg>
    </button>
  )
}

const Header = ({ siteTitle }) => {
  const [show, setShow] = useState(false)
  return (
    <header className="header__header">
      <main className="container">
        <div className="front">
          <Link className="header__link header__brand" to="/">
            {siteTitle}
          </Link>
          <HamburgerButton opened={show} onClick={() => setShow(!show)} />
        </div>
        <nav className={`menu ${show ? "" : "closed"}`}>
          <Link className="header__link" to="/posts" activeClassName="active">
            Posts
          </Link>
          <Link
            className="header__link"
            to="/projects"
            activeClassName="active"
          >
            Projects
          </Link>
          <Link className="header__link" to="/gallery" activeClassName="active">
            Gallery
          </Link>
          <Link
            className="header__link"
            to="/bookmarks"
            activeClassName="active"
          >
            Bookmarks
          </Link>
          <Link className="header__link" to="/about" activeClassName="active">
            About
          </Link>
        </nav>
      </main>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
