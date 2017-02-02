import React, { Component } from 'react'

export default class ErrorMessage extends Component {
  props: {
    message: ?string
  }

  state = {
    show: false
  }

  componentDidMount() {
    setTimeout(() => this.setState({ show: true }), 60)
    setTimeout(() => this.setState({ show: false }), 5000)
  }

  render() {
    const { message } = this.props
    const { show } = this.state
    const styles = this.getStyles({ show })

    return (
      <div style={ styles.root }>
        <div style={ styles.container }>{ message }</div>
      </div>
    )
  }

  getStyles({ show }) {
    return {
      root: {
        top: '10vh',
        position: 'absolute',
        width: '100%',
        zIndex: 1
      },
      container: {
        background: '#b7414f',
        color: '#ff5655',
        textAlign: 'center',
        margin: '0 10vw',
        padding: '1rem',
        transition: 'all .6s',
        transform: show ?
          'translate3d(0, 0, 0)' :
          'translate3d(0, -20vh, 0)'
      }
    }
  }
}
