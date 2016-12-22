// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'

import SearchInput from './SearchInput'

export default class Home extends Component {
  props: {
    topics: {
      [id: string]: {
        title: string,
        desc: string,
        likes: number,
        dislikes: number,
        magnet: string
      }
    },
    finded: string[],
    search: () => void,
    createTopic: () => void
  }

  searchHandle = (event: { target: { value: string } }) =>
    this.props.search(event.target.value)

  createTopicHandle = () =>
    this.props.createTopic('sha1key', { title: 'zerovalue' })

  render() {
    const { topics, finded } = this.props
    const styles = this.getStyles()
    const ids = finded.length > 0 ? finded : Object.keys(topics)

    return (
      <div>
        <div style={ styles.centered(finded.length > 0) } >
          <SearchInput onChange={ this.searchHandle } />
          <div>i.e. year 2015 or 1016</div>
          <button onClick={ this.createTopicHandle } style={ styles.btn }>
            Create demo topic
          </button>
        </div>

        <div style={ styles.list }>
          { ids.map(id => (
            <div key={ id } >
              <Link to={ `topic/${id}` }>{ topics[id].title }</Link>
              <p>{ topics[id].desc }</p>
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
      }
    }
  }
}
