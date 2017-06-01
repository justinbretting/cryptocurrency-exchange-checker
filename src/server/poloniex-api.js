import https from 'https';
import request from 'request';
import SYMBOLS from '../symbols.js';

const agent = new https.Agent({
  host: "poloniex.com",
  port: '443'
})

function normalizeResponse(ticker) {
  return {
    high: parseFloat(ticker.high24hr),
    low: parseFloat(ticker.low24hr),
    last: parseFloat(ticker.last)
  }
}

export default {
  async getExchangeRate(pair) {
    return new Promise((resolve, reject) => {
      const symbol = SYMBOLS[pair].poloniex;

      const args = {
        uri: `https://poloniex.com/public?command=returnTicker`,
        agent
      }

      request(args, (error, response, body) => {
        if (error) {
          console.error(`Error fetching data from poloniex.com for pair ${pair}:`, error);
          reject(error);
        }

        const ticker = JSON.parse(body)[symbol];

        resolve(normalizeResponse(ticker));
      })
    })
  }
}
