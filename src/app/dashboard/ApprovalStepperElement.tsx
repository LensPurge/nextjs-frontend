type ApprovalStepperElementProps = {
  profileId: string;
  name: string;
  lastInteraction: string;
  imageSrc: string | null;
  imageAlt: string;
  nftAddr: string;
  done: boolean;
  onApprove: (item: {
    profileId: string;
    name: string;
    lastInteraction: string;
    imageSrc: string | null;
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
    <div>
      {done && (
        <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-gray-900 bg-lightGreen-500">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-tertiary-900"
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
        <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 text-white  ring-gray-900 bg-gray-700">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-400"
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

      <div className="flex justify-between">
        <div className="flex flex-col">
          <h3 className="ml-2 font-medium leading-tight text-black">{name}</h3>
          <p className="ml-2 text-sm text-black">{lastInteraction}</p>
        </div>
        <div className="grid place-items-center">
          <button
            type="button"
            className={`flex ml-auto items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-lightGreen-500 bg-darkGreen-500 hover:text-darkGreen-500 border-darkGreen-500  border rounded-lg focus:outline-none hover:bg-lightGreen-500 focus:z-10 ${
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
    </div>
  );
}
