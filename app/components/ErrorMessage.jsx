import React, { Component } from 'react'

export default class ErrorMessage extends Component {
  props: {
    message: ?string
  }

  render() {
    const { message } = this.props
    const styles = this.getStyles()

    return (
      <div style={ styles.root }>
        <div style={ styles.container }>{ message }</div>
      </div>
    )
  }

  getStyles() {
    return {
      root: {
        top: '25vh',
        position: 'absolute',
        width: '100%'
      },
      container: {
        background: '#b7414f',
        color: '#ff5655',
        textAlign: 'center',
        margin: '0 10vw',
        padding: '1rem'
      }
    }
  }
}
