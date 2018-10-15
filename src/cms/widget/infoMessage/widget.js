import React from 'react'

import './MessageStyle.scss'

const testPages = ['home', 'services', 'about', 'contact', 'default', 'blog']

const InfoMessageWidget = createClass({
  handleChange: function(e) {
    this.props.onChange(e.target.value.split(',').map(e => e.trim()))
  },

  render: function() {
    var value = this.props.value
    return h(
      'p',
      { className: 'nc-controlPane-widget infoMessageWidget' },
      'This is a simpld info text field'
    )
  }
})

export default InfoMessageWidget
