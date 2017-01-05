import React, { Component } from 'react'
import comet from 'images/comet.svg'

export default class CometsAnim extends Component {
  state = {
    loopTrigger: true
  }

  componentDidMount() {
    this.loopInterval = setInterval(() =>
      this.setState({ loopTrigger: !this.state.loopTrigger }),
      2000)
  }

  componentWillUnmount() {
    clearInterval(this.loopInterval)
  }

  render() {
    const { loopTrigger } = this.state
    const styles = this.getStyles(loopTrigger)

    return (
      <div style={ styles.root }>
        <img style={ styles.smallest } src={ comet } alt='' />
        <img style={ styles.small } src={ comet } alt='' />
        <img style={ styles.medium } src={ comet } alt='' />
        <img style={ styles.big } src={ comet } alt='' />
        <img style={ styles.bigger } src={ comet } alt='' />
      </div>
    )
  }

  getStyles(loopTrigger) {
    const transformComet = () => loopTrigger ?
      'translate3d(-2000px, 1000px, -500px)' :
      'translate3d(2000px, -1000px, 500px)'

    const transitionComet = speed => loopTrigger ?
      `all ${speed}s ease-in` : 'none'

    return {
      root: {
        position: 'absolute',
        top: 0,
        zIndex: 1,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
      },
      smallest: {
        position: 'absolute',
        top: '40vh',
        transform: transformComet(),
        transition: transitionComet(2.4),
        width: '20%'
      },
      small: {
        position: 'absolute',
        top: '15vh',
        transform: transformComet(),
        transition: transitionComet(2),
        width: '35%'
      },
      medium: {
        position: 'absolute',
        top: '5vh',
        transform: transformComet(),
        transition: transitionComet(1.3),
        width: '60%'
      },
      big: {
        position: 'absolute',
        top: '20vh',
        transform: transformComet(),
        transition: transitionComet(0.8),
        width: '100%'
      },
      bigger: {
        position: 'absolute',
        top: '-25vh',
        transform: transformComet(),
        transition: transitionComet(0.4),
        width: '200%'
      }
    }
  }
}
