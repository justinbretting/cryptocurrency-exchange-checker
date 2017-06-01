
import React from 'react';

export default class ExchangeTicker extends React.Component {
  render() {
    const { label, data, isLowest } = this.props;

    return (
      <div className={["exchange-ticker panel panel-default",isLowest ? "lowest" : ""].join(' ')}>
        <div className="panel-heading">{label}</div>
        <div className="panel-body">
          <div className="exchange-rate">{data.last}</div>
          {isLowest && <div>
            <i className="fa fa-check" />
          </div>}
        </div>
      </div>
    )
  }
}
