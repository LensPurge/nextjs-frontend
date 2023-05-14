import { useState } from "react";
import { ApprovalStepperElement } from "./ApprovalStepperElement";
import type { ListItem } from "./types";

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
  const [itemsToApprove, setSelectedItems] = useState<ApprovalItem[]>(
    items.map((item) => ({ ...item, done: false }))
  );

  function handleItemApprove(newItem: ApprovalItem) {
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
