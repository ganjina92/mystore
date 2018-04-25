import React, {Component} from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import RaisedButton from 'material-ui/RaisedButton'
import {user_id} from '../../config/auth'

class CartButton extends Component {
  render(){
    return(
      <RaisedButton
         primary='true'
         label={this.props.label}
         onClick={() => {
          this.props.mutate()
          alert('Your Cart is Cleared!')
          window.location.replace('/cart')
        }} />
    )
  }
}

const CLEAR_CART_MUTATION = gql`
  mutation($user_id:ID!){
    clearCart(
      user_id: $user_id
    ){
      cart {
        id
        products {
          id
        }
      }
    }
  }
`

export default graphql(CLEAR_CART_MUTATION,{options:(props)=>({variables:{user_id}})})(CartButton)
