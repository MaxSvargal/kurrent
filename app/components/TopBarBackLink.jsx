import React, { Component } from 'react'
import { withRouter } from 'react-router'

class TopBarBackLink extends Component {
  props: {
    router: {
      goBack: () => void
    }
  }

  render() {
    const styles = this.getStyles()

    return (
      <div style={ styles.root }>
        <button
          style={ styles.backBtn }
          onClick={ this.props.router.goBack } >
          ← Back
        </button>
      </div>
    )
  }

  getStyles() {
    return {
      root: {
        background: '#fff',
        width: '100%'
      },
      backBtn: {
        background: '#fff',
        border: '1px solid #b2b1b2',
        color: '#b2b1b2',
        height: '1.6rem',
        fontSize: '.8rem',
        lineHeight: '1.6rem',
        margin: '.4rem 5.5rem',
        padding: '0 1rem'
      }
    }
  }
}

export default withRouter(TopBarBackLink)
