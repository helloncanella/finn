import React from "react"

class Input extends React.Component {
  constructor() {
    super()
    this.state = {
      error: ""
    }
  }

  value() {
    return this.input.value
  }

  setError(error) {
    this.setState({ error })
    this.markBorder()
  }

  markBorder() {
    this.input.style.border = "1px solid red"
  }

  cleanError() {
    this.setState({error: ''})
    this.input.style = null
  }

  validate() {
    this.cleanError()

    let { validator: validators = [] } = this.props

    !Array.isArray(validators) && (validators = [validators])

    try {
      validators.length && validators.forEach(validator => validator())
    } catch (e) {
      const error = e.message || e.reason
      this.setError(error)
      throw new Error(error)
    }

  }

  render() {
    const { error } = this.state

    return (
      <div className="small-12 columns">
        <label>
          {this.props.slug}
          <input
            defaultValue={this.props.value || ""}
            ref={e => (this.input = e)}
            type={this.props.type || "text"}
            placeholder={this.props.slug}
            maxLength={this.props.maxChar}
            {...this.props.inputProps}
          />
          <div
            className="error"
            style={{ visibility: error ? "visible" : "hidden" }}
          >
            {error || "error"}
          </div>
        </label>
      </div>
    )
  }
}

Input.propTypes = {
  slug: React.PropTypes.string,
  value: React.PropTypes.string,
  maxChar: React.PropTypes.number,
  type: React.PropTypes.string
}
export default Input
