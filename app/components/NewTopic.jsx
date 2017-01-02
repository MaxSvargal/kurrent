import React, { Component } from 'react'
import { Style } from 'radium'
import ReactQuill from 'react-quill'

import DropDownList from 'components/DropDownList'
import DragDrop from 'components/DragDrop'
import BackLink from 'components/BackLink'

export default class NewTopic extends Component {

  state = {
    tags: [],
    files: [],
    dropDownBoxShow: false,
    showDragDrop: true,
    showSidebar: false,
    headerInputValue: ''
  }

  onSubmitHandle(event) {
    event.preventDefault()
  }

  handleEditorChange = value => {
    console.log('Content was updated:', value)
  }

  onHeaderInputChange = () =>
    this.setState({ titleInputValue: this.getTitleInputValue(this.state.tags) })
    // (this.titleInput.value = this.state.tags.length > 0 ?
    //   this.getTitleInputValue() : e.target.value)

  getTitleInputValue = tags =>
    tags.length > 0 ?
      `${this.headerInput.value} ${tags.join(', ')}` :
      this.headerInput.value

  onTitleInputChange = event =>
    this.setState({ titleInputValue: event.target.value })

  onAddTagClickHandle = () =>
    this.setState({ dropDownBoxShow: true })

  onSelectTagHandle = (section, subsection) => {
    const tag = `#${subsection.toLowerCase().replace(' ', '_')}`
    const sectionTag = `#${section.toLowerCase().replace(' ', '_')}`
    const tags = [ ...new Set([ ...this.state.tags, tag, sectionTag ]) ]
    const titleInputValue = this.getTitleInputValue(tags)
    this.setState({ tags, titleInputValue, dropDownBoxShow: false })
  }

  onDropFiles = files =>
    this.setState({ files, showDragDrop: false })

  render() {
    const { dropDownBoxShow, showDragDrop, tags, files } = this.state
    const styles = this.getStyles()

    return (
      <div style={ styles.root } >
        <BackLink />
        <form id='topicForm' >

          { showDragDrop &&
            <DragDrop onDrop={ this.onDropFiles } /> }

          { files.length > 0 &&
            <div style={ styles.sidebarList } >
              { files.map((file, index) => (
                <div key={ index } >
                  <span>{ file.name } { ' ' }</span>
                  <small>{ file.size } bytes</small>
                </div>
              )) }
            </div> }

          <div style={ styles.row } >
            <label htmlFor='header' style={ styles.label }>
              Header for list view
            </label>
            <input
              name='header'
              style={ styles.textInput }
              ref={ c => (this.headerInput = c) }
              onChange={ this.onHeaderInputChange } />
          </div>

          <div style={ styles.row } >
            <label htmlFor='tags' style={ styles.label }>
              Tags for search and cataloging
            </label>
            <div style={ styles.flexRow } >
              <button
                type='button'
                style={ styles.addTagsBtn }
                onClick={ this.onAddTagClickHandle } >
                +
              </button>
              <input
                name='tags'
                value={ tags.join(', ') }
                style={ styles.textInput } />
              <div style={ styles.dropDownBox(dropDownBoxShow) } >
                <DropDownList onSelect={ this.onSelectTagHandle } />
              </div>
            </div>
          </div>

          <div style={ styles.row } >
            <label htmlFor='title' style={ styles.label }>
              Description with tags for search
            </label>
            <input
              name='title'
              value={ this.state.titleInputValue }
              onChange={ this.onTitleInputChange }
              style={ styles.textInput } />
          </div>

          <div style={ styles.row } >
            <Style rules={ styles.quill } />
            <ReactQuill
              onChange={ this.handleEditorChange }
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
        width: '100vw',
        fontFamily: 'PT Sans'
      },
      row: {
        margin: '2rem'
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
        width: '3rem',
        height: '3rem',
        border: '1px solid #a0be11',
        color: '#fff',
        background: '#a0be11',
        fontSize: '1.5rem'
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
      sidebarList: {
        margin: '2rem'
      },
      dropDownBox: isShow => ({
        position: 'absolute',
        display: isShow ? 'block' : 'none',
        background: '#fff',
        border: '1px solid #ccc',
        width: '70vw',
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
