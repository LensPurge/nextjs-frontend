// we need to create a client in order to receive API data from gql;
import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';
import { setContext } from '@apollo/link-context';
import fetch from 'cross-fetch';

const APIURL = "https://api-mumbai.lens.dev"

const httpLink = createHttpLink({
	uri: APIURL, // replace with your API endpoint
	fetch,
});

const authLink = setContext(() => {
	const token = localStorage.getItem('accessToken');
	console.log("token: ", token);
	return {
		headers: {
		'x-access-token': token ? `Bearer ${token}` : '',
		}
}
});

// @note i guess we do not fetch the token here
export async function getClient() {

	// create the client using the URL;
   const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  return apolloClient;
}
