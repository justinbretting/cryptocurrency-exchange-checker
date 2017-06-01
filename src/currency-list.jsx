
import React from 'react';
import CurrencyExchangeComparer from './currency-exchange-comparer.jsx';
import { connect } from 'react-redux';

class CurrencyList extends React.Component {
  render() {
    return (
      <div className="currency-list">
        {_.map(this.props.currencies, currency => {
          return <CurrencyExchangeComparer
            currency={currency}
            key={currency}
            exchangePair={this.props.exchangePairs[currency]}
          />
        })}
      </div>
    )
  }
}

export default connect(state => state)(CurrencyList);
