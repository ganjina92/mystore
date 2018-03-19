import React, {Component} from 'react'

import {ModalButton} from '../components/buttons'

import AllProductsList from '../components/products/AllProducts'
import CreateProduct from '../components/forms/CreateProduct'

export default class extends Component {
  render(){
    return(
      <main>
        
        <ModalButton  label={'Add Product'} display={<CreateProduct/>} />
        
        <AllProductsList />
      </main>
    )
  }
}
