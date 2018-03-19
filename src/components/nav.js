import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import AppBar from 'material-ui/AppBar'
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton'

import {ModalButton} from './buttons'
import LoginForm from './forms/login'
import CreateUserForm from './forms/createUser'
import UpdateUserForm from './forms/updateUser'
import {isAuthenticated} from '../config/auth'

import {user_id} from '../config/auth'

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, NumCartItems: 0 }
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.data.loading && nextProps.data.user){
      if(nextProps.data.user.cart){this.setState({NumCartItems: nextProps.data.user.cart.products.length})}
    }
  }
  
  toggleDrawer = () => { this.setState({ open: !this.state.open }) }
  
  redirect = (route) => { window.location.replace(route) }
  
  render() {
    return !this.props.data.loading ?
      <section>
        <div>
          <AppBar title="Lego Store Prisma"
                  onLeftIconButtonClick={this.toggleDrawer}
                  iconElementRight={ isAuthenticated()?
                    <div className='appbar-buttons' >
                      <ModalButton label={'Edit User'} display={<UpdateUserForm id={user_id}/>} />
                      <div>{this.state.NumCartItems}</div>
                      <IconButton iconClassName="material-icons" href='/cart'>Shopping_Cart</IconButton>
                    </div>
                    :
                    <div className='appbar-buttons' >
                      <ModalButton className='button' label={'Login'} display={<LoginForm/>} />
                      <ModalButton label={'Sign-up'} display={<CreateUserForm />} />
                    </div>
                  }
          />
          <Drawer docked={false} open={this.state.open} onRequestChange={this.toggleDrawer}>
            <MenuItem onClick={() => this.redirect('/')}>Product List</MenuItem>
            {isAuthenticated()?<MenuItem onClick={() => this.redirect('/cart')}>Cart</MenuItem>:null}
          </Drawer>
        </div>
      
      </section> : <AppBar title='Lego Store Prisma'/>
    
  }
}
const USER_CART_QUERY = gql`
  query($id: ID!){
    user(id:$id){
      cart{
        products{
          id
        }
      }
    }
  }
`

export default graphql(USER_CART_QUERY,{options:(props) => ({variables:{id: user_id}})})(Nav)
