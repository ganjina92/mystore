import React, {Component} from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import Drawer from 'material-ui/Drawer'

export class ModalButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  render() {
    const {label, display} = this.props
    return (
      <div>
        <RaisedButton secondary={true} label={label} onClick={e => this.setState({ open: !this.state.open })} />
        <Dialog
          actions={<RaisedButton label='Close' onClick={e => this.setState({open: !this.state.open})}/>}
          open={this.state.open}
          onRequestClose={e => this.setState({open: !this.state.open})}>
          <div>{display}</div>
        </Dialog>
      </div>
    )
  }
}

export class DrawerButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  render() {
    return (
      <div>
        <RaisedButton secondary={true} label={this.props.label} onClick={e => this.setState({ open: !this.state.open })} />
        <Drawer openSecondary={this.props.secondary}
                docked={false}
                open={this.state.open}
                onRequestChange={e => this.setState({ open: !this.state.open })}>
          <div>{this.props.display}</div>
        </Drawer>
      </div>
    )
  }
}
