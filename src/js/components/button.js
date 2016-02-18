import React from 'react';

class Button extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onBtn(e);
  }

  render() {
    let isActive = (this.props.value === this.props.current) ? true : false;
    let btnClass = (isActive) ? 'active' : '';
    return (
      <button className={ 'btn btn-default ' + btnClass }
              value={ this.props.value }
              onClick={this.handleClick}>
        { this.props.name }
      </button>
    );
  }
}

Button.propTypes = {
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  current: React.PropTypes.string,
  onBtn: React.PropTypes.func.isRequired,
};

export default Button;
