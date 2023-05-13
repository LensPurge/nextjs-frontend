import { ProgressBar } from "./ProgressBar";
import { PurgeList } from "./PurgeList";
import { useState } from "react";
import type { ListItem } from "./types";
import Image from "next/image";
import { PurgeSuccess } from "./PurgeSuccess";
import "./list.css";

export function Purge() {
  const listItems: ListItem[] = [
    {
      profileId: "0x1a",
      name: "Fio",
      lastInteraction: "01.04.2023",
      imageSrc:
        "https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png",
      imageAlt: "Profile Pic",
    },
    {
      profileId: "0x1b",
      name: "Paul",
      lastInteraction: "01.04.2023",
      imageSrc:
        "https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png",
      imageAlt: "Profile Pic",
    },
    {
      profileId: "0x1c",
      name: "Pauldev",
      lastInteraction: "01.04.2023",
      imageSrc:
        "https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png",
      imageAlt: "Profile Pic",
    },
    {
      profileId: "0x1d",
      name: "Luka",
      lastInteraction: "01.04.2023",
      imageSrc:
        "https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png",
      imageAlt: "Profile Pic",
    },
    {
      profileId: "0x1e",
      name: "Alex",
      lastInteraction: "01.04.2023",
      imageSrc:
        "https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png",
      imageAlt: "Profile Pic",
    },
    {
      profileId: "0x1f",
      name: "Dude",
      lastInteraction: "01.04.2023",
      imageSrc:
        "https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png",
      imageAlt: "Profile Pic",
    },
    {
      profileId: "0x1g",
      name: "Sir",
      lastInteraction: "01.04.2023",
      imageSrc:
        "https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png",
      imageAlt: "Profile Pic",
    },
    {
      profileId: "0x1h",
      name: "Lens",
      lastInteraction: "01.04.2023",
      imageSrc:
        "https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png",
      imageAlt: "Profile Pic",
    },
  ];

  let selectedItems: ListItem[] = [];

  const [purging, setPurging] = useState(false);
  const [purgeSuccess, setPurgeSuccess] = useState(false);

  function handleSelectedItems(items: ListItem[]) {
    console.log("selectedItems: ", items);
    selectedItems = items;
  }

  function purge(items: ListItem[]) {
    console.log("purge");
    console.log(items);
    setPurging(true);
  }

  function handlePurgeSuccess(done: boolean) {
    console.log("handlePurgeSuccess");
    setPurgeSuccess(done);
    setPurging(false);
  }

  return (
    <div className="relative overflow-hidden bg-white shadow-md dark:bg-tertiary-900 sm:rounded-lg">
      <div className="flex flex-col px-4 py-3 space-y-3 sm:flex-row sm:items-center sm:justify-end sm:space-y-0 sm:space-x-4">
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
          <button
            type="button"
            className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-200 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-tertiary-800 dark:text-gray-200 dark:border-gray-200 dark:hover:bg-tertiary-500 dark:hover:border-cream-500 dark:hover:text-cream-500"
            onClick={() => purge(listItems)}
          >
            <svg
              fill="none"
              className="h-3.5 w-3.5 mr-2"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              ></path>
            </svg>
            Purge all
          </button>
        </div>
      </div>
      <div className="overflow-x-auto h-400 scrollbar-hide">
        {purging && !purgeSuccess && (
          <div className="p-4 h-full w-full grid place-items-center">
            <div className="w-400">
              <ProgressBar
                startAnimation={purging}
                onFinished={handlePurgeSuccess}
              />
            </div>
          </div>
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
      <div className="flex flex-col px-4 py-3 space-y-3 sm:flex-row sm:items-center sm:justify-end sm:space-y-0 sm:space-x-4">
        <button
          type="button"
          className={`flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-200 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-tertiary-800 dark:text-gray-200 dark:border-gray-200 dark:hover:bg-tertiary-500 dark:hover:border-cream-500 dark:hover:text-cream-500 ${
            (purging || purgeSuccess) && "opacity-0"
          }`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
