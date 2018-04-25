import React from 'react'
import { Route, Switch } from 'react-router-dom'

import ProductsList from '../pages/ProductsList'
import User from '../pages/User'
import ViewCart from '../pages/ViewCart'

export default () => (
  <Switch>
    <Route exact path="/" component={ProductsList}/>
    <Route exact path="/users/:userID" component={User}/>
    <Route exact path="/cart" component={ViewCart}/>
  </Switch>
)
