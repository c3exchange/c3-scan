const configs = {
  mainnet: {
    c3ApiUrl: 'https://api.c3.io/v1',
    indexer: 'https://mainnet-idx.algonode.cloud',
    algoNode: 'https://mainnet-api.algonode.cloud',
    isMainnet: true,
  },
  testnet: {
    c3ApiUrl: 'https://api.test.c3.io/v1',
    indexer: 'https://testnet-idx.algonode.cloud',
    algoNode: 'https://testnet-api.algonode.cloud',
    isMainnet: false,
  },
};

export default configs;
