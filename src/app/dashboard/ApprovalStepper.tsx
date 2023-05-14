import { useState } from "react";
import { ApprovalStepperElement } from "./ApprovalStepperElement";
import type { ListItem } from "./types";

import { ethers, utils } from "ethers";
import { getUnfollowTypedData } from "./api";

import { apolloClient, unfollowUser } from "../api";
// import { getClient } from "../client";
import { LENS_FOLLOW_NFT_ABI } from "../abi";
import { omit } from "../helper";
import { TypedDataDomain } from "@ethersproject/abstract-signer";
import { useAccounts } from "@/components/web3Context";

type ApprovalItem = {
  profileId: string;
  name: string;
  lastInteraction: string;
  imageSrc: string;
  imageAlt: string;
  done: boolean;
};

type ApprovalStepperType = {
  onAllApproved: (done: boolean) => void;
  items: ListItem[];
};

export function ApprovalStepper({ onAllApproved, items }: ApprovalStepperType) {
  const { provider } = useAccounts();
  const [itemsToApprove, setSelectedItems] = useState<ApprovalItem[]>(
    items.map((item) => ({ ...item, done: false }))
  );

  if (provider == undefined) return;
  const account = provider?.getSigner();
  async function signedTypeData(
    domain: TypedDataDomain,
    types: Record<string, any>,
    value: Record<string, any>
  ) {
    return account._signTypedData(
      omit(domain, "__typename"),
      omit(types, "__typename"),
      omit(value, "__typename")
    );
  }

  async function createUnfollowTypedData(profileId: string) {
    const result = await apolloClient.mutate({
      mutation: getUnfollowTypedData,
      variables: {
        profile: profileId,
      },
    });
    return result.data!.createUnfollowTypedData;
  }

  async function unfollow() {
    // @note this also needs to be variable, bc this is the followed NFT address
    const followNftAddress = "0x519B98aCFe0d13161aE75E6aEA8C4C60f6418055";
    const followNftContract = new ethers.Contract(
      followNftAddress,
      LENS_FOLLOW_NFT_ABI,
      account
    );
    let profileId = "0x15"; // @note this needs to be variable
    const result = await createUnfollowTypedData(profileId);
    const typedData = result.typedData;
    const signature = await signedTypeData(
      typedData.domain,
      typedData.types,
      typedData.value
    );
    const { v, r, s } = utils.splitSignature(signature);
    const sig = {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    };
    const tx = await followNftContract.burnWithSig(
      typedData.value.tokenId,
      sig
    );
    console.log("follow: tx hash", tx.hash);
    // const newClient = await getClient();
    // await newClient
    //   .mutate({
    //     mutation: unfollowUser,
    //     variables: {
    //       profile: "0x15",
    //     },
    //   })
    //   .then(() => console.log("successfully unfollowed"));
  }

  function handleItemApprove(newItem: ApprovalItem) {
    unfollow();


    setSelectedItems(
      itemsToApprove.map((item) => {
        if (item.profileId === newItem.profileId) {
          item.done = true;
        }
        return item;
      })
    );
    console.log("itemsToApprove: ", itemsToApprove);
    if (itemsToApprove.every((item) => item.done === true)) {
      console.log("All items approved");
      onAllApproved(true);
    }
  }

  return (
    <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {itemsToApprove.map((item, index) => (
        <li
          className={`${index + 1 !== itemsToApprove.length && "mb-10"} ml-6`}
          key={index}
        >
          <ApprovalStepperElement
            profileId={item.profileId}
            name={item.name}
            lastInteraction={item.lastInteraction}
            imageSrc={item.imageSrc}
            imageAlt={item.imageAlt}
            done={item.done}
            onApprove={handleItemApprove}
          />
        </li>
      ))}
    </ol>
  );
}
