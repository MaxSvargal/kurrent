import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Style } from 'radium'
import ReactQuill from 'react-quill'

import DropDownList from 'components/DropDownList'
import DragDrop from 'components/DragDrop'
import BackLink from 'components/BackLink'
import FilesList from 'components/FilesList'

@withRouter
export default class NewTopic extends Component {
  props: {
    router: {
      push: () => void
    },
    createTopic: () => void
  }

  state = {
    body: '',
    keywords: '',
    name: '',
    tags: [],
    files: [],
    showCatalogPopup: false
  }

  onSubmitHandle = event => {
    const { body, files, keywords, name, tags } = this.state
    const { createTopic, router } = this.props

    createTopic({ body, files, keywords, name, tags })
    router.push(`/await_topic/${name}`)
    event.preventDefault()
  }

  getKeywords = (name, tags) =>
    tags.length > 0 ? `${name} ${tags.join(', ')}` : name

  onNameInputChange = event =>
    this.setState({
      name: event.target.value,
      keywords: this.getKeywords(event.target.value, this.state.tags)
    })

  onDropFiles = files =>
    this.setState({ files: [ ...this.state.files, ...files ] })

  onAddTagClick = () =>
    this.setState({ showCatalogPopup: true })

  onKeywordsInputChange = event =>
    this.setState({ keywords: event.target.value })

  onChangeBody = body =>
    this.setState({ body })

  onSelectTag = (section, subsection) => {
    const toTag = tag => `#${tag.toLowerCase().replace(' ', '_')}`
    const tagsArr = [ ...this.state.tags, toTag(section), toTag(subsection) ]
    const tags = [ ...new Set(tagsArr) ]
    const keywords = this.getKeywords(this.state.name, tags)
    this.setState({ tags, keywords, showCatalogPopup: false })
  }

  render() {
    const { tags, files, keywords, showCatalogPopup } = this.state
    const styles = this.getStyles()

    return (
      <div style={ styles.root } >
        <BackLink />
        <form id='topicForm' >

          <div style={ styles.row } >
            <div style={ styles.flexRow } >
              { files.length > 0 &&
                <div style={ styles.filesList } >
                  <FilesList files={ files } />
                </div>
              }
              <div style={ styles.dropFilesBox } >
                <DragDrop onDrop={ this.onDropFiles } />
              </div>
            </div>
          </div>

          <div style={ styles.row } >
            <label htmlFor='name' style={ styles.label }>
              Short name
            </label>
            <input
              name='name'
              style={ styles.textInput }
              onChange={ this.onNameInputChange } />
          </div>

          <div style={ styles.row } >
            <label htmlFor='tags' style={ styles.label }>
              Tags for cataloging
            </label>
            <div style={ styles.flexRow } >
              <button
                type='button'
                style={ styles.addTagsBtn }
                onClick={ this.onAddTagClick } >
                +
              </button>
              <input
                name='tags'
                value={ tags.join(', ') }
                style={ styles.textInput } />
              <div style={ styles.dropDownBox(showCatalogPopup) } >
                <DropDownList onSelect={ this.onSelectTag } />
              </div>
            </div>
          </div>

          <div style={ styles.row } >
            <label htmlFor='keywords' style={ styles.label }>
              Keywords for search
            </label>
            <input
              name='keywords'
              value={ keywords }
              onChange={ this.onKeywordsInputChange }
              style={ styles.textInput } />
          </div>

          <div style={ styles.row } >
            <Style rules={ styles.quill } />
            <ReactQuill
              onChange={ this.onChangeBody }
              theme='snow' />
          </div>

          <div style={ styles.row } >
            <button
              type='submit'
              style={ styles.submitBtn }
              onClick={ this.onSubmitHandle }>
              Create
            </button>
          </div>
        </form>
      </div>
    )
  }

  getStyles() {
    return {
      root: {
        width: '92vw',
        margin: '4vw',
        fontFamily: 'PT Sans'
      },
      row: {
        margin: '2rem 0'
      },
      label: {
        display: 'block',
        fontSize: '.8rem',
        margin: '.25rem 0'
      },
      textInput: {
        padding: '.8rem',
        fontSize: '1rem',
        lineHeight: '1rem',
        width: '100%',
        boxSizing: 'border-box',
        border: '1px solid #b2b1b2',
        background: '#fff'
      },
      addTagsBtn: {
        background: '#a0be11',
        border: '1px solid #a0be11',
        color: '#fff',
        fontSize: '2rem',
        height: '3rem',
        lineHeight: '3rem',
        padding: 0,
        width: '3.25rem'
      },
      flexRow: {
        display: 'flex',
        flexFlow: 'row nowrap',
        overflow: 'hidden'
      },
      toggleSidebarLongBtn: {
        position: 'absolute',
        top: 0,
        left: 0,
        background: '#e9b442',
        width: '.45rem',
        height: '100vh',
        cursor: 'pointer',
        border: 0,
        padding: 0
      },
      filesList: {
        display: 'flex',
        flexFlow: 'column wrap',
        flexGrow: 1,
        justifyContent: 'center'
      },
      dropFilesBox: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'stretch'
      },
      dropDownBox: isShow => ({
        position: 'absolute',
        display: isShow ? 'block' : 'none',
        background: '#fff',
        border: '1px solid #ccc',
        width: '90vw',
        margin: '.5rem',
        zIndex: 999
      }),
      submitBtn: {
        background: '#e65d31',
        color: '#fff',
        fontSize: '1.8rem',
        padding: '.5rem 2rem',
        border: 0
      },
      quill: {
        '.ql-snow .ql-out-bottom': {
          visibility: 'visible'
        }
      }
    }
  }
}
