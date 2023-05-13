import Image from "next/image";

export function List() {
  const listItems = [
    { content: "Fio" },
    { content: "Paul" },
    { content: "Pauldev" },
    { content: "Luka" },
    { content: "Alex" },
  ];

  function handleDeleteClick(index: number) {
    console.log(`Item ${index} deleted`);
    // Add your delete logic here
  }

  return (
    <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      {listItems.map((item, index) => (
        <li
          key={index}
          className={`w-full px-4 py-2 flex justify-between ${
            index === 0
              ? "rounded-t-lg"
              : index === listItems.length - 1
              ? "rounded-b-lg"
              : ""
          } border-b border-gray-200 dark:border-gray-600`}
        >
          <p>{item.content}</p>
          <button onClick={() => handleDeleteClick(index)}>
            <Image
              src="trash.svg"
              alt="trash"
              width="100"
              height="100"
              className="w-4 h-4"
            />
          </button>
        </li>
      ))}
    </ul>
  );
}
