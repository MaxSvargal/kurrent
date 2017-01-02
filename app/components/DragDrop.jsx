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
      <div id='dropTarget' style={ styles.box } >
        Drop files here
      </div>
    )
  }

  getStyles() {
    return {
      box: {
        alignItems: 'center',
        background: '#fff',
        border: '4px dashed #b2b1b2',
        boxSizing: 'border-box',
        color: '#b2b1b2',
        display: 'flex',
        fontSize: '1.6rem',
        justifyContent: 'center',
        minHeight: '16vh'
      }
    }
  }
}
