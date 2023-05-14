import Image from "next/image";

type ListElementProps = {
  name: string;
  lastInteraction: string;
  profileId: string;
  imageSrc: string | null;
  imageAlt: string;
  nftAddr: string;
  onSelect: (item: {
    name: string;
    lastInteraction: string;
    profileId: string;
    imageSrc: string | null;
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
    <tr className="border-b border-darkGreen-500">
      <td className="w-4 px-4 py-3">
        <div className="flex items-center">
          <input
            id={`checkbox-table-search-${profileId}`}
            type="checkbox"
            onChange={() =>
              onSelect({
                name,
                lastInteraction,
                profileId,
                imageSrc,
                imageAlt,
                nftAddr,
              })
            }
            checked={isSelected}
            className="w-3.5 h-3.5 bg-gray-100 cursor-pointer border-darkGreen-500 rounded accent-lightGreen-500"
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
        className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap"
      >
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt}
            className="w-auto h-8 mr-3 text-darkGreen-500"
            width={100}
            height={100}
          />
        )}
        {!imageSrc && (
          <Image
            src="/default_avatar.jpeg"
            alt={imageAlt}
            className="w-auto h-8 mr-3 text-darkGreen-500"
            width={100}
            height={100}
          />
        )}
        {name}
      </th>
      <td className="px-4 py-2 font-medium text-darkGreen-500 whitespace-nowrap text-right">
        {lastInteraction}
      </td>
    </tr>
  );
}
