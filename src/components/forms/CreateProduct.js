import React, {Component} from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import TextField from 'material-ui/TextField'
import NumberFormat from 'react-number-format'
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
        <TextField required floatingLabelText="Price"
                   onChange={e => this.setState({ price: e.target.value})}
                   type="number"
          />
        <NumberFormat value={this.state.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        <RaisedButton primary="true"
                      label="Create"
                      type="Submit"
                      min='0.00' step="1000.00" max='10000000000.00'/>
      </form>
    );
  }
}
const CREATE_PRODUCT_MUTATION = gql`
  mutation($name:String!, $imgURL:String, $desc:String!, $price:Float!){
    createProduct(
      name: $name,
      imgURL: $imgURL,
      desc: $desc,
      price: $price
    ){
      id
    }
  }
`
export default graphql(CREATE_PRODUCT_MUTATION)(CreateProduct)
