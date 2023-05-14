import { gql } from "@apollo/client";

export const getUnfollowTypedData = gql`
  mutation CreateUnfollowTypedData($profile: ProfileId!) {
    createUnfollowTypedData(request: { profile: $profile }) {
      id
      expiresAt
      typedData {
        types {
          BurnWithSig {
            name
            type
          }
        }
        domain {
          version
          chainId
          name
          verifyingContract
        }
        value {
          nonce
          deadline
          tokenId
        }
      }
    }
  }
`;
