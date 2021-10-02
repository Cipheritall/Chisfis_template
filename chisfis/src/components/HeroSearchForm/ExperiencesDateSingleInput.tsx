import React, { useEffect, useState } from "react";
import { SingleDatePicker, AnchorDirectionShape } from "react-dates";
import { FC } from "react";
import ClearDataButton from "./ClearDataButton";
import moment from "moment";
import useWindowSize from "hooks/useWindowResize";

export interface ExperiencesDateSingleInputProps {
  defaultValue: moment.Moment | null;
  onChange?: (date: moment.Moment | null) => void;
  defaultFocus?: boolean;
  fieldClassName?: string;
  onFocusChange: (focused: boolean) => void;
  className?: string;
  anchorDirection?: AnchorDirectionShape;
}

const ExperiencesDateSingleInput: FC<ExperiencesDateSingleInputProps> = ({
  defaultValue,
  onChange,
  defaultFocus = false,
  onFocusChange,
  anchorDirection,
  className = "",
  fieldClassName = "[ nc-hero-field-padding ]",
}) => {
  const [focusedInput, setFocusedInput] = useState(defaultFocus);
  const [startDate, setStartDate] = useState(defaultValue);

  const windowSize = useWindowSize();

  useEffect(() => {
    setStartDate(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    setFocusedInput(defaultFocus);
  }, [defaultFocus]);

  useEffect(() => {
    if (onChange) {
      onChange(startDate);
    }
  }, [startDate]);

  const handleClearData = () => {
    setStartDate(null);
  };

  const handleDateFocusChange = (arg: { focused: boolean }) => {
    setFocusedInput(arg.focused);
    onFocusChange && onFocusChange(arg.focused);
  };

  const renderInputCheckInDate = () => {
    const focused = focusedInput;
    return (
      <div
        className={`flex w-full relative ${fieldClassName} items-center space-x-3 cursor-pointer ${
          focused ? "shadow-2xl rounded-full" : ""
        }`}
        onClick={() => handleDateFocusChange({ focused: true })}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="nc-icon-field"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div className="flex-grow">
          <span className="block xl:text-lg font-semibold">
            {startDate ? startDate.format("DD MMM") : "Date"}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {startDate ? "Date" : `Add date`}
          </span>
          {startDate && focused && (
            <ClearDataButton onClick={() => handleClearData()} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`relative flex ${className}`} style={{ flex: "1 0 0%" }}>
      <div className="absolute inset-x-0 bottom-0">
        <SingleDatePicker
          date={startDate}
          onDateChange={(date) => setStartDate(date)}
          id={"nc-hero-ExperiencesDateSingleInput-startDateId"}
          focused={focusedInput}
          daySize={windowSize.width > 425 ? 56 : undefined}
          orientation={"horizontal"}
          onFocusChange={handleDateFocusChange}
          noBorder
          hideKeyboardShortcutsPanel
          keepOpenOnDateSelect
          numberOfMonths={1}
          anchorDirection={anchorDirection}
        />
      </div>

      {renderInputCheckInDate()}
    </div>
  );
};

export default ExperiencesDateSingleInput;
