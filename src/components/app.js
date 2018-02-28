import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
  {/*since Greeting is children of App, refer to routes.js*/}
      {this.props.children}
      </div> 
    );
  }
}
