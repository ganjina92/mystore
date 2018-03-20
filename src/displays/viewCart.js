import React, {Component} from 'react'

import CartProductList from '../components/cart/Cart'
import CheckoutButton from '../components/cart/checkoutButton'
import ClearCartButton from '../components/cart/clearCartButton'

export default class extends Component {
  render(){
    return(
      <main>
        <ClearCartButton />
        <CartProductList />
        <CheckoutButton />
      </main>
    )
  }
}
