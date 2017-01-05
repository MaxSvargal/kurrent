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
        display: 'flex',
        flexFlow: 'row nowrap',
        height: '2.3rem',
        justifyContent: 'space-between',
        left: 0,
        position: 'fixed',
        top: 0,
        width: '100vw',
        zIndex: 8
      },
      backBtn: {
        background: '#fff',
        border: '1px solid #b2b1b2',
        color: '#b2b1b2',
        fontFamily: 'PT Sans',
        height: '1.6rem',
        fontSize: '.8rem',
        left: 0,
        lineHeight: '1.6rem',
        position: 'fixed',
        top: 0,
        margin: '.4rem 5.5rem',
        padding: '0 1rem'
      }
    }
  }
}

export default withRouter(TopBarBackLink)
