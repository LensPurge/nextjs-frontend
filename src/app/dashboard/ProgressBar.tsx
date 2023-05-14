import { useState, useEffect } from "react";

type ProgressBarProps = {
  startAnimation: boolean;
  onFinished: (done: boolean) => void;
};

export function ProgressBar({ startAnimation, onFinished }: ProgressBarProps) {
  const [percentage, setPercentage] = useState(0);

  function animateProgressBar() {
    setPercentage(100);
  }

  useEffect(() => {
    if (startAnimation) {
      animateProgressBar();
      setTimeout(() => {
        onFinished(true);
      }, 2000);
    }
  });

  return (
    <div>
      <div className="w-full rounded-full h-2.5 bg-gray-700">
        <div
          className="bg-primary-500 h-2.5 rounded-full"
          style={{ width: `${percentage}%`, transition: "width 2s ease-out" }}
        ></div>
      </div>
    </div>
  );
}
