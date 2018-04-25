import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

const endpoint = new HttpLink({ uri: 'https://simple-store-jkspuqrrvy.now.sh/' })

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

export const apollo = new ApolloClient({
  link: authLink.concat(endpoint),
  cache: new InMemoryCache()
})
