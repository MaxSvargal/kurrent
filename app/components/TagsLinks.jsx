import React, { Component } from 'react'
import radium from 'radium'
import { Link } from 'react-router'

const RLink = radium(Link)

export default class TagsLinks extends Component {
  props: {
    tags: string[]
  }

  render() {
    const { tags } = this.props
    const styles = this.getStyles()

    return (
      <div style={ styles.root } >
        { tags.map((tag, index) => (
          <span key={ index } >
            <RLink
              to={ `/tag/${tag}` }
              style={ styles.link }
              key={ index } >
              #{ tag }
            </RLink>
            { index !== tags.length - 1 && <span>, </span> }
          </span>
        )) }
      </div>
    )
  }

  getStyles() {
    return {
      root: {
        position: 'absolute',
        width: '100vw',
        bottom: '30vh',
        textAlign: 'center'
      },
      link: {
        color: '#6a503f',
        ':hover': {
          color: '#ff6603'
        }
      }
    }
  }
}
