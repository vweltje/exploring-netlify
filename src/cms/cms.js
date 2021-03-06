import React from 'react'
import CMS from 'netlify-cms'
import './cms-utils'

import { HomePageTemplate } from '../templates/HomePage'
import { AboutPageTemplate } from '../templates/AboutPage'
import { ContactPageTemplate } from '../templates/ContactPage'
import { DefaultPageTemplate } from '../templates/DefaultPage'
import { BlogIndexTemplate } from '../templates/BlogIndex'
import { SinglePostTemplate } from '../templates/SinglePost'
import { SingleServiceTemplate } from '../templates/SingleService'

if (
  window.location.hostname === 'localhost' &&
  window.localStorage.getItem('netlifySiteURL')
) {
  CMS.registerPreviewStyle(
    window.localStorage.getItem('netlifySiteURL') + '/styles.css'
  )
} else {
  CMS.registerPreviewStyle('/styles.css')
}

CMS.registerPreviewTemplate('home-page', ({ entry }) => (
  <HomePageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('about-page', ({ entry }) => (
  <AboutPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('contact-page', ({ entry }) => (
  <ContactPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('infoPages', ({ entry }) => (
  <DefaultPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('blog-page', ({ entry }) => (
  <BlogIndexTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('posts', ({ entry }) => (
  <SinglePostTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('services', ({ entry }) => (
  <SingleServiceTemplate {...entry.toJS().data} />
))

/**
 * Let's say you've created widget and preview components for a custom image
 * gallery widget in separate files:
 */
import InfoMessageWidget from './widget/infoMessage/Widget.js'
import InfoMessagePreview from './widget/infoMessage/Preview.js'

import DropdownWidget from './widget/dropdown/Widget.js'
import DropdownPreview from './widget/dropdown/Preview.js'

/**
 * Register the imported widget:
 */
CMS.registerWidget(`infoMessage`, InfoMessageWidget, InfoMessagePreview)
CMS.registerWidget(`dropdown`, DropdownWidget, DropdownPreview)
