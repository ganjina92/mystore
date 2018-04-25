import React, {Component} from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {GridList, GridTile} from 'material-ui/GridList'
import CircularProgress from 'material-ui/CircularProgress'
import SearchBar from 'material-ui-search-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Product from './Product'
import '../../styles/style.css'

class AllProducts extends Component {
  constructor(props){
    super(props)
    this.state = {
      search: ''
    }
  }

  render(){
    const {allProducts} = this.props.data

    return (!this.props.loading && allProducts ) ? (
      <MuiThemeProvider className='list'>
        <SearchBar
          onChange={(e) => this.setState({search: e.toLowerCase()}) }
          onRequestSearch={() => console.log('onRequestSearch')}
          style={{
            margin: '0 auto',
            minWidth: 200,
            border: "10px"
          }}
        />
        <section>
          <GridList cols="4" cellHeight="auto" >
            {allProducts
              .filter(product=> {
                if(this.state.search  === ''){return product}
                return (
                  product.price.toString().toLowerCase().includes(this.state.search.toLowerCase()) ||
                  product.name.toLowerCase().includes(this.state.search.toLowerCase())
                )
              })
              .map(product =>(
                  <GridTile>
                    <Product cartView={false} product={product} key={product.id}/>
                  </GridTile>
                )
              )}
          </GridList>
        </section>
      </MuiThemeProvider>
    ) : <div>Loading
      <CircularProgress /> </div>
  }
}



const ALL_PRODUCTS_QUERY = gql`
  query{
    allProducts {
      id
      name
      imgURL
      desc
      price
    }
  }
`

export default graphql(ALL_PRODUCTS_QUERY)(AllProducts)
