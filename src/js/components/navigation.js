import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

class Navigation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectIndex: 0,
    };
  }

  onClick(i) {
    this.setState({selectIndex: i});
  }

  data() {
    return [
      {link: '/tabs', name: '開いてるタブ'},
      {link: '/favorite', name: 'お気に入り'},
    ];
  }

  render() {
    let data = this.data();
    let select = this.state.selectIndex;
    return (
      <div className="tab-group">
        {data.map(function(nav, i) {
          let isActive = (i === select) ? 'active' : '';
          return (
            <div className={'tab-item ' + isActive} key={'nav-' + i}>
              <Link to={nav.link} onClick={this.onClick.bind(this, i)}>{nav.name}</Link>
            </div>
          );
        }, this)}
      </div>
    );
  }
}

export default Navigation;
