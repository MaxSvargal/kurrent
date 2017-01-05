import React, { Component } from 'react'

export default class FilesList extends Component {
  props: {
    files: {}[]
  }

  static formatSize(size) {
    const length = size.toString().length
    const fixed = (val, exp) =>
      (val * parseFloat(`0.${'0'.repeat(exp)}1`)).toFixed(1)

    switch (true) {
      case length >= 13: return `${fixed(size, 11)} TB`
      case length >= 10: return `${fixed(size, 8)} GB`
      case length >= 7: return `${fixed(size, 5)} MB`
      case length >= 4: return `${fixed(size, 2)} KB`
      default: return `${size} B`
    }
  }

  render() {
    const styles = this.getStyles()

    return (
      <div style={ styles.root }>
        { this.props.files.map((file, index) => (
          <div key={ index } style={ styles.child } >
            <span>{ file.name } { ' ' }</span>
            <small>{ FilesList.formatSize(file.size) }</small>
          </div>
        )) }
      </div>
    )
  }

  getStyles() {
    return {
      root: {
        display: 'flex',
        flexFlow: 'column wrap'
      },
      child: {
        fontSize: '.8rem',
        margin: '.25rem 0'
      }
    }
  }
}
