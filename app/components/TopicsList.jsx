// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import radium from 'radium'

import TopicsResultMessages from './TopicsResultMessages'
import CometsAnim from './CometsAnim'

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
      <div>
        <TopicsResultMessages finded={ ids.length } isset={ topics.length } />
        { topics.length === 0 && <CometsAnim /> }

        { topics.length > 0 &&
          <div style={ styles.list }>
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
                    { topic.name }
                  </span>
                  { topic.peersNum &&
                    <span style={ styles.peersNum }>
                      Peers: <strong>{ topic.peersNum }</strong>
                    </span> }
                  <p>{ topic.body }</p>
                </div>
              </RLink>
            )) }
          </div>
        }
      </div>
    )
  }

  getStyles() {
    return {
      list: {
        display: 'flex',
        flexFlow: 'column wrap',
        background: '#f9f8f8',
        minHeight: '88vh'
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
