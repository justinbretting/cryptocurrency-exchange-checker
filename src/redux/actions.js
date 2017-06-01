import _ from 'lodash';
import { checkStatus, parseJSON } from '../fetch-utils';

export default {
  fetchCurrencyPair(pair) {
    return (dispatch, getState) => {
      dispatch(this.beginFetchCurrencyPair(pair));
      fetch(`/api/exchanges/${pair}`)
        .then(checkStatus)
        .then(parseJSON)
        .then(data => {
          dispatch(this.setCurrencyPairData(pair, data));
        })
        .catch(error => {
          dispatch(this.setCurrencyPairError(pair, error))
        })
    }
  },
  beginFetchCurrencyPair(pair) {
    return { type: 'BEGIN_FETCH_CURRENCY_PAIR', pair }
  },
  setCurrencyPairData(pair, data) {
    return { type: 'SET_CURRENCY_PAIR_DATA', pair, data }
  },
  setCurrencyPairError(pair, error) {
    return { type: 'SET_CURRENCY_PAIR_ERROR', pair, error }
  }
}
