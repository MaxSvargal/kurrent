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
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        background: '#fff',
        border: '4px dashed #333',
        outline: '8px solid #fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.6rem'
      }
    }
  }
}
