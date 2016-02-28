import React from 'react';
import ReactDOM from 'react-dom';

import FavoriteActions from '../actions/FavoriteActions';
import FavoriteStore from '../stores/FavoriteStore';
import Item from './Item';

class Favorite extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      favorites: []
    };

    this.onFavoriteDelete = this.onFavoriteDelete.bind(this);
    this._onChangeFavorites = this._onChangeFavorites.bind(this);
  }

  componentDidMount() {
    FavoriteStore.addChangeListener(this._onChangeFavorites);
    FavoriteActions.updated();
  }

  _onChangeFavorites() {
    this.setState({
      favorites: FavoriteStore.getFavorites()
    });
  }

  onFavoriteDelete(url) {
    FavoriteActions.remove(url);
    chrome.storage.local.set({
      favorites: FavoriteStore.getFavorites()
    });
  }

  render() {
    let favorites = this.state.favorites;
    let items = '';
    if (favorites.length) {
      items = favorites.map((tab, i) => {
        return (
          <Item key={'tab-' + i}
                id={tab.id}
                url={tab.url}
                title={tab.title}
                favIconUrl={tab.favIconUrl}
                currentId={false}
                onFavoriteDelete={this.onFavoriteDelete}
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
      <div className="favorite">
        <ul className="list-group">
          {items}
        </ul>
      </div>
    );
  }
}

export default Favorite;
