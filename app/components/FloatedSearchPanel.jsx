import React, { Component } from 'react'
import radium, { Style } from 'radium'
import colors from 'styles/colors'

import logo from 'images/logo.svg'

class FloatedSearchPanel extends Component {
  props: {
    anyFinded: bool,
    onChange: () => void
  }

  onChangeHandle = ({ target: { value } }) =>
    value.length > 0 && this.props.onChange(value)

  render() {
    const isResultsIsset = this.props.anyFinded && this.input.value.length > 0
    const styles = this.getStyles(isResultsIsset)

    return (
      <div style={ styles.root } >
        <Style rules={ styles.scoped } />
        <img
          src={ logo }
          style={ styles.logo }
          alt='' />
        <input
          ref={ c => (this.input = c) }
          onChange={ this.onChangeHandle }
          placeholder='SEARCH TORRENT'
          style={ styles.input }
          autoFocus />
      </div>
    )
  }

  getStyles(isResultsIsset) {
    return {
      root: {
        alignItems: 'center',
        display: 'flex',
        flexFlow: isResultsIsset ? 'row nowrap' : 'column wrap',
        height: isResultsIsset ? '6rem' : '95vh',
        justifyContent: 'center',
        margin: '2.3rem auto 0rem auto',
        position: 'relative',
        transition: 'height .2s ease-in',
        width: isResultsIsset ? '98vw' : '60vw',
        zIndex: 9
      },
      logo: {
        width: isResultsIsset ? '30vw' : '40vw'
      },
      input: {
        padding: '1rem',
        fontSize: '1.4rem',
        margin: '1rem',
        border: `2px solid ${colors.primary}`,
        outline: 'none',
        width: isResultsIsset ? '60vw' : '100%',
        boxSizing: 'border-box'
      },
      scoped: {
        '::-webkit-input-placeholder': {
          color: '#c0b6ad',
          textAlign: 'center'
        }
      }
    }
  }
}

export default radium(FloatedSearchPanel)
