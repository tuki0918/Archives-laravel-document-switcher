import React from 'react';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';

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
      favorites: [],
      isFavorite: false,
      tabIndex: 0,
    };

    this.onToggleFavorite = this.onToggleFavorite.bind(this);
  }

  componentDidMount() {
    // GET Current Tab URL
    this.getCurrentUrl();

    // GET Select Version List
    this.requestAPIGetVersionList();

    // お気に入りを取得
    this.getFavorites();
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
          tabIndex: tab.index,
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

  getFavorites() {
    chrome.storage.local.get(['favorites'], storage => {
      if (!chrome.runtime.lastError) {
        let favorites = storage.favorites;
        if (favorites) {

          let items = _.filter(favorites, (tab) => {
            return tab.url === this.state.url;
          });

          this.setState({
            favorites: favorites,
            isFavorite: items.length ? true : false,
          });
        }
      }
    });
  }

  onToggleFavorite() {
    let flag = !this.state.isFavorite;
    if (flag) {
      // 登録
      chrome.tabs.query(
        {active: true, windowId: chrome.windows.WINDOW_ID_CURRENT},
        tabs => {
          let tab = tabs[0];
          let favorites = this.state.favorites;
          favorites.push(tab);
          this.setState({
            isFavorite: flag,
            favorites: favorites,
          });
          chrome.storage.local.set({favorites: favorites});
        }
      );

    } else {
      // 解除
      let favorites = this.state.favorites;
      let url = this.state.url;
      _.remove(favorites, tab => {
        return tab.url === url;
      });
      this.setState({
        isFavorite: flag,
        favorites: favorites,
      });
      chrome.storage.local.set({favorites: favorites});
    }
  }

  render() {
    return (
      <div className="window">

        <Control {...this.state} onToggleFavorite={this.onToggleFavorite} />

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
