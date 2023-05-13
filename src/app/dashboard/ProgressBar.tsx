import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

type ProgressBarProps = {
  startAnimation: boolean;
};

export function ProgressBar({ startAnimation }: ProgressBarProps) {
  const [percentage, setPercentage] = useState(0);

  function animateProgressBar() {
    setPercentage(100);
  }

  function handleConfetti() {
    confetti({
      particleCount: 80,
      spread: 20,
      origin: { y: 0.6 },
    });
  }

  useEffect(() => {
    if (startAnimation) {
      animateProgressBar();
      setTimeout(() => {
        handleConfetti();
      }, 2000);
    }
  }, [startAnimation]);

  return (
    <div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${percentage}%`, transition: "width 2s ease-out" }}
        ></div>
      </div>
    </div>
  );
}
