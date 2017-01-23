import { Component } from 'react'
import { h, div, form, label, input, button } from 'react-hyperscript-helpers'
import { withRouter } from 'react-router'
import { Style } from 'radium'
import ReactQuill from 'react-quill'

import DropDownList from 'components/DropDownList'
import DragDrop from 'components/DragDrop'
import TopBar from 'components/TopBar'
import TopBarBackLink from 'components/TopBarBackLink'
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

    return div({ style: styles.root }, [
      h(TopBar, [
        h(TopBarBackLink)
      ]),
      form([
        div({ style: styles.row }, [
          div({ style: styles.flexRow }, [
            files.length > 0 && div({ style: styles.filesList }, [
              h(FilesList, { files })
            ]),
            div({ style: styles.dropFilesBox }, [
              h(DragDrop, { onDrop: this.onDropFiles })
            ])
          ])
        ]),
        div({ style: styles.row }, [
          label({ htmlFor: 'name', style: styles.label }, 'Short name. This field will be change infoHash.'),
          input({ name: 'name', style: styles.textInput, onChange: this.onNameInputChange })
        ]),
        div({ style: styles.row }, [
          label({ htmlFor: 'tags', style: styles.label }, 'Tags for cataloging.'),
          div({ style: styles.flexRow }, [
            button({ type: 'button', style: styles.addTagsBtn, onClick: this.onAddTagClick }, '+'),
            input({ name: 'tags', style: styles.textInput, value: tags.join(', ') }),
            div({ style: styles.dropDownBox(showCatalogPopup) }, [
              h(DropDownList, { onSelect: this.onSelectTag })
            ])
          ])
        ]),
        div({ style: styles.row }, [
          label({ style: styles.label, htmlFor: 'keywords' }, 'Keywords for search'),
          input({ style: styles.textInput, name: 'keywords', value: keywords, onChange: this.onKeywordsInputChange })
        ]),
        div({ style: styles.row }, [
          h(Style, { rules: styles.quill }),
          h(ReactQuill, { theme: 'snow', onChange: this.onChangeBody })
        ]),
        div({ style: styles.row }, [
          button({ type: 'submit', style: styles.submitBtn, onClick: this.onSubmitHandle }, 'Create')
        ])
      ])
    ])
  }

  getStyles() {
    return {
      root: {
        width: '92vw',
        margin: '6vw 4vw 2vw 4vw',
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
