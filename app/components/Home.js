import React, { Component } from 'react'

import bgImg from 'images/background.png'
import { primary } from 'styles/colors'

import FloatedSearchPanel from './FloatedSearchPanel'
import TagsLinks from './TagsLinks'
import TopBar from './TopBar'
import TopicsList from './TopicsList'

export default class Home extends Component {
  props: {
    entities: {
      [id: string]: {
        title: string,
        desc: string,
        likes: number,
        dislikes: number,
        magnet: string,
        tags: string[]
      }
    },
    ids: string[],
    finded: string[],
    peersNum: {},
    search: () => void,
    createTopic: () => void
  }

  render() {
    const { entities, ids, finded, peersNum } = this.props
    const styles = this.getStyles()
    const tags = [ ...new Set(
      Object.keys(entities).reduce((arr, key) =>
        arr.concat(entities[key].tags), [])) ]

    return (
      <div style={ styles.root }>
        <TopBar
          indexSize={ ids.length }
          onCreateTopic={ this.props.createTopic } />

        <FloatedSearchPanel
          onChange={ this.props.search }
          anyFinded={ finded.length > 0 } />

        <TopicsList
          entities={ entities }
          ids={ finded }
          peersNum={ peersNum } />

        { finded.length === 0 &&
          <TagsLinks tags={ tags } /> }
      </div>
    )
  }

  getStyles() {
    return {
      root: {
        background: `${primary} url(${bgImg}) -17vw 6vh`,
        minHeight: '95vh',
        color: '#685546',
        fontFamily: 'PT Sans'
      }
    }
  }
}
