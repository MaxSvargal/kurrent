import React, { Component } from 'react'

const catalog = {
  Audio: [ 'Music', 'Audio books', 'Sound clips', 'FLAC' ],
  Video: [ 'Movies', 'Movies DVDR', 'Music', 'Movie clips', 'TV shows', 'Handheld', 'HD Movies', 'HD TV shows', '3D' ],
  Applications: [ 'Windows', 'Mac', 'UNIX', 'Handheld', 'iOS', 'Android', 'Windows Phone' ],
  Games: [ 'PC', 'Mac', 'XBOX360', 'XBOXONE', 'Wii', 'Handheld', 'iOS', 'Android' ],
  Porn: [ 'Movies', 'Movies DVDR', 'Pictures', 'Games', 'HD Movies', 'Movie clips' ],
  Other: [ 'Books', 'Comics', 'Pictures', 'Covers' ]
}

export default class DropDownList extends Component {
  props: {
    onSelect: () => void
  }

  render() {
    const { onSelect } = this.props
    const styles = this.getStyles()

    return (
      <div>
        { Object.keys(catalog).map((key, i) => (
          <div key={ i }>
            <h3 style={ styles.header } >{ key }</h3>
            <nav style={ styles.list } >
              { catalog[key].map((item, j) => (
                <button
                  type='button'
                  key={ j }
                  style={ styles.btn }
                  onClick={ () => onSelect(key, item) } >
                  { item }
                </button>
              )) }
            </nav>
          </div>
        ))}
      </div>
    )
  }

  getStyles() {
    return {
      header: {
        margin: '.5rem 1rem',
        fontSize: '1rem'
      },
      list: {
        margin: '0 1rem 2rem 1rem'
      },
      btn: {
        marginRight: '.25rem'
      }
    }
  }
}
