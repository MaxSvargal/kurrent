// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'

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
    const ids = finded.length > 0 ? finded : Object.keys(topics)

    return (
      <div>
        <input
          onChange={ this.searchHandle }
          placeholder='Search...'
          style={ { padding: '2%', marginBottom: '1rem', width: '95%' } } />

        <button onClick={ this.createTopicHandle }>
          Create demo topic
        </button>

        { ids.map(id => (
          <div key={ id } >
            <Link to={ `topic/${id}` }>{ topics[id].title }</Link>
            <p>{ topics[id].desc }</p>
          </div>
        )) }
      </div>
    )
  }
}
