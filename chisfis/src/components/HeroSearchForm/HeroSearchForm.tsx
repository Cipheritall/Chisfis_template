import React, { FC, useState } from "react";
import "react-dates/initialize";
import ExperiencesSearchForm from "./ExperiencesSearchForm";
import StaySearchForm from "./StaySearchForm";
import RentalCarSearchForm from "./RentalCarSearchForm";

export type SearchTab = "Stay" | "Experiences" | "Rental car";

export interface HeroSearchFormProps {
  className?: string;
  currentTab?: SearchTab;
  currentPage?: "Stay" | "Experiences" | "Rental car";
}

const HeroSearchForm: FC<HeroSearchFormProps> = ({
  className = "",
  currentTab = "Stay",
  currentPage,
}) => {
  const tabs: SearchTab[] = ["Stay", "Experiences", "Rental car"];
  const [tabActive, setTabActive] = useState<SearchTab>(currentTab);

  const renderTab = () => {
    return (
      <ul className="ml-6 md:ml-16 xl:ml-20 flex space-x-4 sm:space-x-8 lg:space-x-11">
        {tabs.map((tab) => {
          const active = tab === tabActive;
          return (
            <li
              onClick={() => setTabActive(tab)}
              className={`flex items-center cursor-pointer text-sm lg:text-base font-medium ${
                active
                  ? ""
                  : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-100"
              } `}
              key={tab}
            >
              {active && (
                <span className="block w-2.5 h-2.5 rounded-full bg-neutral-800 dark:bg-neutral-100 mr-2" />
              )}
              <span>{tab}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderForm = () => {
    const isArchivePage = !!currentPage && !!currentTab;
    switch (tabActive) {
      case "Stay":
        return <StaySearchForm haveDefaultValue={isArchivePage} />;
      case "Experiences":
        return <ExperiencesSearchForm haveDefaultValue={isArchivePage} />;
      case "Rental car":
        return <RentalCarSearchForm haveDefaultValue={isArchivePage} />;

      default:
        return null;
    }
  };

  return (
    <div
      className={`nc-HeroSearchForm w-full max-w-6xl py-5 lg:py-0 ${className}`}
      data-nc-id="HeroSearchForm"
    >
      {renderTab()}
      {renderForm()}
    </div>
  );
};

export default HeroSearchForm;
