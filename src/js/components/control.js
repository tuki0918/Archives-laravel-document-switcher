import React from 'react'

import Button from './button'
import url from '../lib/url'

class Control extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      version: '#err#'
    }

    this.onClick = this.onClick.bind(this)
    this.onBtn = this.onBtn.bind(this)
  }

  componentDidMount() {
    let self = this
    // get option
    chrome.storage.local.get(['version'], function(storage) {
      if (chrome.runtime.lastError) {
        console.log('storage get err!');
        return;
      }
      let data = {
        version: storage.version
      }
      self.setState(data)
    })
  }

  onClick() {
    if (this.props.isActive) {
      let newURL = url.convert(this.props.url, this.state.version)
      chrome.tabs.create({ url: newURL });
    }
  }

  onBtn(e) {
    let data = {
      version: e.target.value
    }

    // store
    chrome.storage.local.set(data, function () {})

    this.setState(data)
  }

  render () {
    let isActive = (this.props.isActive) ? '' : 'hidden'
    return (
      <header className="toolbar toolbar-header">
        <div className="toolbar-actions">
          <div className="btn-group">
            {this.props.versions.map(function(version, i) {
              return (
                <Button key={i}
                        name={version.name}
                        value={version.value}
                        version={this.state.version}
                        onClick={this.onBtn}
                />
              )
            }, this)}
          </div>

          <button className={ 'btn btn-default ' + isActive } onClick={this.onClick}>
            <span className="icon icon-book-open icon-text"></span>
            Move to JP Doc
          </button>

        </div>
      </header>
    )
  }
}

export default Control
