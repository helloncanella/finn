import React from "react"
import InputMask from "react-input-mask"

class Input extends React.Component {
  constructor() {
    super()
    this.state = {
      error: ""
    }
    this.isEmpty = this.isEmpty.bind(this)
  }

  value() {
    return this.input.value
  }

  setError(error) {
    this.setState({ error })
    this.markBorder()
  }

  markBorder() {
    this.input && (this.input.style.border = "1px solid #ea5153")
  }

  cleanError() {
    this.setState({ error: "" })
    this.input && (this.input.style = null)
  }

  isEmpty() {
    if (this.props.required && !this.value()) {
      throw new Error("required")
    }
  }

  validate() {
    this.cleanError()

    let { validator: validators = [] } = this.props

    !Array.isArray(validators) && (validators = [validators])

    validators = [].concat(this.isEmpty, ...validators)

    try {
      validators.length &&
        validators.forEach(validator => validator(this.value()))
    } catch (e) {
      const error = e.message || e.reason
      this.setError(error)
      throw new Error(error)
    }
  }

  error() {
    const style = { visibility: this.state.error ? "visible" : "hidden" }
    const props = { className: "error", style }

    return (
      <div {...props}>
        {" "}{this.state.error || "error"}
      </div>
    )
  }

  render() {
    const { error } = this.state

    const maskProps = _.pick(this.props, [
      "mask",
      "alwaysShowMask",
      "maskChar",
      "formatChars"
    ])

    const ref = e => {
      /**
       * @hellon
       * 
       * NOTE: for some reason I don't know, the value of "e" comes null in a 
       * second rendering.
       * 
       * That is the reason why I'm conditionally assigning the value of this.input.
       * **/

      e && (this.input = e.input)
    }

    return (
      <div className="small-12 columns">
        <label>
          {this.props.slug}
          <InputMask
            {...maskProps}
            defaultValue={this.props.value || ""}
            ref={ref}
            type={this.props.type || "text"}
            placeholder={this.props.slug}
            maxLength={this.props.maxChar}
            {...this.props.inputProps}
          />
          {this.error()}
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
