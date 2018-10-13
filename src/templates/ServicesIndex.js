import React from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import PostSection from '../components/PostSection'

import Image from '../components/Image'
import Link from 'gatsby-link'

// Export Template for use in CMS preview
export const ServicesIndexTemplate = ({
  title,
  subtitle,
  featuredImage,
  services = [],
}) => {
  console.log(services.length)
  return (
    <main className="Services">
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <PageHeader
        title={title}
        backgroundImage={featuredImage}
        />

      {!!services.length && (
        <section className="section">
          <div className="container">
            <div className="services">
              {services.map((service) => {
                return (
                  <Link to={service.slug} className="service">
                    <div className="service-head">
                      <Image backgroundImage src={service.thumbnail.publicURL} alt={service.thumbnail.publicURL} />
                      <h4>{service.title}</h4>
                      <small>{service.subTitle}</small>
                    </div>
                  </Link>
                )
              })}
            </div>
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
          subTitle
          thumbnail {
            ...SmallImage
          }
        }
      }
    }
  }
}
`
