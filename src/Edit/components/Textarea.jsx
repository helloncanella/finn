import React, { PropTypes, Component } from "react"
import Draft from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import { stateToHTML } from "draft-js-export-html"
import { forceHTTPS } from "./helpers"
import Input from "./Input.jsx"

class Textarea extends Input {
  constructor(props) {
    super()
    this.state = {
      chars: props.value ? props.value.length : 0,
      value: "",
      error: ""
    }
    this.count = this.count.bind(this)
  }

  isCloseTo() {
    if (this.state.chars * 1.2 > this.props.maxChar) return true
    else return false
  }
  count(e) {
    this.setState({ chars: e.target.value.length })
  }

  render() {
    let charCountClasses = ["float-right char-count"]
    if (this.isCloseTo()) charCountClasses.push("red")

    const textarea = (
      <div className="textarea">
        <textarea
          ref={e => (this.input = e)}
          // className={this.props.maxWords > 150 ? "" : "small"}
          type={this.props.type || "text"}
          defaultValue={this.props.value}
          placeholder={this.props.slug}
          onChange={this.count}
          maxLength={this.props.maxChar}
        />
        <div className={charCountClasses.join(" ")}>
          {this.state.chars}/{this.props.maxChar}
        </div>
        <div
          className="error"
          style={{ float: 'left', visibility: this.state.error ? "visible" : "hidden" }}
        >
          {this.state.error || "error"}
        </div>
      </div>
    )

    const label = (
      <label>
        {this.props.slug}
        {!this.props.horizontalLayout && textarea}
      </label>
    )

    if (this.props.horizontalLayout) {
      return (
        <div className="small-12 textarea column">
          <div className="row">
            <div className="small-3 large-2 column">
              {label}
            </div>
            <div className="small-9 large-10 column">
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
}

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

  value() {
    return this.state.value
  },

  validate() {
    this.props.validator && this.props.validator()
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

    const editor = (
      <div className="editorContainer">
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
        {this.props.maxWords &&
          <div className={charCountClasses}>
            {this.state.words}/{this.props.maxWords}
          </div>}
      </div>
    )

    const label = (
      <label>
        {this.props.slug}
        {/*{this.props.maxWords &&
            <div className={charCountClasses}>
              Wörter - {this.state.words}/{this.props.maxWords}
            </div>}*/}
        {!this.props.horizontalLayout && editor}
      </label>
    )

    if (this.props.horizontalLayout) {
      return (
        <div className="small-12 textarea column">
          <div className="row">
            <div className="small-3 large-2 column">
              {label}
            </div>
            <div className="small-9 large-10 column">
              {editor}
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
