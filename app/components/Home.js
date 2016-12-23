// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'

import SearchInput from './SearchInput'

export default class Home extends Component {
  props: {
    entities: {
      [id: string]: {
        title: string,
        desc: string,
        likes: number,
        dislikes: number,
        magnet: string
      }
    },
    ids: string[],
    finded: string[],
    peersNum: {},
    search: () => void,
    createTopic: () => void
  }

  searchHandle = (event: { target: { value: string } }) =>
    this.props.search(event.target.value)

  createTopicHandle = () =>
    this.props.createTopic('sha1key', { title: 'zerovalue' })

  render() {
    const { entities, ids, finded, peersNum } = this.props
    const styles = this.getStyles()
    const topicIds = finded.length > 0 ? finded : ids

    return (
      <div>
        <div style={ styles.centered(finded.length > 0) } >
          <div>{ ids.length } topics in index</div>
          <SearchInput onChange={ this.searchHandle } />
          <div>i.e. year 2015 or 2016</div>
          <button onClick={ this.createTopicHandle } style={ styles.btn }>
            Create demo topic
          </button>
        </div>

        <div style={ styles.list }>
          { topicIds.map(id => entities[id] && (
            <div key={ id } >
              <Link to={ `topic/${id}` }>{ entities[id].title }</Link>
              { peersNum[id] &&
                <div style={ styles.peersNum }>
                  Peers: { peersNum[id] }
                </div> }
              <p>{ entities[id].desc }</p>
            </div>
          )) }
        </div>
      </div>
    )
  }

  getStyles() {
    return {
      centered: (isResultsIsset: bool) => ({
        width: '80vw',
        height: isResultsIsset ? '10rem' : '100vh',
        margin: '0 10vw',
        display: 'flex',
        flexFlow: 'column wrap',
        justifyContent: 'center',
        alignItems: 'center'
      }),
      list: {},
      btn: {
        margin: '1rem',
        fontSize: '1.34rem'
      },
      peersNum: {
        background: 'green',
        color: 'white',
        fontWeight: 'bold',
        padding: '.5rem',
        margin: '.5rem'
      }
    }
  }
}
