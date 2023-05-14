import Image from "next/image";

type ListElementProps = {
  name: string;
  lastInteraction: string;
  profileId: string;
  imageSrc: string;
  imageAlt: string;
  nftAddr: string;
  onSelect: (item: {
    name: string;
    lastInteraction: string;
    profileId: string;
    imageSrc: string;
    imageAlt: string;
    nftAddr: string;
  }) => void;
  isSelected: boolean;
};

export function PurgeListElement({
  name,
  lastInteraction,
  profileId,
  imageSrc,
  imageAlt,
  onSelect,
  isSelected,
  nftAddr,
}: ListElementProps) {
  return (
    <tr className="border-b dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-tertiary-700">
      <td className="w-4 px-4 py-3">
        <div className="flex items-center">
          <input
            id={`checkbox-table-search-${profileId}`}
            type="checkbox"
            onChange={() => onSelect({ name, lastInteraction, profileId, imageSrc, imageAlt, nftAddr })}
            checked={isSelected}
            className="w-3.5 h-3.5 bg-gray-100 cursor-pointer border-gray-300 rounded accent-primary-500 dark:bg-gray-700 dark:border-gray-600"
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
        <Image
          src={imageSrc}
          alt={imageAlt}
          className="w-auto h-8 mr-3 text-cream-500"
          width={100}
          height={100}
        />
        {name}
      </th>
      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-cream-500 text-right">
        {lastInteraction}
      </td>
    </tr>
  );
}
