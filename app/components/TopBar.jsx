import React, { Component } from 'react'
import { Link } from 'react-router'

export default class SearchInput extends Component {
  props: {
    indexSize: number
  }

  render() {
    const { indexSize } = this.props
    const styles = this.getStyles()

    return (
      <div style={ styles.root }>
        <div style={ styles.stats }>{ indexSize } topics in index</div>
        <Link to='/new' style={ styles.btn }>+ torrent</Link>
      </div>
    )
  }

  getStyles() {
    return {
      root: {
        height: '5vh',
        background: '#6e5445',
        color: '#fff',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between'
      },
      btn: {
        background: '#a0be11',
        border: 0,
        color: '#fff',
        fontSize: '.8rem',
        textAlign: 'center',
        padding: 0,
        height: '3vh',
        margin: '1vh',
        width: '5rem',
        lineHeight: '3vh',
        textDecoration: 'none'
      },
      stats: {
        margin: '.5rem'
      }
    }
  }
}
