import https from 'https';
import request from 'request';
import SYMBOLS from '../symbols.js';

// initialize the agent initially so that it's not created for every request
let agent = new https.Agent({
  host: "btc-e.com",
  port: '443'
})

export default {
  async getExchangeRate(pair) {
    return new Promise((resolve, reject) => {
      const symbol = SYMBOLS[pair].btce;

      let args = {
        uri: `https://btc-e.com/api/3/ticker/${pair}`,
        agent
      }

      request(args, (error, response, body) => {
        if (error) {
          console.error(`Error fetching data from btc-e.com for pair ${pair}:`, error);
          reject(error);
        }

        resolve(JSON.parse(body));
      })
    })
  }
}
