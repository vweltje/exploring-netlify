import React from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import PostSection from '../components/PostSection'
import PostCategoriesNav from '../components/PostCategoriesNav'

// Export Template for use in CMS preview
export const ServicesIndexTemplate = ({
  title,
  subtitle,
  featuredImage,
  services = [],
  postCategories = [],
  contentType
}) => {
  const isCategory = contentType === 'postCategories'
  const byCategory = post =>
    post.categories &&
    post.categories.filter(cat => cat.category === title).length
  const filteredPosts = isCategory ? services.filter(byCategory) : services
  return (
    <main className="Services">
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <PageHeader
        title={title}
        subtitle={subtitle}
        backgroundImage={featuredImage}
      />

      {!!postCategories.length && (
        <section className="section thin">
          <div className="container">
            <PostCategoriesNav categories={postCategories} />
          </div>
        </section>
      )}

      {!!services.length && (
        <section className="section">
          <div className="container">
            <PostSection services={filteredPosts} />
          </div>
        </section>
      )}
    </main>
  )
}

// Export Default ServicesIndex for front-end
const ServicesIndex = ({ data }) => {
  return (
    <ServicesIndexTemplate
      {...data.page}
      {...data.page.fields}
      {...data.page.frontmatter}
      services={data.services.edges.map(service => ({
        ...service.node,
        ...service.node.frontmatter,
        ...service.node.fields
      }))}
    />
  )
}

export default ServicesIndex

export const pageQuery = graphql`
  ## Query for ServicesIndex data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query ServicesIndex($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        template
        subtitle
        featuredImage {
          ...FluidImage
        }
      }
    }

    services: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "services" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            thumbnail {
              ...SmallImage
            }
          }
        }
      }
    }
  }
`
