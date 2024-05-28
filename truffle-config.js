module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost
      port: 7545,            // Standard Ethereum port for Ganache
      network_id: "5777",       // Match any network id
    },
  },

  compilers: {
    solc: {
      version: "0.8.13",      // Fetch exact version from solc-bin
    },
  },
};
