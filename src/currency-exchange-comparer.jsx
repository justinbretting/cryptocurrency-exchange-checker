
import React from 'react';
import Spinner from './spinner.jsx';
import ExchangeTicker from './exchange-ticker.jsx';
import actions from './redux/actions';
import { connect } from 'react-redux';

class CurrencyExchangeComparer extends React.Component {
  componentWillMount() {
    this.props.dispatch(actions.fetchCurrencyPair(this.props.currency));
  }

  render() {
    const { exchangePair, currency } = this.props;

    if (!exchangePair || exchangePair.loading) {
      return <Spinner />
    }

    const { error, data } = exchangePair;
    const exchanges = _.omit(data, 'lowest');

    return (
      <div className="currency-exchange-comparer">
        {error && <div className="error">Error loading exchange data</div>}
        {data && <div className="exchange-data">
          <h4>{this.props.currency}</h4>
          <div className="exchanges">
            {_.map(exchanges, (tickerData, label) => {
              return <ExchangeTicker
                data={tickerData}
                label={label}
                isLowest={data.lowest === label}
                key={label} />
            })}
          </div>
        </div>}
      </div>
    )
  }
}

export default connect(state => state)(CurrencyExchangeComparer);
