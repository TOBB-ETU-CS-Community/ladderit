const fs = require("fs");
require("@chainlink/env-enc").config();

const Location = {
  Inline: 0,
  Remote: 1,
};

const CodeLanguage = {
  JavaScript: 0,
};

const ReturnType = {
  uint: "uint256",
  uint256: "uint256",
  int: "int256",
  int256: "int256",
  string: "string",
  bytes: "Buffer",
  Buffer: "Buffer",
};

// Configure the request by setting the fields below
const requestConfig = {
  // Location of source code (only Inline is currently supported)
  codeLocation: Location.Inline,
  // Code language (only JavaScript is currently supported)
  codeLanguage: CodeLanguage.JavaScript,
  // String containing the source code to be executed
  source: fs.readFileSync("./Functions-request.source.js").toString(),
  // Per-node secrets objects assigned to each DON member. When using per-node secrets, nodes can only use secrets which they have been assigned.
  perNodeSecrets: [],
  // ETH wallet key used to sign secrets so they cannot be accessed by a 3rd party
  walletPrivateKey: process.env["PRIVATE_KEY"],
  // Args (string only array) can be accessed within the source code with `args[index]` (ie: args[0]).
  // args: ["1", "bitcoin", "btc-bitcoin", "btc", "1000000", "450"],
  // Expected type of the returned value
  expectedReturnType: ReturnType.string,
  // Redundant URLs which point to encrypted off-chain secrets
  secretsURLs: [],
};

module.exports = requestConfig;
