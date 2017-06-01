
import React from 'react';
import reducers from './redux/reducers';
import actions from './redux/actions';
import _ from 'lodash';

import CurrencyList from './currency-list.jsx';

export default class App extends React.Component{
  render() {
    return <div className="container">
      <CurrencyList currencies={['ltc_btc','eth_btc','dsh_btc']} />
    </div>
  }
}
