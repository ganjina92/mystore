import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

export default class extends Component {
    render () {
      return (
        <div>
          <form>
            <TextField label="Quantity" type="number"/>
            <RaisedButton label="Add"/>
          </form>
        </div>
      
      )
    }
}
