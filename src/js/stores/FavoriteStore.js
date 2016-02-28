import AppDispatcher from '../dispatcher/AppDispatcher';
import EventConstants from '../constants/EventConstants';
import { ActionTypes } from '../constants/FavoriteConstants';
import { EventEmitter } from 'events';
import _ from 'lodash';

export const INIT_EVENT = EventConstants.INIT_EVENT;
export const CHANGE_EVENT = EventConstants.CHANGE_FAVORITE;
export const DATA = 'DATA';

let _state = {
  DATA: []
};

class FavoriteStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register(this._handleDispatch.bind(this));
  }

  _handleDispatch(action) {

    switch (action.actionType) {
      case ActionTypes.INIT_SETUP:
        this.emitInit();
        break;
      case ActionTypes.UPDATE_EVENT:
        this.emitChange();
        break;
      case ActionTypes.DATA_SETUP:
        this.setup(action.data);
        this.emitChange();
        break;
      case ActionTypes.FAVORITE_ADD:
        this.add(action.tab);
        this.emitChange();
        break;
      case ActionTypes.FAVORITE_REMOVE:
        this.remove(action.url);
        this.emitChange();
        break;
      default:
        return true;
    }

  }

  getState() {
    return _state;
  }

  isFavorite(url) {
    let favorites = this.getFavorites();
    let items = _.filter(favorites, (tab) => {
      return tab.url === url;
    });
    return (items.length > 0);
  }

  getFavorites() {
    return _state[DATA];
  }

  setup(data) {
    _state[DATA] = data;
  }

  add(tab) {
    _state[DATA].push(tab);
  }

  remove(url) {
    let favorites = this.getFavorites();
    _.remove(favorites, tab => {
      return tab.url === url;
    });
    this.setup(favorites);
  }

  emitInit() {
    this.emit(INIT_EVENT);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addInitListener(callback) {
    this.addListener(INIT_EVENT, callback);
  }

  removeInitListener(callback) {
    this.removeListener(INIT_EVENT, callback);
  }

  addChangeListener(callback) {
    this.addListener(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

export default new FavoriteStore;
