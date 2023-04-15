import { ApolloClient, InMemoryCache, gql } from "@apollo/client/core";

const AIRSTACK_ENDPOINT = "https://api.airstack.xyz/gql";
const AIRSTACK_API_KEY = "120c285f6df44601b48fd17a673be1bc";

// Initializing Client 🚀
const client = new ApolloClient({
  uri: AIRSTACK_ENDPOINT,
  cache: new InMemoryCache(),
  headers: { Authorization: AIRSTACK_API_KEY },
});

export async function getAllTokens(walletAddress) {
  try {
    const tokenQuery = gql`
      query tokenQuery() {
        TokenBalances(
          input: {
            filter: { owner: { _eq: "0xB72a04B01BB80DfD6a42ea8E0907B892286113F2"  } }
            limit: 10
            blockchain: ethereum
          }
        ) {
          TokenBalance {
            amount
            chainId
            id
            lastUpdatedBlock
            lastUpdatedTimestamp
            owner {
              addresses
            }
            tokenAddress
            tokenId
            tokenType
            token {
              name
              symbol
            }
          }
        }
      }
    `;

    const response = await client.query({
      tokenQuery,
    });
    const finalData = response.data.TokenBalances;
    console.log(response.data);
    console.log(finalData);
  } catch (error) {
    console.log(error);
  }
}
