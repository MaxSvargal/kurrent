import React, { Component } from 'react'
import { Link } from 'react-router'

import { primary } from 'styles/colors'

export default class SearchInput extends Component {
  props: {
    indexSize: number
  }

  render() {
    const { indexSize } = this.props
    const styles = this.getStyles()

    return (
      <div style={ styles.root }>
        <Link to='/topics/new' style={ styles.btn }>+ torrent</Link>
        <div style={ styles.stats }>{ indexSize } topics in index</div>
      </div>
    )
  }

  getStyles() {
    return {
      root: {
        background: primary,
        color: '#fff',
        display: 'flex',
        flexFlow: 'row nowrap',
        height: '2.3rem',
        justifyContent: 'space-between',
        left: 0,
        position: 'fixed',
        top: 0,
        width: '100vw',
        zIndex: 8
      },
      btn: {
        background: '#a0be11',
        border: 0,
        color: '#fff',
        fontSize: '.8rem',
        textAlign: 'center',
        padding: 0,
        height: '1.6rem',
        margin: '.4rem 5.5rem',
        width: '5rem',
        lineHeight: '1.6rem',
        textDecoration: 'none'
      },
      stats: {
        margin: '0 1rem',
        fontSize: '.8rem',
        lineHeight: '2.3rem'
      }
    }
  }
}
