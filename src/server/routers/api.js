
import express from 'express';
import btceApi from '../btc-e-api.js';
import poloniexApi from '../poloniex-api.js';
import SYMBOLS from '../../symbols.js';

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

  let poloniex = await poloniexApi.getExchangeRate(pair);
  let btce = await btceApi.getExchangeRate(pair);

  res.json({ poloniex, btce });
})

export default apiRouter;
