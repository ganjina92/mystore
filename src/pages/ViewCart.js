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
        <PaypalExpressBtn label="Checkout"
                          env={'sandbox'}
                          currency={'USD'}
                          total={'total'}
                          client={{sandbox: 'A-AHrUfEgAdhsTL6P4TNbP4rSy21AeiVat-h5Cq.4uxALo1CAGUQSXTi'}}
        />
        </main>
    )
  }
}
