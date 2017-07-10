import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.css';
import Info from './info';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.onFetchInfo = this.onFetchInfo.bind(this);
    this.state = { info: { __html: '' } };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.info && this.state.info !== prevState.info) {
      render(<Info {...this.state.info.state} />, this.infoElem);
    }
  }

  onFetchInfo() {
    window
      .fetch('/info')
      .then(response => response.json())
      .then(({ string, state }) =>
        this.setState({ info: { __html: string, state } })
      );
  }

  render() {
    return (
      <div>
        <h1>
          {this.props.message}
        </h1>
        <div>
          <button onClick={this.onFetchInfo}>Fetch info</button>
          <div
            ref={elem => (this.infoElem = elem)}
            dangerouslySetInnerHTML={this.state.info.string}
          />
        </div>
      </div>
    );
  }
}
