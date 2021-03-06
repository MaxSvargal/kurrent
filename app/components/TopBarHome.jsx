import React, { Component } from 'react'
import { Link } from 'react-router'

import colors from 'styles/colors'

export default class TopBarHome extends Component {
  props: {
    indexSize: number,
    finded: number,
    error: ?bool
  }

  render() {
    const { indexSize, finded, error } = this.props
    const styles = this.getStyles({ error })

    return (
      <div style={ styles.root }>
        <Link to='/topics/new' style={ styles.btn }>+ torrent</Link>
        <div style={ styles.stats }>
          { finded > 0 && <span>{ finded } results found | </span> }
          { indexSize } topics in index
        </div>
      </div>
    )
  }

  getStyles({ error }) {
    return {
      root: {
        background: error ? '#b7414f' : colors.primary,
        color: '#fff',
        width: '100%',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between'
      },
      btn: {
        background: error ? '#56585a' : '#a0be11',
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
        lineHeight: '2.4rem'
      }
    }
  }
}
