
import express from 'express';
import btceApi from '../btc-e-api.js';
import poloniexApi from '../poloniex-api.js';
import SYMBOLS from '../../symbols.js';
import _ from 'lodash';

let apiRouter = express.Router();

apiRouter.get('/exchanges/:pair', async (req, res) => {
  const pair = req.params.pair;

  if ( !SYMBOLS[pair] ) {
    // slightly risky assumption that we have all pairs defined for all exchanges
    res.status(400).json({
      message: `Unsupported pair '${pair}'`
    });

    return;
  }

  try {
    let poloniex = await poloniexApi.getExchangeRate(pair);
    let btce = await btceApi.getExchangeRate(pair);

    let response = { poloniex, btce }
    let lowest = _.minBy(['poloniex','btce'], exchange => {
      return response[exchange].last;
    })

    res.json(_.assign(response, { lowest }));
  } catch (ex) {
    let msg = "Error fetching exchange rates from data sources";
    console.error(msg, ex)
    res.status(500).json({ message: msg })
  }
})

export default apiRouter;
