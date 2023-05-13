type RangeSliderProps = {
  value: number;
  onChange: (value: number) => void;
  onRelease: (value: number) => void;
};

export function RangeSlider({ value, onChange, onRelease }: RangeSliderProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(event.target.value));
  };

  const sliderRelease = (
    event:
      | React.MouseEvent<HTMLInputElement>
      | React.TouchEvent<HTMLInputElement>
  ) => {
    onRelease(parseFloat(event.currentTarget.value));
  };

  return (
    <div className="w-full">
      <label
        htmlFor="steps-range"
        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
      >
        No Interaction for <b>{value}</b> days
      </label>
      <input
        id="steps-range"
        type="range"
        min="5"
        max="35"
        value={value}
        step="5"
        className="w-full h-2 bg-gray-200 rounded-lg accent-primary-500 appearance-none cursor-pointer dark:bg-gray-700"
        onChange={handleChange}
        onMouseUp={sliderRelease}
        onTouchEnd={sliderRelease}
      />
    </div>
  );
}
