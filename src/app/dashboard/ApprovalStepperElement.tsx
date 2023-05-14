type ApprovalStepperElementProps = {
  profileId: string;
  name: string;
  lastInteraction: string;
  imageSrc: string;
  imageAlt: string;
  nftAddr: string;
  done: boolean;
  onApprove: (item: {
    profileId: string;
    name: string;
    lastInteraction: string;
    imageSrc: string;
    imageAlt: string;
    nftAddr: string;
    done: boolean;
  }) => void;
};

export function ApprovalStepperElement({
  profileId,
  name,
  lastInteraction,
  imageSrc,
  imageAlt,
  done,
  nftAddr,
  onApprove,
}: ApprovalStepperElementProps) {
  return (
    <div className="w-full">
      {done && (
        <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-primary-500">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-green-500 dark:text-tertiary-900"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      )}

      {!done && (
        <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-900">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      )}

      <div className="flex">
        <div className="flex flex-col">
          <h3 className="ml-2 font-medium leading-tight">{name}</h3>
          <p className="ml-2 text-sm">{lastInteraction}</p>
        </div>
        <button
          type="button"
          className={`flex ml-auto items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-200 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-tertiary-800 dark:text-gray-200 dark:border-gray-200 dark:hover:bg-tertiary-500 dark:hover:border-cream-500 dark:hover:text-cream-500 ${
            done && "opacity-0"
          }`}
          onClick={() =>
            onApprove({
              profileId,
              name,
              lastInteraction,
              imageSrc,
              imageAlt,
              done,
              nftAddr,
            })
          }
        >
          Approve
        </button>
      </div>
    </div>
  );
}
