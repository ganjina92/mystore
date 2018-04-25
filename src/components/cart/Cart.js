import React, {Component} from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import {user_id} from '../../config/auth'
import Product from '../products/Product'
import '../../styles/style.css'


import CircularProgress from 'material-ui/CircularProgress'

class Cart extends Component {
  constructor(props){
    super(props)
    this.state = {
      cart: {},
      subtotal: 0,
      tax: 0,
      total: 0,
      products: [],
      quantity: ''
    }
  }
  async componentWillReceiveProps(nextProps){

    if(!nextProps.data.loading && nextProps.data.user.cart.products){

      let products = {}
      nextProps.data.user.cart.products.map(p =>(products[p.product.id] ?
          products[p.product.id].quantity++
          :
          products[p.product.id] = { ...p.product,cart_product_id: p.id, quantity:1 }
      ))

      products = Object.values(products)

      let subtotal = 0
      await products.map(p => subtotal = subtotal + (p.price * p.quantity))
      const tax = await subtotal*.08
      const total = await tax + subtotal
      await this.setState({
        subtotal,
        tax,
        total,
        products
      })
    }
  }
  render(){
    const {subtotal,tax,total} = this.state
    const {user, loading} = this.props.data


    return(loading && !user ? <div> Loading <CircularProgress /></div> :
        <div>
          {user.cart.products === 0 ? <div>Cart is Empty!</div> :
            <div>
              <section className="cartImage">

                {this.state.products.map(product => {
                  return <Product cartView={true} product={product} key={product.id}/>
                })}
              </section>
              <div>
                <div>Subtotal:${subtotal}</div>
                <div>Tax:${tax}</div>
                <div>Total:${total}</div>
              </div>
            </div>
          }
        </div>
    )
  }
}
const USER_CART_QUERY = gql`
  query($id: ID!){
    user(id:$id){
      cart{
        products{
          id
          product{
            id
            name
            imgURL
            price
            desc
          }
        }}}}`

export default graphql(USER_CART_QUERY,{options:(props) => ({variables:{id: user_id}})})(Cart)
