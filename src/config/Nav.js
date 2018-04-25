import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import HomeIcon from 'material-ui-icons/Home'
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart'
import RaisedButton from 'material-ui/RaisedButton'
import { grey700 } from '../colors/colors'

import { ModalButton } from '../components/buttons'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import MenuItem from 'material-ui/MenuItem'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import CreateUser from '../components/forms/CreateUser'
import Login from '../components/forms/Login'
import '../styles/style.css'

import { user_id, logout } from './auth'

const LoggedIn = () => (
  <span>
    <IconButton onClick={() => window.location.replace('/cart')}><ShoppingCartIcon/></IconButton>
    <RaisedButton label="Logout" onClick={logout}/>
  </span>
)

const LoggedOut = () => (
  <ModalButton label="Login" display={<Login/>}/>
)
export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  render() {
    const toggleOpen = () => {
      console.log('open')
      this.setState({ open: !this.state.open })
    }
    const handleClick = (match) => {
      window.location.replace(match)
    }
    return (
      <div>
        <MuiThemeProvider>
          <div className='appBar'>
            <AppBar style={{ backgroundColor: grey700 }}
                    title="Pending"
                    onLeftIconButtonClick={toggleOpen}/>
            <Drawer open={this.state.open}
                    onRequestChange={toggleOpen}
                    docked={false}
            >
              <MenuItem onClick={() => handleClick('/')}>Home</MenuItem>
              <MenuItem onClick={() => handleClick('/')}>Products</MenuItem>
              <MenuItem onClick={() => handleClick('/Cart')}>Shopping Cart</MenuItem>
              <MenuItem onClick={() => handleClick('/User')}>User</MenuItem>
            </Drawer>
          </div>
          <IconButton onClick={() => window.location.replace('/')}><HomeIcon/></IconButton>
          <ModalButton className='createUser'
                       label="Create User" display={<CreateUser/>}/>
          {(!user_id) ? LoggedOut() : LoggedIn()}
        </MuiThemeProvider>
      </div>
    )
  }
}
