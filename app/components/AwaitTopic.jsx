import React, { Component } from 'react'
import { withRouter } from 'react-router'

@withRouter
export default class AwaitTopic extends Component {
  props: {
    router: {
      replace: () => void
    },
    name: string,
    id: ?string,
    entities: {}
  }

  componentWillReceiveProps(props) {
    const { id, entities, router } = props
    entities[id] && router.replace(`/topics/${id}`)
  }

  render() {
    return (
      <h1>Creating torrent { this.props.name } ...</h1>
    )
  }
}
