import React, {Component} from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

class User extends Component {

}


const USER_QUERY = gql `
  query ($id: ID!) {
    user (
    id: $id
    ){
    id
    }
      }
    `
