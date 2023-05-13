import { useState } from "react";
import { ApprovalStepperElement } from "./ApprovalStepperElement";

type ApprovalItem = {
  profileId: string;
  name: string;
  done: boolean;
  lastInteraction: string;
};

type ApprovalStepperType = {
  onAllApproved: (done: boolean) => void;
};

export function ApprovalStepper({ onAllApproved }: ApprovalStepperType) {
  const [approvedItems, setSelectedItems] = useState<ApprovalItem[]>([
    {
      profileId: "0x1a",
      name: "dude",
      done: false,
      lastInteraction: "04.02.2023",
    },
    {
      profileId: "0x1b",
      name: "dude",
      done: false,
      lastInteraction: "04.02.2023",
    },
    {
      profileId: "0x1c",
      name: "dude",
      done: false,
      lastInteraction: "04.02.2023",
    },
    {
      profileId: "0x1d",
      name: "dude",
      done: false,
      lastInteraction: "04.02.2023",
    },
    {
      profileId: "0x1e",
      name: "dude",
      done: false,
      lastInteraction: "04.02.2023",
    },
    {
      profileId: "0x1f",
      name: "dude",
      done: false,
      lastInteraction: "04.02.2023",
    },
    {
      profileId: "0x1g",
      name: "dude",
      done: false,
      lastInteraction: "04.02.2023",
    },
    {
      profileId: "0x1h",
      name: "dude",
      done: false,
      lastInteraction: "04.02.2023",
    },
    {
      profileId: "0x1i",
      name: "dude",
      done: false,
      lastInteraction: "04.02.2023",
    },
  ]);

  function handleItemApprove(newItem: ApprovalItem) {
    setSelectedItems(
      approvedItems.map((item) => {
        if (item.profileId === newItem.profileId) {
          item.done = true;
        }
        return item;
      })
    );
    console.log("approvedItems: ", approvedItems);
    if (approvedItems.every((item) => item.done === true)) {
      console.log("All items approved");
      onAllApproved(true);
    }
  }

  return (
    <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {approvedItems.map((item, index) => (
        <li
          className={`${index + 1 !== approvedItems.length && "mb-10"} ml-6`}
          key={index}
        >
          <ApprovalStepperElement
            profileId={item.profileId}
            name={item.name}
            done={item.done}
            lastInteraction={item.lastInteraction}
            onApprove={handleItemApprove}
          />
        </li>
      ))}
    </ol>
  );
}
