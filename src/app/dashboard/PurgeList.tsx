import { PurgeListElement } from "./PurgeListElement";
import { useState } from "react";
import type { ListItem } from "./types";

type PurgeXProps = {
  listItems: ListItem[];
  onSelectionChange: (selectedItems: ListItem[]) => void;
};

export function PurgeList({ listItems, onSelectionChange }: PurgeXProps) {
  const [selectedItems, setSelectedItems] = useState<ListItem[]>([]);
  const [allChecked, setAllIsChecked] = useState(false);

  const handleItemSelect = (item: ListItem) => {
    setSelectedItems((prevSelectedItems) => {
      if (allChecked) {
        setAllIsChecked(false);
      }
      if (
        prevSelectedItems.some(
          (selected) => selected.profileId === item.profileId
        )
      ) {
        // Item is already selected, remove it from the list
        const updatedSelectedItems = prevSelectedItems.filter(
          (selected) => selected.profileId !== item.profileId
        );
        onSelectionChange(updatedSelectedItems);
        return updatedSelectedItems;
      } else {
        // Item is not yet selected, add it to the list
        const updatedSelectedItems = [...prevSelectedItems, item];
        onSelectionChange(updatedSelectedItems);
        return updatedSelectedItems;
      }
    });
  };

  function handleSelectAllChange(event: any) {
    setAllIsChecked(event.target.checked);
    if (event.target.checked) {
      setSelectedItems(listItems);
      onSelectionChange(listItems);
    } else {
      setSelectedItems([]);
      onSelectionChange([]);
    }
  }

  return (
    <table className="w-full text-sm text-left text-gray-400">
      <thead className="text-xs uppercase bg-darkGreen-500 text-mintGreen-500 sticky top-0">
        <tr>
          <th scope="col" className="p-4">
            <div className="flex items-center">
              <input
                id="checkbox-all"
                type="checkbox"
                className="w-3.5 h-3.5 cursor-pointer rounded accent-lightGreen-500 bg-gray-700 border-gray-600"
                onChange={handleSelectAllChange}
                checked={allChecked}
              />
              <label htmlFor="checkbox-all" className="sr-only">
                checkbox
              </label>
            </div>
          </th>
          <th scope="col" className="px-4 py-3">
            User
          </th>
          <th scope="col" className="px-4 py-3 whitespace-nowrap text-right">
            Last Interaction
          </th>
        </tr>
      </thead>
      <tbody>
        {listItems.map((item, index) => (
          <PurgeListElement
            key={index}
            name={item.name}
            lastInteraction={item.lastInteraction}
            profileId={item.profileId}
            imageSrc={item.imageSrc}
            imageAlt={item.imageAlt}
            nftAddr={item.nftAddr}
            onSelect={handleItemSelect}
            isSelected={selectedItems.some(
              (selected) => selected.profileId === item.profileId
            )}
          />
        ))}
      </tbody>
    </table>
  );
}
