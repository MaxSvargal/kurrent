// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'

import TopBarBackLink from 'components/TopBarBackLink'

export default class Topic extends Component {
  props: {
    id: string,
    topic: {
      name: string,
      body: string,
      magnetURI: string
    },
    downloadMagnet: () => void
  }

  render() {
    const { topic, downloadMagnet } = this.props
    const { name, body, magnetURI } = topic || {}
    const styles = this.getStyles()

    return (
      <div style={ styles.root } >
        <TopBarBackLink />
        <div style={ styles.container } >
          <h1>{ name }</h1>
          <div>{ body }</div>
          <button
            style={ styles.btn }
            onClick={ () => downloadMagnet(magnetURI) } >
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
