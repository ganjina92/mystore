import React, {Component} from 'react'
import Paper from 'material-ui/Paper'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import RaisedButton from 'material-ui/RaisedButton'

import {ModalButton} from '../buttons'
import '../../styles/CreateProduct.css'
import UpdateProduct from '../forms/UpdateProduct'
import CreateCartProduct from '../forms/CreateCartProduct'


class Product extends Component {
  render(){
    
    const {product} = this.props
    
    const DeleteProduct = () =>(
        <RaisedButton label="Confirm Delete"
                      onClick={handleClick}
        />
    )
  
    const AddToCart = () =>(
      <RaisedButton label="Add To Cart"
                    onClick={handleClick}
      />
    )
    
    const handleClick = async (e) => {
      e.preventDefault()
      await this.props.mutate()
      window.location.replace('/')
    }
    return(
      <Paper className='product'>
        <img src={product.imgURL}  className="carPic" alt={'Not Available'}/>
        <h2>{product.name}</h2>
        <div>${product.price}</div>
          <textarea rows="2" cols="25" className="desc" readOnly >{product.desc}</textarea>
        <div> {product.quantity}</div>
        <div className="myUpdate">
          <CreateCartProduct/>
          <ModalButton label="Update" display={<UpdateProduct product={product}/>} />
          <ModalButton label="Delete" display={DeleteProduct (product)} />
       </div>
        <br/>
       <div className="myButton">
         <ModalButton label=" Add To Cart" display={AddToCart (product)}/>
       </div>
      </Paper>
    )
  }
}
const DELETE_PRODUCT_MUTATION = gql`
 mutation ($id: ID!) {
 deleteProduct(
   id: $id
 ){
    id
  }
 }
`
 export default graphql(DELETE_PRODUCT_MUTATION,
  {options: (props) => ({variables: {id: props.product.id}})}
)(Product)
