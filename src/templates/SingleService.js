import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import _get from 'lodash/get'
import _format from 'date-fns/format'
import Link from 'gatsby-link'
import { ChevronLeft } from 'react-feather'

import Content from '../components/Content'
import Image from '../components/Image'
import './SingleService.css'

export const SingleServiceTemplate = ({
  title,
  date,
  featuredImage,
  body,
  nextPostURL,
  prevPostURL,
  categories = []
}) => (
  <article
    className="SingleService section light"
    itemScope
    itemType="http://schema.org/BlogPosting"
  >
    <Helmet>
      <title>{title}</title>
    </Helmet>

    {featuredImage && (
      <Image
        background
        className="SingleService--BackgroundImage"
        src={featuredImage}
        alt={title}
      />
    )}

    <div className="container skinny">
      <Link className="SingleService--BackButton" to="/blog/">
        <ChevronLeft /> BACK
      </Link>
      <div className="SingleService--Content relative">
        <div className="SingleService--Meta">
          {date && (
            <time
              className="SingleService--Meta--Date"
              itemProp="dateCreated pubdate datePublished"
              date={date}
            >
              {_format(date, 'MMMM Do, YYYY')}
            </time>
          )}
          {categories && (
            <Fragment>
              <span>|</span>
              {categories.map((cat, index) => (
                <span
                  key={cat.category}
                  className="SingleService--Meta--Category"
                >
                  {cat.category}
                  {/* Add a comma on all but last category */}
                  {index !== categories.length - 1 ? ',' : ''}
                </span>
              ))}
            </Fragment>
          )}
        </div>

        {title && (
          <h1 className="SingleService--Title" itemProp="title">
            {title}
          </h1>
        )}

        <div className="SingleService--InnerContent">
          <Content source={body} />
        </div>

        <div className="SingleService--Pagination">
          {prevPostURL && (
            <Link
              className="SingleService--Pagination--Link prev"
              to={prevPostURL}
            >
              Previous Post
            </Link>
          )}
          {nextPostURL && (
            <Link
              className="SingleService--Pagination--Link next"
              to={nextPostURL}
            >
              Next Post
            </Link>
          )}
        </div>
      </div>
    </div>
  </article>
)

// Export Default SingleService for front-end
const SingleService = ({ data, pathContext }) => {
  const { post, allPosts } = data
  const thisEdge = allPosts.edges.find(edge => edge.node.id === post.id)
  return (
    <SingleServiceTemplate
      {...post}
      {...post.frontmatter}
      body={post.html}
      nextPostURL={_get(thisEdge, 'next.fields.slug')}
      prevPostURL={_get(thisEdge, 'previous.fields.slug')}
    />
  )
}

export default SingleService

export const pageQuery = graphql`
  ## Query for SingleService data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SingleService($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      html
      id
      frontmatter {
        title
        template
        subtitle
        date
        categories {
          category
        }
        featuredImage {
          ...FluidImage
        }
      }
    }

    allPosts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        previous {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
