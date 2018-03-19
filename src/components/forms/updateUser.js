import React, {Component} from 'react'
import gql from 'graphql-tag'
import {compose, graphql} from 'react-apollo'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class UpdateUserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: ''
    }
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.data.loading){
      return this.setState({
        name: nextProps.data.user.name,
        email: nextProps.data.user.email
      })
    }
  }
  
  submitForm = async () => {
    await this.props.mutate({
      variables: {
        id: this.props.id,
        name: this.state.name,
        email: this.state.email,
        pw: this.state.pw
      }
    })
    await alert(`Thanks for updating yours account!`)
    window.location.replace('/')
  }
  
  render() {
    const {data, loading} = this.props
    return (!loading && data) ?
      <form onSubmit={e => {
        e.preventDefault() //this stops the page from redireting when you hit submit
        this.submitForm()
      }}>
        <TextField required floatingLabelText={`Name`} value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
        <TextField required floatingLabelText={`Email`} value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
        <RaisedButton label='Submit' type='submit' />
      </form> : <div>loading...</div>
    
  }
}
const USER_QUERY = gql`
  query($id: ID!){
    user(id:$id){
      name
      email
    }
  }
`

const UPDATE_USER_MUTATION = gql`
  mutation($id:ID!, $name: String!, $email: String!){
    updateUser(
      id: $id,
      name: $name,
      email: $email
    ){
      id
    }
  }
`

export default compose(
  graphql(UPDATE_USER_MUTATION),
  graphql(USER_QUERY,{options:(props) => ({variables:{id: props.id}})})
)(UpdateUserForm)
