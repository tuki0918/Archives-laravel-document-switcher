import React from 'react';
import ReactDOM from 'react-dom';

class Item extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    let attr = ReactDOM.findDOMNode(this);
    let tagId = attr.getAttribute('data-tab-id');
    if (tagId) {
      let windowId = chrome.windows.WINDOW_ID_CURRENT;
      tagId = parseInt(tagId, 10);
      chrome.tabs.query(
        {active: true, windowId: windowId},
        tabs => {
          let tab = tabs[0];
          let moveProperties = {windowId: windowId, index: tab.index + 1};
          chrome.tabs.move(tagId, moveProperties, tab => {
            chrome.tabs.update(tab.id, {selected: true});
          });
        }
      );
    }
  }

  render() {
    let favIconUrl = this.props.favIconUrl ? this.props.favIconUrl : '/images/noimage.png';
    let isActive = (this.props.id === this.props.currentId) ? 'active' : '';
    return (
      <li className={'list-group-item ' + isActive}
          data-tab-id={this.props.id}
          onClick={this.onClick}>
        <img className="img-circle media-object pull-left"
             src={favIconUrl} width="32" height="32" />
        <div className="media-body">
          <strong>{this.props.title}</strong>
          <p>{this.props.url}</p>
        </div>
      </li>
    );
  }
}

Item.propTypes = {
  id: React.PropTypes.number.isRequired,
  url: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  favIconUrl: React.PropTypes.string,
  currentId: React.PropTypes.any.isRequired,
};

export default Item;
