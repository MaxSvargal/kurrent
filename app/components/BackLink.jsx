import React, { Component } from 'react'
import { withRouter } from 'react-router'

class BackLink extends Component {
  props: {
    router: {
      goBack: () => void
    }
  }

  render() {
    return (
      <button
        style={ {
          background: '#fff',
          border: '1px solid #b2b1b2',
          color: '#b2b1b2',
          fontFamily: 'PT Sans',
          fontSize: '1.2rem',
          padding: '.5rem 1rem'
        } }
        onClick={ this.props.router.goBack } >
        ← Back
      </button>
    )
  }
}

export default withRouter(BackLink)
