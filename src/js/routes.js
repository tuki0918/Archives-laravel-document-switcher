import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import Root from './components/Root';
import Tabs from './components/Tabs';
import Favorite from './components/Favorite';

export const routes = (
  <Route path="/" component={Root}>
    <IndexRoute component={Tabs} />
    <Route path="tabs" component={Tabs} />
    <Route path="favorite" component={Favorite} />
    <Route path="*" component={Tabs} />
  </Route>
);
