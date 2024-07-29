module.exports = {
  
  networks: {
    
     development: {
      host: "127.0.0.1",     // Localhost
      port: 7545,            // Standard Ethereum port
      network_id: "5777",       // Any network
     },
    
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0",      // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
};
