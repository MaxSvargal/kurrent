import React, { Component } from 'react'

import colors from 'styles/colors'
import bgImg from 'images/background.png'

import FloatedSearchPanel from './FloatedSearchPanel'
import TagsLinks from './TagsLinks'
import TopBar from './TopBar'
import TopBarHome from './TopBarHome'
import TopicsList from './TopicsList'
import ErrorMessage from './ErrorMessage'

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
    searchIndexLen: number,
    peersNum: {},
    allPeersConnectFailed: ?[],
    doSearch: () => void
  }

  render() {
    const {
      entities, ids, finded, peersNum, doSearch,
      searchIndexLen, allPeersConnectFailed: connError
    } = this.props

    const lastError = connError && connError[connError.length - 1]
    const styles = this.getStyles()
    const tags = [ ...new Set(ids.reduce((arr, key) =>
      arr.concat(entities[key].tags), [])) ]

    return (
      <div style={ styles.root }>
        <TopBar>
          <TopBarHome
            indexSize={ searchIndexLen }
            finded={ finded.length }
            error={ Boolean(lastError) } />
        </TopBar>

        <FloatedSearchPanel
          onChange={ doSearch }
          anyFinded={ finded.length > 0 } />

        <TopicsList
          entities={ entities }
          ids={ finded }
          peersNum={ peersNum } />

        { lastError === true &&
          <ErrorMessage message='The all connections to peers are failed. You have no connection :(' /> }

        { finded.length === 0 &&
          <TagsLinks tags={ tags } /> }
      </div>
    )
  }

  getStyles() {
    return {
      root: {
        background: `${colors.primary} url(${bgImg}) -17vw 6vh`,
        minHeight: '95vh',
        color: '#685546'
      }
    }
  }
}
