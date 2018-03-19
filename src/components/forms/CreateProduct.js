import React, {Component} from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import '../../styles/CreateProduct.css'

class CreateProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      imgURL: '',
      desc: '',
      price: '',
    }
    }
  render () {
    const handleSubmit = async (e) => {
      e.preventDefault()
      await this.props.mutate({
        variables: {
          name:this.state.name,
          imgURL: this.state.imgURL,
          desc: this.state.desc,
          price: this.state.price,
        }
        
      })
      window.location.replace('/')
    }
    return (
      <form className='flexBox'
             onSubmit={handleSubmit}>
        
        <h3>Create Product</h3>
        <TextField required floatingLabelText="Name"
                   onChange={e => this.setState({ name: e.target.value})}
        />
        <TextField floatingLabelText="Image-URL"
                   onChange={e => this.setState({ imgURL: e.target.value})}
        />
        <TextField required floatingLabelText="Description"
                   onChange={e => this.setState({ desc: e.target.value})}
        />
        <TextField required floatingLabelText="Quantity"
                   onChange={e => this.setState({ quantity: e.target.value})}
                   type= "number"
                   min= "1"
                   max="100"
                   step="1"
        />
        <TextField required floatingLabelText="Price"
                   onChange={e => this.setState({ price: e.target.value})}
                   type="number"
                   min="0" step="$1,000.00" max='100000000'
                   />
        <RaisedButton backgroundColor="#F44336"
                      primary="true"
                      label="Create"
                      type="Submit"/>
      </form>
    );
  }
}
const CREATE_PRODUCT_MUTATION = gql`
  mutation($name:String!, $imgURL:String, $desc:String!, $price:Float! $quantity: Int){
    createProduct(
      name: $name,
      imgURL: $imgURL,
      desc: $desc,
      price: $price,
      quantity: $quantity
    ){
      id
    }
  }
`
export default graphql(CREATE_PRODUCT_MUTATION)(CreateProduct)
