import React, {Component} from 'react'
import {ModalButton} from '../components/buttons'
import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import AllProducts from '../components/products/AllProducts'
import CreateProduct from '../components/forms/CreateProduct'
import  '../styles/style.css'


export default class extends Component {
  render () {
    return (
      <MuiThemeProvider>
      <AppBar title="Welcome We've been Expecting You"/>
        <ModalButton label='Add Product' display={<CreateProduct/>}/>
        <AllProducts/>
      </MuiThemeProvider>
      
    )
  }
}
