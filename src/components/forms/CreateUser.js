import React, {Component} from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import '../../styles/CreateProduct.css'

class CreateUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      pw: ''
    }
  }
  render() {
  const submitUser = async (e) => {
    e.preventDefault()
    let userID= await this.props.mutate({
      variables: {
        name: this.state.name,
        email: this.state.email,
        pw: this.state.pw
      }
    })
    // await alert(`Welcome New User!`)
    window.location.replace(`/users/${userID.data.createUser.id}`)
  }
  
  
    return (
      <form className= 'flexBox'
        onSubmit={submitUser}>
        <TextField required floatingLabelText={`Name`} onChange={e => this.setState({ name: e.target.value })} />
        <TextField required floatingLabelText={`Email`} onChange={e => this.setState({ email: e.target.value })} />
        <TextField required floatingLabelText={`Password`}
                   type='password'
                   onChange={e => this.setState({ pw: e.target.value})} />
        <RaisedButton
          type='submit'
          primary='true'
          label='Register'  />
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

export default graphql(CREATE_USER_MUTATION)(CreateUser)
