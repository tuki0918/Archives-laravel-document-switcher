import React from 'react';

import Button from './button';
import url from '../lib/url';

class Control extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      current: 'master',
    };

    this.onClick = this.onClick.bind(this);
    this.onBtn = this.onBtn.bind(this);
  }

  componentDidMount() {

    // get option
    chrome.storage.local.get(['current'], storage => {
      if (!chrome.runtime.lastError) {
        this.setState({
          current: storage.current,
        });
      }
    });
  }

  onClick() {
    if (this.props.isActive) {
      let newURL = url.convert(this.props.url, this.state.current);
      chrome.tabs.create({url: newURL});
    }
  }

  onBtn(e) {
    let data = {
      current: e.target.value,
    };

    this.setState(data);

    // store
    chrome.storage.local.set(data);
  }

  render() {
    let isActive = (this.props.isActive) ? true : false;
    let btnClass = (isActive) ? '' : 'hidden';
    return (
      <header className="toolbar toolbar-header">
        <div className="toolbar-actions">
          <div className="btn-group">
            {this.props.versions.map(function(version, i) {
              return (
                <Button key={i}
                        name={version.name}
                        value={version.value}
                        current={this.state.current}
                        onBtn={this.onBtn}
                />
              );
            }, this)}
          </div>

          <button className={ 'btn btn-default ' + btnClass } onClick={this.onClick}>
            <span className="icon icon-book-open icon-text"></span>
            Move to JP Doc
          </button>

        </div>
      </header>
    );
  }
}

Control.propTypes = {
  url: React.PropTypes.string.isRequired,
  isActive: React.PropTypes.bool.isRequired,
  versions: React.PropTypes.array.isRequired,
};

Control.defaultProps = {
  isActive: false,
};

export default Control;
