import React from 'react';

import Item from './item';
import url from '../lib/url';

class Tabs extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentId: false,
      tabs: [],
    };
  }

  getCurrentTabId() {
    // TODO: グローバルから取得する
    chrome.tabs.query(
      {active: true, windowId: chrome.windows.WINDOW_ID_CURRENT},
      tabs => {
        let tab = tabs[0];
        this.setState({
          currentId: tab.id,
        });
      }
    );
  }

  getTabList() {
    chrome.tabs.query({}, tabs => {
      let data = [];
      tabs.map(tab => {
        if (!url.check(tab.url)) {
          return;
        }
        data.push({
          id: tab.id,
          url: tab.url,
          title: tab.title,
          favIconUrl: tab.favIconUrl,
        });
      });

      data.reverse();

      this.setState({
        tabs: data,
      });
    });
  }

  componentDidMount() {
    // 開いているタブIDを取得する
    this.getCurrentTabId();
    // 開いているタブ一覧を取得する
    this.getTabList();
  }

  render() {
    let tabs = this.state.tabs;
    let items = '';
    if (tabs.length) {
      items = tabs.map((tab, i) => {
        return (
          <Item key={'item-' + i}
                id={tab.id}
                url={tab.url}
                title={tab.title}
                favIconUrl={tab.favIconUrl}
                currentId={this.state.currentId}
          />
        );
      });
    } else {
      items = (
        <li className="list-group-item">
          <div className="media-body">
            <p>No results found.</p>
          </div>
        </li>
      );
    }

    return (
      <div className="tabs">
        <ul className="list-group">
          {items}
        </ul>
      </div>
    );
  }
}

export default Tabs;
