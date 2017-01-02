// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'

import BackLink from 'components/BackLink'

export default class Topic extends Component {
  props: {
    id: string,
    topic: {
      title: string,
      desc: string,
      likes: number,
      dislikes: number,
      magnet: string
    },
    downloadMagnet: () => void
  }

  render() {
    const { id, topic, downloadMagnet } = this.props
    const { title, desc, likes, dislikes, magnet } = topic || {}
    const styles = this.getStyles()

    return (
      <div style={ styles.root } >
        <div style={ styles.container } >
          <h1>{ title }</h1>
          <div>{ desc }</div>
          <button
            style={ styles.btn }
            onClick={ () => downloadMagnet(magnet) } >
            Download
          </button>
        </div>
      </div>
    )
  }

  getStyles() {
    return {
      root: {
        background: '#f2f1ef',
        color: '#685546',
        minHeight: '100vh'
      },
      container: {
        margin: '2vw'
      },
      btn: {
        margin: '1rem',
        fontSize: '1.34rem'
      }
    }
  }
}
