import React from 'react';
import fetch from 'isomorphic-fetch';

import Control from './control';
import Navigation from './navigation';
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
    this.getCurrentUrl();

    // GET Select Version List
    this.requestAPIGetVersionList();
  }

  getCurrentUrl() {
    chrome.tabs.query(
      {active: true, windowId: chrome.windows.WINDOW_ID_CURRENT},
      tabs => {
        let tab = tabs[0];
        let active = url.check(tab.url) ? true : false;
        this.setState({
          url: tab.url,
          isActive: active,
        });
      }
    );
  }

  requestAPIGetVersionList() {
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

  render() {
    return (
      <div className="window">

        <Control {...this.state} />

        <Navigation />

        <div className="window-content">
          <div className="pane-group">
            <div className="pane">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Root;
