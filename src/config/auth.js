import gql from 'graphql-tag'
import {apollo} from './apollo'
import jwt from 'jsonwebtoken'
import * as Storage from './localStorage'

export let user_id = ''

if(Storage.itemByKey('token')){
  const decode = jwt.verify(Storage.itemByKey('token'), 'JWT_SECRET')
  user_id = decode.userId
}

export const login = async (email,pw) => {
  await apollo.mutate({
    mutation: gql`
      mutation($email: String!, $pw: String!){
        login(
          email: $email,
          pw: $pw
        ){
          token
          user{
            id
          }
        }
      }
    `,
    variables: {
      email,
      pw
    }})
  .then((r) => {
    Storage.save('token', r.data.login.token)
    window.location.replace('/')
  })
  .catch(err => console.log(err))
}

export const logout = () => {
  Storage.reset()
    .then(() => {
      apollo.resetStore()
      Storage.reset()
      alert('logged out')
       window.location.replace('/')
    })
    .catch(err => console.error('Logout failed', err))
}

//returns boolean based on whether a login token is present in local storage
export const isAuthenticated = () => {
  try {
    if (!Storage.itemByKey('token')) return false
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}
