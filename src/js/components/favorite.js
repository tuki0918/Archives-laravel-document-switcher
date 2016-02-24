import React from 'react';
import ReactDOM from 'react-dom';

import Item from './item';

class Favorite extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      favorites: [],
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites() {
    chrome.storage.local.get(['favorites'], storage => {
      if (!chrome.runtime.lastError) {
        let favorites = storage.favorites;
        if (favorites) {
          favorites.reverse();
          this.setState({
            favorites: favorites,
          });
        }
      }
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
