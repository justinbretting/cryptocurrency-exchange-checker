
// normalization for pairs across exchanges
// this would ideally be kept out of source control and maintained in a data store somewhere

export default {
  dsh_btc: {
    poloniex: 'BTC_DASH',
    btce: 'dash_btc'
  },
  eth_btc: {
    poloniex: 'BTC_ETH',
    btce: 'eth_btc'
  },
  ltc_btc: {
    poloniex: 'BTC_LTC',
    btce: 'ltc_btc'
  }
}
