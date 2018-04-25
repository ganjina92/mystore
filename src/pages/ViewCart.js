import React, {Component} from 'react'
import PaypalExpressBtn from 'react-paypal-express-checkout'

import Cart from '../components/cart/Cart'
import CartButton from '../components/cart/CartButton'

export default class extends Component {
  render(){
    return(
      <main>
        <CartButton label="Clear Cart"/>
        <Cart/>
        <PaypalExpressBtn alert='Insufficient Funds Try Again!'/>
        </main>
    )
  }
}
