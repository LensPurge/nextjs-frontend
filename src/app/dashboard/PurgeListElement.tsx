import Image from "next/image";

type ListElementProps = {
  name: string;
  lastInteraction: string;
  profileId: string;
  onSelect: (item: {
    name: string;
    lastInteraction: string;
    profileId: string;
  }) => void;
  isSelected: boolean;
};

export function PurgeListElement({
  name,
  lastInteraction,
  profileId,
  onSelect,
  isSelected,
}: ListElementProps) {

  return (
    <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="w-4 px-4 py-3">
        <div className="flex items-center">
          <input
            id={`checkbox-table-search-${profileId}`}
            type="checkbox"
            onChange={() => onSelect({ name, lastInteraction, profileId })}
            checked={isSelected}
            className="w-4 h-4 bg-gray-100 cursor-pointer border-gray-300 rounded text-primary-600 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor={`checkbox-table-search-${profileId}`}
            className="sr-only"
          >
            checkbox
          </label>
        </div>
      </td>
      <th
        scope="row"
        className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <img
          src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png"
          alt="iMac Front Image"
          className="w-auto h-8 mr-3"
        />
        {name}
      </th>
      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {lastInteraction}
      </td>
    </tr>
  );
}
