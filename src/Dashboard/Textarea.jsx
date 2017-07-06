import React, { PropTypes } from "react"
import Draft from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import { stateToHTML } from "draft-js-export-html"
import { forceHTTPS } from "./helpers"

const Textarea = React.createClass({
  getInitialState() {
    return { chars: this.props.value ? this.props.value.length : 0 }
  },
  isCloseTo() {
    if (this.state.chars * 1.2 > this.props.maxChar) return true
    else return false
  },
  count(e) {
    this.setState({ chars: e.target.value.length })
  },
  render() {
    let floatClass = !this.props.horizontalLayout ? 'float-right' : ''
    let charCountClasses = [`${floatClass} char-count`]
    if (this.isCloseTo()) charCountClasses.push("red")

    const textarea = (
      <textarea
        ref={e => (this.input = e)}
        // className={this.props.maxWords > 150 ? "" : "small"}
        type={this.props.type || "text"}
        defaultValue={this.props.value}
        placeholder={this.props.slug}
        onChange={this.count}
        maxLength={this.props.maxChar}
      />
    )

    const label = (
      <label>
        {this.props.slug}
        <div className={charCountClasses.join(" ")}>
          Zeichen - {this.state.chars}/{this.props.maxChar}
        </div>
        {!this.props.horizontalLayout && textarea}
      </label>
    )

    if (this.props.horizontalLayout) {
      return (
        <div className="small-12 textarea column">
          <div className="row">
            <div className="small-2 column">
              {label}
            </div>
            <div className="small-10 column">
              {textarea}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="small-12 columns textarea">
        {label}
      </div>
    )
  }
})

const DraftTextarea = React.createClass({
  getInitialState() {
    let { value } = this.props
    return {
      words: value ? this.countWordsFromHtml(value) : 0,
      editorState: this.fillEditor(),
      value: value
    }
  },
  fillEditor() {
    let { value } = this.props
    if (!value) {
      return Draft.EditorState.createEmpty()
    }

    let blocksFromHTML = Draft.convertFromHTML(value)
    let contentState = Draft.ContentState.createFromBlockArray(blocksFromHTML)
    let editorState = Draft.EditorState.createWithContent(contentState)

    return editorState
  },
  countWordsFromHtml(value) {
    var regex = /\s+/gi
    var wordCount = value.trim().replace(regex, " ").split(" ").length
    return wordCount
  },
  isCloseTo() {
    if (this.state.words * 1.2 > this.props.maxWords) return true
    else return false
  },
  onEditorStateChange(editorState) {
    let value = stateToHTML(editorState.getCurrentContent()),
      words = this.countWordsFromHtml(value)
    value = forceHTTPS(value)

    this.setState({ editorState, value, words })
  },
  render() {
    let charCountClasses = "float-right char-count "
    charCountClasses += this.isCloseTo() ? "red" : ""
    const { editorState } = this.state
    var toolbar = {
      options: ["blockType", "inline", "list", "link"],
      inline: {
        inDropdown: false,
        options: ["bold", "italic", "underline"]
      },
      list: {
        inDropdown: false,
        options: ["unordered", "ordered", "indent", "outdent"]
      },
      blockType: {
        inDropdown: false,
        options: ["Normal", "H2", "H3"]
      },
      link: {
        inDropdown: true,
        showOpenOptionOnHover: true,
        defaultTargetOption: "_blanc",
        options: ["link", "unlink"]
      }
    }

    return (
      <div className="small-12 columns textarea">
        <label>
          {this.props.slug}
          {this.props.maxWords &&
            <div className={charCountClasses}>
              Wörter - {this.state.words}/{this.props.maxWords}
            </div>}
          <div className="editorWrapper">
            <Editor
              toolbar={toolbar}
              editorState={editorState}
              ref={e => (this.input = e)}
              onEditorStateChange={this.onEditorStateChange}
              toolbarClassName="home-toolbar"
              wrapperClassName="home-wrapper"
              editorClassName="home-editor"
            />
          </div>
        </label>
      </div>
    )
  }
})

///* <DraftEditor text={this.props.changeHandler} textFromDB={this.fillEditor(this.props.value)} /> */

{
  // <textarea
  //   type={this.props.type || "text"}
  //   value={this.props.value}
  //   placeholder={this.props.slug}
  //   onChange={e => {
  //     this.props.changeHandler({
  //       value: e.target.value,
  //       target: this.props.target
  //     })
  //     this.setState({ chars: e.target.value.length })
  //   }}
  //   maxLength={this.props.maxChar}
  // />
}

Textarea.propTypes = {
  slug: React.PropTypes.string,
  value: React.PropTypes.string,
  target: React.PropTypes.string,
  changeHandler: React.PropTypes.func,
  maxChar: React.PropTypes.number
}

export { Textarea, DraftTextarea }
