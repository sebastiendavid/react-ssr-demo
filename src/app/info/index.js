import React, { Component } from 'react';

export default class Info extends Component {
  constructor(props) {
    super(props);
    this.onClear = this.onClear.bind(this);
    this.state = { clear: false };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.info !== this.props.info) {
      this.setState({ clear: false });
    }
  }

  onClear() {
    this.setState({ clear: true });
  }

  render() {
    if (this.state.clear) return null;
    return (
      <div>
        <pre>
          {JSON.stringify(this.props.info, null, 2)}
        </pre>
        <button onClick={this.onClear}>Clear info</button>
      </div>
    );
  }
}
