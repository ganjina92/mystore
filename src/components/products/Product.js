import React, {Component} from 'react'
import Paper from 'material-ui/Paper'
import gql from 'graphql-tag'
import {graphql , compose} from 'react-apollo'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'

import {ModalButton} from '../buttons'
import NumberFormat from 'react-number-format'
import  '../../styles/style.css'
import UpdateProduct from '../forms/UpdateProduct'
import RemoveShoppingCartIcon from 'material-ui-icons/RemoveShoppingCart'

import {user_id} from '../../config/auth'

class Product extends Component {
  render(){
    const {addToCart, removeFromCart, product} = this.props
    const AddToCart = async () => {
      await addToCart({variables:{product_id:product.id}}).then(r => console.log(r))
      window.location.replace('/cart')
    }
    const RemoveFromCart = async () => {
      await removeFromCart({variables:{product_id: product.cart_product_id}}).then(r => console.log(r))
      window.location.replace('/cart')
    }

    const DeleteProduct = () => (
      <RaisedButton label="Confirm Delete"
                    onClick={handleClick}
      />
    )
    const handleClick = async (e) => {
      e.preventDefault()
      await this.props.mutate()
      window.location.replace('/')
    }

    return(
      <Paper className="product" zDepth={4}>
        <h2>{product.name}</h2>
        <img src={product.imgURL} className="carPic" alt={'Not Available'}/>
        <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          <p className='desc'>{product.desc}</p>

        {this.props.cartView?
          <div>
            <IconButton onClick={() => RemoveFromCart()}><RemoveShoppingCartIcon/></IconButton>
            <div>Quantity:{product.quantity}</div>
          </div>
          :
          <div>
            <RaisedButton className="myAddButton" primary='true'
                          label=" Add To Cart"
                          onClick={() => AddToCart()}/>

            <ModalButton className="myUpdate"
                          label="Update" primary="true"
                          display={<UpdateProduct product={product}/>}/>

            <ModalButton className="myDelete"
                         label="Delete"
                         display={DeleteProduct (product)}
                         onClick={() => DeleteProduct}/>

          </div>
        }
      </Paper>
    )
  }
}
const ADD_TO_CART = gql`
  mutation($user_id:ID!, $product_id:ID!){
    addProductToCart(
      user_id: $user_id
      product_id: $product_id
    ){
      cart{
        id
        products{
          product{
            id
            name
          }
        }
      }
    }
  }
`
const REMOVE_FROM_CART = gql`
  mutation($user_id:ID!, $product_id:ID!){
    removeProductFromCart(
      user_id: $user_id
      product_id: $product_id
    ){
      cart {
        id
        products{
          product{
            id
            name
          }
        }
      }
    }
  }
`
const DELETE_PRODUCT_MUTATION = gql`
  mutation($id: ID!) {
    deleteProduct(
      id: $id
    ){
      id
    }
  }
`

export default compose(
  graphql(ADD_TO_CART,{name:'addToCart', options: () => ({variables:{user_id}})}),
  graphql(REMOVE_FROM_CART,{name:'removeFromCart', options: () => ({variables:{user_id}})}),
  graphql(DELETE_PRODUCT_MUTATION, {name:'deleteProduct', options: (props) => ({variables: {id: props.product.id}})})
)(Product)
