import React from 'react'
import fetch from 'isomorphic-fetch';

import Control from './control'
import UrlBuilder from '../lib/url-builder'

class Root extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      url: '',
      versions: [],
      isActive: false
    }
  }

  componentDidMount() {
    // GET Current Tab URL
    chrome.tabs.query(
      { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      function (tabs) {
        let url = tabs[0].url;
        let active = UrlBuilder.check(url)
        this.setState({
          url: url,
          isActive: active
        })
      }.bind(this)
    )

    // GET Select Version Data
    fetch('./data/versions.json')
      .then(function(response) {
        return response.json()
      })
      .then(function(json) {
        this.setState({
          versions: json
        })
      }.bind(this))
      .catch(function(err) {
        console.log(err)
      }.bind(this))
  }

  render () {
    return (
      <div className="window">
        <Control {...this.state} />
      </div>
    )
  }
}

export default Root