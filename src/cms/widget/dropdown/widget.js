import React from 'react'

const testPages = ['home', 'services', 'about', 'contact', 'default', 'blog']

const InfoMessageWidget = createClass({
  handleChange: function(e) {
    console.log(e.target.value)
    this.props.onChange(e.target.value.trim())
    console.log(this.props)
  },

  render: function() {
    const {widget} = this.props
    const {c}
    return (
      <select className="nc-controlPane-widget" onChange={this.handleChange}>
        <option value="" disabled selected>
          Select a page
        </option>
        {testPages.map((val, index) => {
          return h('option', { value: val }, val)
        })}
      </select>
    )
  }
})

export default InfoMessageWidget
