// @flow
import React, { Component } from 'react'
import { StyleRoot, Style } from 'radium'

import normalize from '../styles/normalize'
import { secondary, text, textMuted } from '../styles/colors'

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
    '.darkenPlaceholder::-webkit-input-placeholder': {
      color: text
    },
    '.darkenPlaceholder::-moz-placeholder': {
      color: text
    },
    '.darkenPlaceholder::placeholder': {
      color: text
    },
    input: {
      WebkitAppearance: 'none',
      appearance: 'none'
    },
    'input:valid': {
      outline: 'none',
      boxShadow: '0 0 1px rgb(130, 183, 33)'
    },
    'input:invalid': {
      outline: 'none',
      boxShadow: '0 0 1px rgb(253, 61, 58)',
      background: 'rgb(254, 238, 238)'
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
