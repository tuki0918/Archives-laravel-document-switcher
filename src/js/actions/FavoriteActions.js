import AppDispatcher from '../dispatcher/AppDispatcher';
import { ActionTypes } from '../constants/FavoriteConstants';

class Actions {

  init() {
    AppDispatcher.dispatch({
      actionType: ActionTypes.INIT_SETUP
    });
  }

  updated() {
    AppDispatcher.dispatch({
      actionType: ActionTypes.UPDATE_EVENT
    });
  }

  setup(data) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.DATA_SETUP,
      data: data
    });
  }

  add(tab) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.FAVORITE_ADD,
      tab: tab
    });
  }

  remove(url) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.FAVORITE_REMOVE,
      url: url
    });
  }
}

export default new Actions;
