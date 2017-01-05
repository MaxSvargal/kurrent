// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import radium from 'radium'

import TopicsResultMessages from './TopicsResultMessages'

const RLink = radium(Link)

class TopicsList extends Component {
  props: {
    entities: {
      [id: string]: {
        key: string,
        title: string,
        desc: string,
        likes: number,
        dislikes: number,
        magnet: string
      }
    },
    ids: string[],
    peersNum: {
      [id: string]: string
    }
  }

  render() {
    const { entities, ids, peersNum } = this.props
    const styles = this.getStyles()
    const topics = ids.reduce((arr, id) =>
      entities[id] ?
        [ ...arr, { ...entities[id], peersNum: peersNum[id] } ] :
        arr, [])

    return (
      <div style={ styles.list }>
        <TopicsResultMessages finded={ ids.length } isset={ topics.length } />
        { topics.map((topic, index) => (
          <RLink
            to={ `topics/${topic.key}` }
            style={ styles.listItem }
            key={ index } >
            <div>
              <img src={ topic.pic } style={ styles.pic } alt='loading...' />
            </div>
            <div>
              <span style={ styles.title } >
                { topic.title }
              </span>
              { topic.peersNum &&
                <span style={ styles.peersNum }>
                  Peers: <strong>{ topic.peersNum }</strong>
                </span> }
              <p>{ topic.desc }</p>
            </div>
          </RLink>
        )) }
      </div>
    )
  }

  getStyles() {
    return {
      list: {
        display: 'flex',
        flexFlow: 'column wrap'
      },
      listItem: {
        padding: '1rem',
        display: 'flex',
        flexFlow: 'row nowrap',
        transition: 'background .3s ease-in-out',
        color: '#6e5443',
        textDecoration: 'none',
        ':hover': {
          background: '#fff'
        }
      },
      title: {
        color: '#ff6606',
        fontSize: '1.3rem'
      },
      peersNum: {
        background: '#a1bd13',
        marginLeft: '1rem',
        color: 'white',
        padding: '.3rem .5rem',
        fontSize: '.8rem'
      },
      pic: {
        width: '6rem',
        marginRight: '1rem'
      }
    }
  }
}

export default radium(TopicsList)
