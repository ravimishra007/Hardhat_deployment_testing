/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
const ALCHEMY_API_KEY = "6altB69BO1o7CSii4tiJC5FnHGZZF76E";
const SEPOLIA_PRIVATE_KEY =
  "90695bb55bc498fde3ca119f00ec2f13b14cc7ae8338721693f5c4f08327ee07";

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {  // Change this to sepolia
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${SEPOLIA_PRIVATE_KEY}`],
    },
  },
};
