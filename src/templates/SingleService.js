import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import _get from 'lodash/get'
import _format from 'date-fns/format'
import Link from 'gatsby-link'
import { ChevronLeft } from 'react-feather'

import Content from '../components/Content'
import Image from '../components/Image'
import './SingleService.scss'

export const SingleServiceTemplate = ({
  title,
  showSubtitle,
  subtitle,
  publishDate,
  start,
  manual_pdf,
  thumbnail,
  slider = []
}) => {
  const link = manual_pdf.publicURL || manual_pdf
  return (
    <article
      className="SingleService section light"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className="container skinny">
        <Link className="SingleService--BackButton" to="/services/">
          <ChevronLeft /> BACK
        </Link>
        <div className="SingleService--Content relative">
          {title && (
            <h1 className="SingleService--Title" itemProp="title">
              {title}
            </h1>
          )}

          <div className="SingleService--Meta">
            Publish date:&nbsp;
            {publishDate && (
              <time
                className="SingleService--Meta--Date"
                itemProp="dateCreated pubdate datePublished"
                date={publishDate}
              >
                {_format(publishDate, 'MMMM Do, YYYY')}
              </time>
            )}
            <br /> Start time:&nbsp;
            {start && (
              <time
                className="SingleService--Meta--Date"
                itemProp="dateCreated pubdate datePublished"
                date={start}
              >
                {_format(start, 'YYYY-MM-DD HH:mm')}
              </time>
            )}
          </div>

          <div className="singleService--Content">
            {thumbnail && <Image src={thumbnail} alt={thumbnail.publicURL} />}
            Download: {console.log(manual_pdf)}
            <Link to={link}>ff {link}</Link>
            {slider && (
              <div className="SingleService--Slider">
                {slider.map((item, intex) => {
                  const image = item.sliderImage
                  return (
                    <figure>
                      <Image src={image} alt={image.publicURL} />
                    </figure>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

// Export Default SingleService for front-end
const SingleService = ({ data, pathContext }) => {
  const { service } = data
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
