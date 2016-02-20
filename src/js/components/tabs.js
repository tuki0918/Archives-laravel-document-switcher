import React from 'react';
import ReactDOM from 'react-dom';

import Item from './item';
import url from '../lib/url';

class Tabs extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tabs: [],
    };
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

      this.setState({
        tabs: data,
      });
    });
  }

  componentDidMount() {
    // 開いているタブ一覧を取得する
    this.getTabList();
  }

  render() {
    return (
      <div className="tabs">
        <ul className="list-group">
          {this.state.tabs.map(function(tab, i) {
            return (
              <Item key={'item-' + i}
                    id={tab.id}
                    url={tab.url}
                    title={tab.title}
                    favIconUrl={tab.favIconUrl}
                    />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Tabs;
