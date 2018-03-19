import React, {Component} from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import bcrypt from 'bcryptjs'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class CreateUserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      pw: ''
    }
  }
  
  submitForm = async () => {
    await this.props.mutate({
      variables: {
        name: this.state.name,
        email: this.state.email,
        pw: this.state.pw
      }
    })
    await alert(`Thanks for creating an account!`)
    window.location.replace('/login')
  }
  
  render() {
    return (
      <form onSubmit={e => {
        e.preventDefault()
        this.submitForm()
      }}>
        <TextField required floatingLabelText={`Name`} onChange={e => this.setState({ name: e.target.value })} />
        <TextField required floatingLabelText={`Email`} onChange={e => this.setState({ email: e.target.value })} />
        <TextField required floatingLabelText={`Password`} onChange={e => this.setState({ pw: bcrypt.hash(e.target.value, 10)})} />
        
        <RaisedButton label='Submit' type='submit' />
      </form>
    )
  }
}
const CREATE_USER_MUTATION = gql`
  mutation($name: String!, $email: String!, $pw: String!){
    createUser(
      name: $name,
      email: $email,
      pw: $pw
    ){
      id
    }
  }
`

export default graphql(CREATE_USER_MUTATION)(CreateUserForm)
