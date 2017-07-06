import React from "react";

const Input = React.createClass({
  render() {
    return (
      <div className="small-12 columns">
        <label>
          {this.props.slug}
          <input
            defaultValue={this.props.value || ""}
            ref={e => this.input = e}
            type={this.props.type || "text"}
            placeholder={this.props.slug}
            maxLength={this.props.maxChar}
            {...this.props.inputProps}
          />
        </label>
      </div>
    );
  }
});

Input.propTypes = {
  slug: React.PropTypes.string,
  value: React.PropTypes.string,
  maxChar: React.PropTypes.number,
  type: React.PropTypes.string
};
export default Input;
