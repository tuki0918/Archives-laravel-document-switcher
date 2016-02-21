import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import Root from './components/root';

import Tabs from './components/tabs';
import Favorite from './components/favorite';

export const routes = (
  <Route path="/" component={Root}>
    <IndexRoute component={Tabs} />
    <Route path="tabs" component={Tabs} />
    <Route path="favorite" component={Favorite} />
    <Route path="*" component={Tabs} />
  </Route>
);
