import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import HomeIcon from 'material-ui-icons/Home'
import '../styles/style.css'



class User extends Component {
  constructor(props){
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
  render() {
    return (
      <div>
      <div>
        <Link to="/"><HomeIcon/></Link>
      </div>
      <h1>Welcome To The Store, Where Everyone Can Afford Any Car!!!</h1><hr/>
        <h2>{this.state.name}</h2>
        <h2>{this.state.email}</h2>

      </div>
    );
  }
}

const USER_QUERY = gql`
  query($id: ID!){
    user (
      id: $id
    ){
      id
      name
      email
    }
  }
`

export default graphql(USER_QUERY, {
  options: ({match}) => (
    {variables: { id: match.params.userID }}
  )
})(User)
