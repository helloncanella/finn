import React, { Component } from "react"

class Stepper extends Component {
  constructor() {
    super()
    this.state = {
      stepIndex: 0,
      error: null
    }

    this.next = this.next.bind(this)
    this.back = this.back.bind(this)

    this.onAdvance = this.onAdvance.bind(this)

    this.steps = []

    this.stepsWithError = []
  }

  next() {
    this.setState({ stepIndex: ++this.state.stepIndex })
  }

  back() {
    this.state.stepIndex > 0 &&
      this.setState({ stepIndex: --this.state.stepIndex })
  }

  setError(message) {
    this.props.onError && this.props.onError(message)
    this.setState({ error: message })

  }

  cleanError() {
    //turning the bullet color green again.
    this.stepsWithError[this.state.stepIndex] = false
    this.setState({ error: null })
  }

  validateStep(stepIndex) {
    const step = _.get(this.steps, stepIndex)

    try {
      step.validate && step.validate()
    } catch (e) {
      const error = e.message || e.reason
      this.setError(error)
      console.error(error)
      
      //it is used to decide if the bullet color is red.
      this.stepsWithError[stepIndex] = true
      
      return false
    }

    return true
  }

  onAdvance() {
    this.cleanError()

    const step = this.steps && this.steps[this.state.stepIndex]

    if (step) {
      const stepIsValidated = this.validateStep(this.state.stepIndex)

      if (stepIsValidated) {
        if (step.getValues && this.props.save) {
          this.props.save(step.getValues(), err => {
            if (err) this.setError(err.reason)
          })
        }

        if (!this.isLastStep()) {
          this.next()
        }
      }
    }
  }

  isLastStep = () => {
    return this.state.stepIndex === this.steps.length - 1
  }

  getChildren() {
    return React.Children.map(this.props.children, (child, index) => {
      if (!child) return null

      const isNotCurrentStep = index !== this.state.stepIndex

      const style = { display: isNotCurrentStep ? "none" : "block" }

      const props = {
        ...child.props,
        style,
        ref: e => !this.steps[index] && this.steps.push(e)
      }

      return React.cloneElement(child, props)
    })
  }

  controls() {
    const back =
      this.state.stepIndex > 0 &&
      <div className="back button" onClick={this.back}>
        Zurück
      </div>

    const next = (
      <div className="next button" onClick={this.onAdvance}>
        {" "}Speichern
      </div>
    )

    return (
      <div className="controls row">
        <div className="content">
          <h6 className="error">
            {this.state.error}
          </h6>
          {back}
          {next}
        </div>
      </div>
    )
  }

  stepsComponents() {
    const children = this.getChildren()
    return (
      <div className="children row">
        {children}
      </div>
    )
  }

  validateLowerSteps(clickedStepIndex) {
    for (let stepIndex = clickedStepIndex - 1; stepIndex >= 0; --stepIndex) {
      this.validateStep(stepIndex)
    }
  }

  changeStep(stepIndex) {
    this.validateLowerSteps(stepIndex)
    this.setState({ stepIndex })
  }

  stepsDescription() {
    const { children } = this.props

    const steps = React.Children.map(children, (child, index) => {
      if (!child) return null
      const name = child.props.name
      const destakClass = index === this.state.stepIndex ? "current" : ""
      const pastClass = index < this.state.stepIndex ? "past" : ""
      const changeStep = () => this.changeStep(index)

      const errorClass = this.stepsWithError[index] ? "with-error" : ""

      return (
        <div
          className={`step ${pastClass} ${destakClass}`}
          key={`step-${index}`}
          onClick={changeStep}
        >
          <div className={`bullet ${errorClass}`} />
          <h6 className="description">
            {name}
          </h6>
        </div>
      )
    })

    return (
      <div className="steps">
        {steps}
      </div>
    )
  }

  top() {
    return (
      <div className="top row">
        <div className="profile-info small-3 column">
          <h2 className="title">Profil Ansehen</h2>
          <h3 className="description">überblick über eigene Daten</h3>
          <img
            src="https://www.w3schools.com/w3css/img_avatar3.png"
            alt="avatar"
            className="avatar"
          />
        </div>
        <div className="all-steps small-9 column">
          <h2 className="title">Editieren</h2>
          <div className="sequences">
            <div className="line" />
            {this.stepsDescription()}
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="stepper">
        {this.top()}
        {this.stepsComponents()}
        {this.controls()}
      </div>
    )
  }
}

export default Stepper
