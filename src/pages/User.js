import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import HomeIcon from 'material-ui-icons/Home'

/*import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';*/

class User extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      email: '',
      avatar: ''
    }
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.data.loading){
      return this.setState({
        name: nextProps.data.user.name,
        email: nextProps.data.user.email,
        avatar: nextProps.data.user.avatar
      })
    }
  }
  render() {
    return (
      <div>
        <Link to="/"><HomeIcon/></Link>
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
