"use client";
import { ProgressBar } from "./ProgressBar";
import { PurgeList } from "./PurgeList";
import { useState, useEffect } from "react";
import type { ListItem } from "./types";
import Image from "next/image";
import { PurgeSuccess } from "./PurgeSuccess";
import { RangeSlider } from "./RangeSlider";
import "./list.css";
import { ApprovalStepper } from "./ApprovalStepper";

export function Purge() {
  useEffect(() => {
    fetchItems();
  }, []);

  function convertItems(items: any): ListItem[] {
    let arry: ListItem[] = [];
    for (const [k, v] of Object.entries(items)) {
      let profileId = k;
      // @ts-ignore
      let name = v.handle;
      // @ts-ignore
      let nft_addr = v.nft_addr;

      arry.push({
        profileId: profileId,
        name: name,
        nftAddr: nft_addr,
        imageSrc:
          "https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png",
        imageAlt: "Profile Pic",
        lastInteraction: "01.04.2023",
      });
    }
    return arry;
  }

  async function fetchItems() {
    console.log("makeRequest");
    const response = await fetch(
      "https://pbbecker.pythonanywhere.com/minimalens",
      {
        method: "POST",
        body: JSON.stringify({
          profile_id: "0x15",
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
  }

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
    <div className="relative overflow-hidden bg-white shadow-md dark:bg-tertiary-600 sm:rounded-lg">
      <div className="flex flex-col p-4 space-y-3 sm:flex-row sm:items-center sm:justify-end sm:space-y-0 sm:space-x-4">
        <div
          className={`flex flex-col flex-shrink-0 space-y-3 sm:flex-row sm:items-center sm:justify-end sm:space-y-0 sm:space-x-3 ${
            (purging || purgeSuccess) && "opacity-0"
          }`}
        >
          <button
            type="button"
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-tertiary-900 rounded-lg bg-primary-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-500 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            onClick={() => purge(selectedItems)}
          >
            <Image
              src="user-minus.svg"
              className="h-3.5 w-3.5 mr-2"
              alt="User Minus"
              height={100}
              width={100}
            />
            Purge selected
          </button>
        </div>
      </div>
      <div className="overflow-x-auto h-300 sm:h-400 scrollbar-hide">
        {/* {purging && !purgeSuccess && ( */}
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
        {/* {!purging && !purgeSuccess && ( */}
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
          className={`flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-200 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-tertiary-800 dark:text-gray-200 dark:border-gray-200 dark:hover:bg-tertiary-500 dark:hover:border-cream-500 dark:hover:text-cream-500`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
