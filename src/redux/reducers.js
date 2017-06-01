import rxupdate from 'immutability-helper';
import { combineReducers } from 'redux';

module.exports = function(state, action) {
  if ( typeof state === 'undefined' ) {
    return {
      exchangePairs: {
        /*
          btc_dsh: {
            poloniex: { ... },
            btce: { ... },
            lowest: 'exchange_key'
          },
          etc
        */
      }
    }
  }

  switch (action.type) {
    case 'BEGIN_FETCH_CURRENCY_PAIR':
      return rxupdate(state, { exchangePairs: {
        [action.pair]: {
          $set: {
            loading: true,
            error: false,
            data: undefined
          }
        }
      }});
    case 'SET_CURRENCY_PAIR_DATA':
      return rxupdate(state, { exchangePairs: {
        [action.pair]: {
          $set: {
            loading: false,
            error: false,
            data: action.data
          }
        }
      }});
    case 'SET_CURRENCY_PAIR_ERROR':
      return rxupdate(state, { exchangePairs: {
        [action.pair]: {
          $set: {
            loading: false,
            error: action.error
          }
        }
      }});
    default: return state;
  }
}
