import React, { Component } from 'react'
import dragDrop from 'drag-drop'

export default class DragDrop extends Component {
  props: {
    onDrop: () => void
  }

  componentDidMount() {
    dragDrop('#dropTarget', this.props.onDrop)
  }

  render() {
    const styles = this.getStyles()
    return (
      <div id='dropTarget' style={ styles.root } >
        <div style={ styles.box } >
          Drop files here
        </div>
      </div>
    )
  }

  getStyles() {
    return {
      root: {
        width: '92vw',
        height: '16vh',
        margin: '1vh 4vw'
      },
      box: {
        alignItems: 'center',
        background: '#fff',
        border: '4px dashed #b2b1b2',
        boxSizing: 'border-box',
        color: '#b2b1b2',
        display: 'flex',
        fontSize: '1.6rem',
        height: '100%',
        justifyContent: 'center',
        outline: '8px solid #fff',
        width: '100%'
      }
    }
  }
}
