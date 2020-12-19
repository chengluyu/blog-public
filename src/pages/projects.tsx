import React from "react"
import { PageProps, useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { ChildMarkdownRemark, Edge, ProjectFrontmatter } from "../models"
import "./projects.scss"

type ProjectCardProps = {
  project: ChildMarkdownRemark<ProjectFrontmatter>
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article className="project-card">
      <div className="type-pill">{project.frontmatter.type}</div>
      <h2 className="title">{project.frontmatter.title}</h2>
      <h3 className="subtitle">{project.frontmatter.subtitle}</h3>
      <div className="shortcut-bar">
        {typeof project.frontmatter.repo === "string" ? (
          <a className="undecorated-link" href={project.frontmatter.repo}>
            GitHub
          </a>
        ) : null}
        {typeof project.frontmatter.repo === "string" ? (
          <a className="undecorated-link" href={project.frontmatter.demo}>
            Demo
          </a>
        ) : null}
      </div>
    </article>
  )
}

type ProjectCollectionProps = {
  projects: Edge<ChildMarkdownRemark<ProjectFrontmatter>>[]
}

const ProjectCollection: React.FC<ProjectCollectionProps> = ({ projects }) => {
  return (
    <div className="project-collection">
      {projects.map((x) => (
        <ProjectCard key={x.node.id} project={x.node} />
      ))}
    </div>
  )
}

const ProjectsPage: React.FC<PageProps> = () => {
  type ProjectsPageQueryResult = {
    allMarkdownRemark: {
      edges: { node: ChildMarkdownRemark<ProjectFrontmatter> }[]
    }
    file: { childMarkdownRemark: ChildMarkdownRemark<undefined> }
  }
  const {
    allMarkdownRemark: { edges: posts },
    file: {
      childMarkdownRemark: { html: prologue },
    },
  } = useStaticQuery<ProjectsPageQueryResult>(graphql`
    query ProjectsPageQuery {
      allMarkdownRemark(
        filter: {
          frontmatter: { draft: { ne: true } }
          fileAbsolutePath: { regex: "/projects/.*\\\\.md$/" }
        }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            id
            frontmatter {
              type
              title
              subtitle
              tags
              date(formatString: "MMM DD, YYYY")
              demo
              repo
            }
          }
        }
      }
      file(sourceInstanceName: { eq: "pages" }, name: { eq: "projects" }) {
        childMarkdownRemark {
          html
        }
      }
    }
  `)
  return (
    <Layout>
      <SEO title="Projects" />
      <header className="section-header">Projects</header>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: prologue }}
      />
      <ProjectCollection projects={posts} />
    </Layout>
  )
}

export default ProjectsPage
