import { ProgressBar } from "./ProgressBar";
import { PurgeList } from "./PurgeList";
import { useState } from "react";
import type { ListItem } from "./types";
import "./list.css";

export function Purge() {
  const listItems: ListItem[] = [
    { profileId: "0x1a", name: "Fio", lastInteraction: "01.04.2023" },
    { profileId: "0x1b", name: "Paul", lastInteraction: "01.04.2023" },
    { profileId: "0x1c", name: "Pauldev", lastInteraction: "01.04.2023" },
    { profileId: "0x1d", name: "Luka", lastInteraction: "01.04.2023" },
    { profileId: "0x1e", name: "Alex", lastInteraction: "01.04.2023" },
    { profileId: "0x1f", name: "Dude", lastInteraction: "01.04.2023" },
    { profileId: "0x1g", name: "Sir", lastInteraction: "01.04.2023" },
    { profileId: "0x1h", name: "Lens", lastInteraction: "01.04.2023" },
  ];

  let selectedItems: ListItem[] = [];

  const [purging, setPurging] = useState(false);

  function handleSelectedItems(items: ListItem[]) {
    console.log("selectedItems: ", items);
    selectedItems = items;
  }

  function purge(items: ListItem[]) {
    console.log("purge");
    console.log(items);
    setPurging(true);
  }

  return (
    <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
      <div className="flex flex-col px-4 py-3 space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:space-x-4">
        <div className="flex items-center flex-1 space-x-4">
          {!purging && <h5 className="text-white">Purgable Users</h5>}
          {purging && <h5 className="text-white">Please wait</h5>}
        </div>
        <div
          className={`flex flex-col flex-shrink-0 space-y-3 sm:flex-row sm:items-center sm:justify-end sm:space-y-0 sm:space-x-3 ${
            purging && "opacity-0"
          }`}
        >
          <button
            type="button"
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            onClick={() => purge(selectedItems)}
          >
            <svg
              className="h-3.5 w-3.5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              />
            </svg>
            Purge selected
          </button>
          <button
            type="button"
            className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => purge(listItems)}
          >
            <svg
              className="w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            Purge all
          </button>
        </div>
      </div>
      <div className="overflow-x-auto h-400 scrollbar-hide">
        {purging && (
          <div className="p-4 h-full w-full grid place-items-center">
            <div className="w-400">
              <ProgressBar startAnimation={purging} />
            </div>
          </div>
        )}
        {!purging && (
          <PurgeList
            listItems={listItems}
            onSelectionChange={handleSelectedItems}
          />
        )}
      </div>
      <div className="flex flex-col px-4 py-3 space-y-3 sm:flex-row sm:items-center sm:justify-end sm:space-y-0 sm:space-x-4">
        <button
          type="button"
          className={`flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${
            purging && "opacity-0"
          }`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
