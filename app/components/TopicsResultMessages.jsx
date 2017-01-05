import React, { Component } from 'react'

export default class TopicsResultMessages extends Component {
  props: {
    finded: number,
    isset: number
  }

  messages = [
    'Launch Status Check',
    'Payload Test Conductor',
    'Launch Processing System Test',
    'Booster Systems Checking',
    'Ready To Start',
    'Waiting For Peers',
    'Peers Receive Messages',
    'Workers Processing',
    'Prepare To Show'
  ]

  state = {
    messageIndex: 0
  }

  componentWillReceiveProps({ finded, isset }) {
    const getRandom = () => Math.floor(Math.random() * 3000) + 1000
    const timerHandle = () => {
      this.setState({ messageIndex: this.state.messageIndex + 1 })
      this.state.messageIndex < this.messages.length &&
        (this.timer = setTimeout(timerHandle, getRandom()))
    }

    finded > 0 && finded !== isset && timerHandle()
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }

  render() {
    const { finded, isset } = this.props
    const { messageIndex } = this.state
    const styles = this.getStyles()

    return (
      <div>
        { finded > 0 && finded === isset &&
          <div style={ styles.findedBar }>
            Found { finded } results
          </div>
        }
        { finded !== isset &&
          <div style={ styles.onProccessBox } >
            <div style={ styles.finded }>Found { finded } results</div>
            <div style={ styles.msg }>{ this.messages[messageIndex] }</div>
          </div>
        }
      </div>
    )
  }

  getStyles() {
    return {
      findedBar: {
        padding: '.5rem 8rem',
        fontSize: '.9rem',
        color: '#3a8c99',
        background: '#1b4660'
      },
      onProccessBox: {
        textAlign: 'center',
        color: '#fff',
        fontSize: '2rem',
        margin: '6rem 1rem'
      },
      finded: {
        color: '#99ffee',
        fontSize: '.7em'
      },
      msg: {
      }
    }
  }
}
