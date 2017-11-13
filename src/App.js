import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="App">
        {React.cloneElement(this.props.children, {
        })}
      </div>
    );
  }
}

export default App;
