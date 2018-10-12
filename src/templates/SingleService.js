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
  showSubtitle,
  subtitle,
  publishDate,
  start,
  manual_pdf,
  thumbnail,
  slider = []
}) => (
  <article
    className="SingleService section light"
    itemScope
    itemType="http://schema.org/BlogPosting"
  >
    <Helmet>
      <title>{title}</title>
    </Helmet>

    <div className="container skinny">
      <Link className="SingleService--BackButton" to="/blog/">
        <ChevronLeft /> BACK
      </Link>
      <div className="SingleService--Content relative">
        <div className="SingleService--Meta">
          {publishDate && (
            <time
              className="SingleService--Meta--Date"
              itemProp="dateCreated pubdate datePublished"
              date={publishDate}
            >
              {_format(publishDate, 'MMMM Do, YYYY')}
            </time>
          )}
        </div>

        {title && (
          <h1 className="SingleService--Title" itemProp="title">
            {title}
          </h1>
        )}
      </div>
    </div>
  </article>
)

// Export Default SingleService for front-end
const SingleService = ({ data, pathContext }) => {
  const { service } = data
  console.log(service)
  return (
    <SingleServiceTemplate
      {...service}
      {...service.frontmatter}
      body={service.html}
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
    service: markdownRemark(id: { eq: $id }) {
      html
      id
      frontmatter {
        title
        template
        subTitle
        publishDate
        start
        thumbnail {
          ...FluidImage
        }
        slider {
          sliderImage {
            ...FluidImage
          }
        }
        manual_pdf {
          ...FluidImage
        }
      }
    }
  }
`
