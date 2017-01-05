// @flow
import React, { Component } from 'react'
import { StyleRoot, Style } from 'radium'

import normalize from '../styles/normalize'
import { secondary, textMuted, backgroundMuted } from '../styles/colors'

export default class App extends Component {
  props: {
    children: HTMLElement
  }

  render() {
    return (
      <StyleRoot>
        <Style rules={ { ...normalize, ...this.styles } } />
        { this.props.children }
      </StyleRoot>
    )
  }

  styles = {
    body: {
      fontSize: '100%',
      minHeight: '88vh',
      margin: 0,
      WebkitTapHighlightColor: 'transparent'
    },
    '::-webkit-input-placeholder': {
      color: textMuted
    },
    '::-moz-placeholder': {
      color: textMuted
    },
    '::placeholder': {
      color: textMuted
    },
    input: {
      WebkitAppearance: 'none',
      appearance: 'none',
      background: backgroundMuted
    },
    'input:valid': {
      outline: 'none'
    },
    'input:invalid': {
      outline: 'none'
    },
    a: {
      color: secondary
    },
    'button, button:active, button:focus': {
      outline: 'none',
      border: 'none',
      background: 'none'
    },
    mediaQueries: {
      '(min-width: 380px)': {
        body: {
          fontSize: '110%'
        }
      },
      '(min-width: 600px)': {
        body: {
          fontSize: '120%'
        }
      }
    }
  }
}
