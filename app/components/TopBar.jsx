import React, { Component } from 'react'

export default class TopBar extends Component {
  props: {
    children: {}
  }

  render() {
    const styles = this.getStyles()

    return (
      <div style={ styles.root }>{ this.props.children }</div>
    )
  }

  getStyles() {
    return {
      root: {
        height: '2.3rem',
        left: 0,
        position: 'fixed',
        top: 0,
        WebkitAppRegion: 'drag',
        width: '100vw',
        zIndex: 8
      }
    }
  }
}
