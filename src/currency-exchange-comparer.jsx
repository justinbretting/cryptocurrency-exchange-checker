
import React from 'react';
import Spinner from './spinner.jsx';
import ExchangeTicker from './exchange-ticker.jsx';
import { checkStatus, parseJSON } from './fetch-utils';

export default class CurrencyExchangeComparer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: false,
      data: undefined
    }
  }

  componentWillMount() {
    fetch(`/api/exchanges/${this.props.currency}`)
      .then(checkStatus)
      .then(parseJSON)
      .then(data => {
        this.setState({ loading: false, data });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error
        })
      })
  }

  render() {
    const { loading, error, data } = this.state;
    const exchanges = _.omit(data, 'lowest');

    return (
      <div className="currency-exchange-comparer">
        {loading && <Spinner />}
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
