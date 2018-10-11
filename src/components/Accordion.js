import React from 'react'
import './Accordion.css'

class Accordion extends React.Component {
  static defaultProps = {
    items: []
  }

  state = {
    activeAcordionItem: null
  }

  handleClick = index => {
    const activeItem = this.state.activeAcordionItem === index ? null : index
    this.setState({ activeAcordionItem: activeItem })
    console.log(activeItem)
  }

  render() {
    const { items } = this.props

    return (
      <div className="accordion relative">
        <div className="items">
          {!!items &&
            items.map((item, index) => {
              const active = this.state.activeAcordionItem === index
              return (
                <div
                  className={`item ${active ? 'active' : ''}`}
                  key={item.title + index}
                >
                  <div
                    className="itemHead"
                    onClick={() => this.handleClick(index)}
                  >
                    <h3>{item.title}</h3>
                  </div>
                  <div className="itemContent">
                    <p>{item.content}</p>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}

export default Accordion
