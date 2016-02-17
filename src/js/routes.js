import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import Root from './components/root'

import Favorite from './components/favorite'
import History from './components/history'

export const routes = (
  <Route path="/" component={Root}>
    <IndexRoute component={Favorite} />
    <Route path="favorite" component={Favorite} />
    <Route path="history" component={History} />
    <Route path="*" component={Favorite} />
  </Route>
)