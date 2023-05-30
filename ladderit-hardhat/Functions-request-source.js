// const fromSymbol = args[0];
// const toSymbol = args[1];

// make HTTP request
const url = `https://timeapi.io/api/Time/current/coordinate?latitude=38.9&longitude=-77.03`;
console.log(`HTTP GET Request to ${url}?fsyms=${fromSymbol}&tsyms=${toSymbol}`);

const timeRequest = Functions.makeHttpRequest({
  url: url,
  // params: {
  //   fsyms: fromSymbol,
  //   tsyms: toSymbol,
  // },
});

// Execute the API request (Promise)
const timeResponse = await timeRequest;
if (timeResponse.error) {
  console.error(timeResponse.error);
  throw Error("Request failed");
}

const data = timeResponse["data"];
if (data.Response === "Error") {
  console.error(data.Message);
  throw Error(`Functional error. Read message: ${data.Message}`);
}

// extract the price
// const price = data["RAW"][fromSymbol][toSymbol]["PRICE"];
// console.log(`${fromSymbol} price is: ${price.toFixed(2)} ${toSymbol}`);

// Solidity doesn't support decimals so multiply by 100 and round to the nearest integer
// Use Functions.encodeUint256 to encode an unsigned integer to a Buffer
// return Functions.encodeUint256(Math.round(price * 100));
