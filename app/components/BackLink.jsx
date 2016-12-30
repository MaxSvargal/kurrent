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
          border: '1px solid #f1f1f1',
          color: '#ccc',
          fontFamily: 'PT Sans',
          fontSize: '1.2rem',
          margin: '1rem 2rem',
          padding: '.5rem 1rem'
        } }
        onClick={ this.props.router.goBack } >
        ← Back
      </button>
    )
  }
}

export default withRouter(BackLink)
