import React, { Component } from 'react'

export default class SearchInput extends Component {
  props: {
    onChange: () => void
  }

  render() {
    return (
      <input
        onChange={ this.props.onChange }
        placeholder='Search...'
        style={ { padding: '2%', marginBottom: '1rem', width: '95%' } } />
    )
  }
}
