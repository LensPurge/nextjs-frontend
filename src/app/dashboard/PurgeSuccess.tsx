import { useEffect } from "react";
import confetti from "canvas-confetti";

export function PurgeSuccess() {
  function handleConfetti() {
    confetti({
      particleCount: 80,
      spread: 20,
      origin: { y: 0.6 },
    });
  }

  useEffect(() => {
    handleConfetti();
  }, []);
  return (
    <div className="text-darkGreen-500 flex flex-col justify-center items-center w-fit	">
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-20 w-20"
      >
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        ></path>
      </svg>
      <h2 className="text-darkGreen-500 w-fit">Success</h2>
    </div>
  );
}
