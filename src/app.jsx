
import React from 'react';
import { connect } from 'react-redux';
import reducers from './redux/reducers';
import actions from './redux/actions';
import _ from 'lodash';

class App extends React.Component{
  render() {
    return <div className="container">
      Main Page
    </div>
  }
}

export default connect(state => state)(App);  
