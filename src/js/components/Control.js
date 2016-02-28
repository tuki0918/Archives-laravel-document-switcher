import React from 'react';

import Button from './Button';
import FavoriteActions from '../actions/FavoriteActions';
import FavoriteStore from '../stores/FavoriteStore';
import url from '../lib/url';

class Control extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      current: 'master',
      isFavorite: false
    };

    this._onInitFavorites = this._onInitFavorites.bind(this);
    this._onChangeFavorites = this._onChangeFavorites.bind(this);

    this.onToggleFavorite = this.onToggleFavorite.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onBtn = this.onBtn.bind(this);
  }

  componentDidMount() {
    // 設定を取得
    this.getConfig();

    // お気に入りを取得
    FavoriteStore.addInitListener(this._onInitFavorites);
    FavoriteStore.addChangeListener(this._onChangeFavorites);
    FavoriteActions.init();
  }

  _onInitFavorites() {
    FavoriteStore.removeInitListener(this._onInitFavorites);
    chrome.storage.local.get(['favorites'], storage => {
      if (!chrome.runtime.lastError) {
        let favorites = storage.favorites;
        if (favorites) {
          FavoriteActions.setup(favorites);
        }
      }
    });
  }

  _onChangeFavorites() {
    this.setState({
      isFavorite: FavoriteStore.isFavorite(this.props.url)
    });
  }

  getConfig() {
    chrome.storage.local.get(['current'], storage => {
      if (!chrome.runtime.lastError) {
        this.setState({
          current: storage.current
        });
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
          FavoriteActions.add(tab);
          chrome.storage.local.set({
            favorites: FavoriteStore.getFavorites()
          });
        }
      );

    } else {
      // 解除
      let url = this.props.url;
      FavoriteActions.remove(url);
      chrome.storage.local.set({
        favorites: FavoriteStore.getFavorites()
      });
    }
  }

  onClick() {
    if (this.props.isActive) {
      let newURL = url.convert(this.props.url, this.state.current);
      chrome.tabs.create({
        url: newURL,
        index: this.props.tabIndex + 1,
      });
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
    let isFavorite = (this.state.isFavorite) ? 'icon-star' : 'icon-star-empty';
    let btnClass = (isActive) ? '' : 'hidden';
    return (
      <header className="toolbar toolbar-header">
        <div className="toolbar-actions">
          <div className="btn-group">
            {this.props.versions.map(function(version, i) {
              return (
                <Button key={'btn-' + i}
                        name={version.name}
                        value={version.value}
                        current={this.state.current}
                        onBtn={this.onBtn}
                />
              );
            }, this)}
          </div>

          <button className={'btn btn-default ' + btnClass} onClick={this.onClick}>
            <span className="icon icon-book-open icon-text"></span>
            日本語ドキュメント
          </button>

          <button className="btn btn-default pull-right" onClick={this.onToggleFavorite}>
            <span className={'icon ' + isFavorite}></span>
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
  tabIndex: React.PropTypes.number.isRequired,
};

Control.defaultProps = {
  isActive: false,
};

export default Control;
