const InfoMessageWidget = createClass({
  handleChange: function(e) {
    // this.props.onChange(e.target.value.split(',').map(e => e.trim()))
    return
  },

  render: function() {
    // var value = this.props.value
    // return h('input', {
    //   type: 'text',
    //   value: value ? value.join(', ') : '',
    //   onChange: this.handleChange
    // })
    return h('p', {}, 'This is just a simple info message')
  }
})

export default InfoMessageWidget
