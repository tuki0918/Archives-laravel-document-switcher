import React from 'react';

class Item extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      deleted: false,
      err: false,
      url: props.url,
      newOpen: props.newOpen ? true : false,
    };
    this.onMove = this.onMove.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onMove() {
    let tagId = this.props.id;
    if (tagId) {
      let windowId = chrome.windows.WINDOW_ID_CURRENT;
      tagId = parseInt(tagId, 10);
      chrome.tabs.query(
        {active: true, windowId: windowId},
        tabs => {
          let tab = tabs[0];
          let moveProperties = {windowId: windowId, index: tab.index + 1};
          chrome.tabs.move(tagId, moveProperties, tab => {
            let err = chrome.runtime.lastError;
            if (err) {
              this.setState({
                err: err.message,
              });
              return;
            }
            chrome.tabs.update(tab.id, {selected: true}, tab => {
              this.setState({
                err: false,
              });
            });
          });
        }
      );
    }
  }

  onOpen() {
    chrome.tabs.create({url: this.state.url});
  }

  onClose() {
    let tagId = this.props.id;
    if (tagId) {
      chrome.tabs.remove(tagId, tab => {
        let err = chrome.runtime.lastError;
        if (err) {
          this.setState({
            err: err.message,
          });
          return;
        }
        // TODO:親のstateから削除する
        this.setState({
          deleted: true,
        });
      });
    }
  }

  render() {
    let favIconUrl = this.props.favIconUrl ? this.props.favIconUrl : '/images/noimage.png';
    let isActive = (this.props.id === this.props.currentId) ? 'active' : '';
    let isHidden = (this.state.deleted) ? 'hidden' : '';
    let button = (this.state.newOpen) ? '' : (
      <span className="icon icon-cancel-circled pull-right close"
            onClick={this.onClose}></span>
    );
    let error = (!this.state.err) ? '' : (
        <p className="alert alert-warning">{this.state.err}</p>
    );
    return (
      <li className={'list-group-item ' + isActive + ' ' + isHidden}>
        {button}
        <div onClick={this.state.newOpen ? this.onOpen : this.onMove}>
          <img className="img-circle media-object pull-left"
               src={favIconUrl} width="32" height="32" />
          <div className="media-body">
            <strong>{this.props.title}</strong>
            <p>{this.props.url}</p>
          </div>
        </div>
        {error}
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
  newOpen: React.PropTypes.bool,
};

export default Item;
