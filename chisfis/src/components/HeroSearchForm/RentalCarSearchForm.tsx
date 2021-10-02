import React, { useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import { FocusedInputShape } from "react-dates";
import RentalCarDatesRangeInput from "./RentalCarDatesRangeInput";
import ButtonSubmit from "./ButtonSubmit";
import { FC } from "react";
import moment from "moment";

export interface DateRage {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

export interface TimeRage {
  startTime: string;
  endTime: string;
}

export interface RentalCarSearchFormProps {
  haveDefaultValue?: boolean;
}

const RentalCarSearchForm: FC<RentalCarSearchFormProps> = ({
  haveDefaultValue,
}) => {
  // DEFAULT DATA FOR ARCHIVE PAGE
  const defaultPickUpInputValue = "Tokyo, Jappan";
  const defaultDropOffInputValue = "Paris, France";
  // const defaultDateRange = {
  //   startDate: moment("2021-08-08"),
  //   endDate: moment("2021-09-09"),
  // };

  // USE STATE
  const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
    startDate: null,
    endDate: null,
  });
  const [timeRangeValue, setTimeRangeValue] = useState<TimeRage>({
    startTime: "10:00 AM",
    endTime: "10:00 AM",
  });
  const [pickUpInputValue, setPickUpInputValue] = useState("");
  const [dropOffInputValue, setDropOffInputValue] = useState("");
  const [fieldFocused, setFieldFocused] = useState<
    FocusedInputShape | "dropOffInput" | null
  >(null);
  const [dropOffLocationType, setDropOffLocationType] = useState<
    "same" | "different"
  >("same");

  // USER EFFECT
  useEffect(() => {
    if (haveDefaultValue) {
      setDateRangeValue({
        startDate: moment(),
        endDate: moment().add(4, "days"),
      });

      setPickUpInputValue(defaultPickUpInputValue);
      setDropOffInputValue(defaultDropOffInputValue);
    }
  }, []);
  //

  const renderRadioBtn = () => {
    return (
      <div className=" py-5 [ nc-hero-field-padding ] flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-10 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex  items-center">
          <input
            id="same-drop-off"
            name="drop-off-type"
            type="radio"
            value="same"
            className="focus:ring-primary-500 h-4 w-4 text-primary-500 border-neutral-300"
            checked={dropOffLocationType === "same"}
            onChange={(e) =>
              setDropOffLocationType(e.currentTarget.value as "same")
            }
          />
          <label
            htmlFor="same-drop-off"
            className="ml-2 sm:ml-3 block text-sm font-medium text-gray-700 dark:text-neutral-300"
          >
            Same drop off
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="different-drop-off"
            name="drop-off-type"
            value="different"
            type="radio"
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            checked={dropOffLocationType === "different"}
            onChange={(e) =>
              setDropOffLocationType(e.currentTarget.value as "different")
            }
          />
          <label
            htmlFor="different-drop-off"
            className="ml-2 sm:ml-3 block text-sm font-medium text-gray-700 dark:text-neutral-300"
          >
            Different drop off
          </label>
        </div>
      </div>
    );
  };

  const renderForm = () => {
    return (
      <div className="w-full">
        <form className="w-full relative mt-8 rounded-3xl shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-900">
          {renderRadioBtn()}
          <div className=" flex flex-col md:flex-row md:items-center w-full rounded-full [ nc-divide-field ] ">
            <div className="relative flex flex-col nc-flex-2-auto [ nc-divide-field ] ">
              <LocationInput
                defaultValue={pickUpInputValue}
                onChange={(e) => setPickUpInputValue(e)}
                onInputDone={() =>
                  setFieldFocused(
                    dropOffLocationType === "different"
                      ? "dropOffInput"
                      : "startDate"
                  )
                }
                placeHolder="City or Airport"
                desc="Pick up location"
              />
              {dropOffLocationType === "different" && (
                <LocationInput
                  defaultValue={dropOffInputValue}
                  onChange={(e) => setDropOffInputValue(e)}
                  onInputDone={() => setFieldFocused("startDate")}
                  placeHolder="City or Airport"
                  desc="Drop off location"
                  autoFocus={fieldFocused === "dropOffInput"}
                />
              )}
            </div>
            <RentalCarDatesRangeInput
              defaultDateValue={dateRangeValue}
              defaultTimeValue={timeRangeValue}
              defaultFocus={
                fieldFocused === "dropOffInput" ? null : fieldFocused
              }
              onFocusChange={(focus) => setFieldFocused(focus)}
              onChange={(data) => {
                setDateRangeValue(data.stateDate);
                setTimeRangeValue(data.stateTimeRage);
              }}
            />
            {/* BUTTON SUBMIT OF FORM */}
            <div className="px-4 py-3">
              <ButtonSubmit />
            </div>
          </div>
        </form>
      </div>
    );
  };

  return renderForm();
};

export default RentalCarSearchForm;
