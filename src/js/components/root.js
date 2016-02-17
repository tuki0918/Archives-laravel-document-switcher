import React from 'react';
import { Link } from 'react-router';
import fetch from 'isomorphic-fetch';

import Control from './control';
import url from '../lib/url';

class Root extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      url: '',
      versions: [],
      isActive: false,
    };
  }

  componentDidMount() {
    // GET Current Tab URL
    chrome.tabs.query(
      { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      tabs => {
        let currentUrl = tabs[0].url;
        let active = url.check(currentUrl) ? true : false;
        this.setState({
          url: currentUrl,
          isActive: active,
        });
      }
    );

    // GET Select Version Data
    fetch('/api/versions.json')
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({
          versions: json,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render () {
    return (
      <div className="window">
        <Control {...this.state} />
        <Link to="/favorite">お気に入り</Link>
        <Link to="/history">履歴</Link>
        {this.props.children}
      </div>
    );
  }
}

export default Root;
