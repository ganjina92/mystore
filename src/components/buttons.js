import React, {Component} from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'

import '../styles/CreateProduct.css'

export class ModalButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      primary: true,
      secondary: false,
    }
  }
  componentDidMount () {
    if(this.props.color){
      if(this.props.color === 'secondary')
        this.setState({
          primary: false,
          secondary: true
        })
    }
  }
  render() {
    const {label, display} = this.props
    return (
      <span className="modal">
        <RaisedButton primary={this.state.primary}
                      secondary={this.state.secondary}
                      label={label}
                      className="button"
                      onClick={e => this.setState({ open: !this.state.open })} />
        <Dialog
          actions={<RaisedButton label='Close' onClick={e => this.setState({open: !this.state.open})}/>}
          open={this.state.open}
          onRequestClose={e => this.setState({open: !this.state.open})}>
          <div>{display}</div>
        </Dialog>
      </span>
    )
  }
}
