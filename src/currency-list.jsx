
import React from 'react';
import CurrencyExchangeComparer from './currency-exchange-comparer.jsx';

class CurrencyList extends React.Component {

  render() {
    return (
      <div className="currency-list">
        {_.map(this.props.currencies, currency => <CurrencyExchangeComparer currency={currency} key={currency} />)}
      </div>
    )
  }
}

export default CurrencyList;
