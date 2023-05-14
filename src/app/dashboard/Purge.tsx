"use client";
import { ProgressBar } from "./ProgressBar";
import { PurgeList } from "./PurgeList";
import { useState, useEffect, useCallback } from "react";
import type { ListItem } from "./types";
import Image from "next/image";
import { PurgeSuccess } from "./PurgeSuccess";
import { RangeSlider } from "./RangeSlider";
import "./list.css";
import { ApprovalStepper } from "./ApprovalStepper";
import { useAccounts } from "@/components/web3Context";

export function Purge() {
  const { provider } = useAccounts();

  function randomNumber() {
    return Math.floor(Math.random() * 3) + 1;
  }

  const convertItems = useCallback((items: any): ListItem[] => {
    let arry: ListItem[] = [];
    for (const [k, v] of Object.entries(items)) {
      let profileId = k;
      // @ts-ignore
      let name = v.handle;
      // @ts-ignore
      let nft_addr = v.nft_addr;
      // @ts-ignore
      let img_link = v.img_link;

      let month = randomNumber();

      arry.push({
        profileId: profileId,
        name: name,
        nftAddr: nft_addr,
        imageSrc: img_link,
        imageAlt: "Profile Pic",
        lastInteraction: `${month} ${month === 1 ? "month" : "months"} ago`,
      });
    }
    return arry;
  }, []);

  const fetchItems = useCallback(async () => {
    const address = await provider?.getSigner().getAddress();
    console.log("makeRequest");
    const response = await fetch(
      "https://pbbecker.pythonanywhere.com/minimalens",
      {
        method: "POST",
        body: JSON.stringify({
          profile_id: address,
        }),
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const items = await response.json();
    console.log({ items });
    console.log(typeof items);
    const converted = convertItems(items);
    setListItems(converted);
  }, [convertItems, provider]);

  useEffect(() => {
    fetchItems();
    // setListItems([
    //   {
    //     profileId: "0x1a",
    //     name: "Fio",
    //     lastInteraction: "01.04.2023",
    //     imageSrc: null,
    //     imageAlt: "Profile Pic",
    //     nftAddr: "0x1a",
    //   },
    // ]);
  }, [fetchItems]);

  const [listItems, setListItems] = useState<ListItem[]>([]);
  // const listItems: ListItem[] = [
  //   {
  //     profileId: "0x1a",
  //     name: "Fio",
  //     lastInteraction: "01.04.2023",
  //     imageSrc:
  //       "https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png",
  //     imageAlt: "Profile Pic",
  //   },

  const [itemsToPurge, setItemsToPurge] = useState<ListItem[]>([]);

  let selectedItems: ListItem[] = [];

  const [purging, setPurging] = useState(false);
  const [purgeSuccess, setPurgeSuccess] = useState(false);

  const [sliderValue, setSliderValue] = useState(20);

  const handleSliderChange = (sliderValue: number) => {
    setSliderValue(sliderValue);
  };

  const handleSliderRelease = (sliderValue: number) => {
    console.log(sliderValue);
    // fetch users here
  };

  function handleSelectedItems(items: ListItem[]) {
    console.log("selectedItems: ", items);
    selectedItems = items;
  }

  function purge(items: ListItem[]) {
    console.log("purge");
    console.log(items);
    setPurging(true);
    setItemsToPurge(items);
  }

  // function handlePurgeSuccess(done: boolean) {
  //   console.log("handlePurgeSuccess");
  //   setPurgeSuccess(done);
  //   setPurging(false);
  // }

  function handleAllApproved(done: boolean) {
    setPurgeSuccess(done);
    setPurging(false);
  }

  return (
    <div className="relative overflow-hidden shadow-md bg-mintGreen-500 sm:rounded-lg">
      <div className="flex flex-col p-4 space-y-3 sm:flex-row sm:items-center sm:justify-end sm:space-y-0 sm:space-x-4">
        <div
          className={`flex flex-col flex-shrink-0 space-y-3 sm:flex-row sm:items-center sm:justify-end sm:space-y-0 sm:space-x-3 ${
            (purging || purgeSuccess) && "opacity-0"
          }`}
        >
          <button
            type="button"
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-darkGreen-500 hover:text-lightGreen-500 border-darkGreen-500 border rounded-lg focus:ring-4 bg-lightGreen-500 hover:bg-darkGreen-500 focus:outline-none focus:ring-primary-800"
            onClick={() => purge(selectedItems)}
          >
            {/* <div className="text-darkGreen-500 hover:text-lightGreen-500"> */}
            <svg
              fill="currentColor"
              className="h-3.5 w-3.5 mr-2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M10.375 2.25a4.125 4.125 0 100 8.25 4.125 4.125 0 000-8.25zM10.375 12a7.125 7.125 0 00-7.124 7.247.75.75 0 00.363.63 13.067 13.067 0 006.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 00.364-.63l.001-.12v-.002A7.125 7.125 0 0010.375 12zM16 9.75a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-6z"></path>
            </svg>
            {/* </div> */}
            {/* <Image
              src="user-minus.svg"
              className="h-3.5 w-3.5 mr-2"
              alt="User Minus"
              height={100}
              width={100}
            /> */}
            Unfollow selected
          </button>
        </div>
      </div>
      <div className="overflow-x-auto h-300 sm:h-400 scrollbar-hide">
        {purging && !purgeSuccess && (
          <div className="p-4 h-full w-full grid place-items-center overflow-y-scroll">
            <ApprovalStepper
              onAllApproved={handleAllApproved}
              items={itemsToPurge}
            />
          </div>
          //   <div className="w-200 sm:w-400">
          //     <ProgressBar
          //       startAnimation={purging}
          //       onFinished={handlePurgeSuccess}
          //     />
          // </div>
        )}
        {!purging && !purgeSuccess && (
          <PurgeList
            listItems={listItems}
            onSelectionChange={handleSelectedItems}
          />
        )}
        {purgeSuccess && !purging && (
          <div className="p-4 h-full w-full grid place-items-center">
            <PurgeSuccess />
          </div>
        )}
      </div>
      <div className="flex flex-col p-4 space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:space-x-4">
        <div
          className={`w-full sm:w-1/2 ${
            (purging || purgeSuccess) && "opacity-0"
          }`}
        >
          <RangeSlider
            value={sliderValue}
            onChange={handleSliderChange}
            onRelease={handleSliderRelease}
          />
        </div>

        <button
          type="button"
          onClick={() => {
            setPurging(false);
            setPurgeSuccess(false);
            selectedItems = [];
          }}
          className={`flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium rounded-lg focus:z-10 bg-mintGreen-500 text-darkGreen-500 border-darkGreen-500`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
