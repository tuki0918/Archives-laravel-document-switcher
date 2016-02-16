import React from 'react'

class Button extends React.Component {

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    this.props.onClick(e)
  }

  render () {
    let isActive = (this.props.value === this.props.version) ? 'active' : ''
    return (
      <button className={ 'btn btn-default ' + isActive }
              value={ this.props.value }
              onClick={this.handleClick}>
        { this.props.name }
      </button>
    )
  }
}

export default Button
