import React, { Component } from 'react'

export default class TopicsResultMessages extends Component {
  props: {
    finded: number,
    isset: number
  }

  render() {
    const { finded, isset } = this.props
    const styles = this.getStyles()

    return (
      <div >
        <div style={ styles.finded }>
          Finded { finded } results
        </div>
        { finded !== isset &&
          <div style={ styles.onProccess } >
            Peers requests on progress. Please, wait...
          </div>
        }
      </div>
    )
  }

  getStyles() {
    return {
      finded: {
        margin: '1rem 8rem',
        fontSize: '.9rem',
        color: '#6e5445'
      },
      onProccess: {
        textAlign: 'center',
        color: '#e4a617',
        fontSize: '1.8rem',
        margin: '4rem 1rem'
      }
    }
  }
}
