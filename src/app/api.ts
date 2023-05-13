// we need to create a client in order to receive API data from gql;
import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';
import fetch from 'cross-fetch';

const APIURL = "https://api-mumbai.lens.dev"

// create the client using the URL;
export const apolloClient = new ApolloClient({
    link: new HttpLink({ uri: APIURL, fetch }),
    cache: new InMemoryCache(),
  });

export const getProfileByHandle = gql`
query Profile (
	$handle: Handle!
){
	profile(request: { handle: $handle }) {
	  id
	  name
	  bio
	  attributes {
		displayType
		traitType
		key
		value
	  }
	  followNftAddress
	  metadata
	  isDefault
	  picture {
		... on NftImage {
		  contractAddress
		  tokenId
		  uri
		  verified
		}
		... on MediaSet {
		  original {
			url
			mimeType
		  }
		}
		__typename
	  }
	  handle
	  coverPicture {
		... on NftImage {
		  contractAddress
		  tokenId
		  uri
		  verified
		}
		... on MediaSet {
		  original {
			url
			mimeType
		  }
		}
		__typename
	  }
	  ownedBy
	  dispatcher {
		address
		canUseRelay
	  }
	  stats {
		totalFollowers
		totalFollowing
		totalPosts
		totalComments
		totalMirrors
		totalPublications
		totalCollects
	  }
	  followModule {
		... on FeeFollowModuleSettings {
		  type
		  amount {
			asset {
			  symbol
			  name
			  decimals
			  address
			}
			value
		  }
		  recipient
		}
		... on ProfileFollowModuleSettings {
		  type
		}
		... on RevertFollowModuleSettings {
		  type
		}
	  }
	}
  }
`

export const getReaction = gql`
query Publications {
    publications(request: {
      profileId: "0x09",
      publicationTypes: [POST, COMMENT, MIRROR],
      limit: 10,
    }) {
      items {
        __typename
        ... on Post {
          reaction(request: { profileId: "0x01" })
        }
        ... on Comment {
          reaction(request: { profileId: "0x01" })
        }
        ... on Mirror {
          reaction(request: { profileId: "0x01" })
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }`

  export const getChallenge = gql`
  query Challenge(
    $address: EthereumAddress!
  ) {
    challenge(request: { address: $address }) {
      text
    }
  }
  `

  export const authenticate = gql`
  mutation Authenticate(
    $signature: Signature!,
    $address: EthereumAddress!
  ) {
    authenticate(request: {
      address: $address,
      signature: $signature
    }) {
      accessToken
      refreshToken
    }
  }`
