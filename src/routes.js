import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Cart from './components/cart/Cart'

import ProductsList from './pages/ProductsList'

export default () => (
  <Switch>
   <Route exact path="/" component={ProductsList}/>
    <Route path="Cart" component={Cart}/>
  </Switch>
)
