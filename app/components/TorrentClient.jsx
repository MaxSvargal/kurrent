import React, { Component } from 'react'

export default class TorrentClient extends Component {
  props: {
    ids: [],
    entities: {}
  }

  render() {
    const { ids, entities } = this.props
    const styles = this.getStyles()

    return (
      <div style={ styles.root }>
        { ids.map((id, index) => (
          <div key={ index } style={ styles.child } >
            <span>{ entities[id].name }</span>
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
