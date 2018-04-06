import React, {Component} from 'react'
import {ModalButton} from '../components/buttons'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import AllProducts from '../components/products/AllProducts'
import CreateProduct from '../components/forms/CreateProduct'
import  '../styles/style.css'

export default class extends Component {
  render () {
    return (
      <MuiThemeProvider>
        <div>
        <ModalButton  className='modal' label='Add Product' display={<CreateProduct/>}/>
        <AllProducts/>
        </div>
      </MuiThemeProvider>
      
    )
  }
}
