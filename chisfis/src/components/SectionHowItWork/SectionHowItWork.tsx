import Heading from "components/Heading/Heading";
import React, { FC, Fragment } from "react";
import NcImage from "shared/NcImage/NcImage";
import HIW1img from "images/HIW1.png";
import HIW2img from "images/HIW2.png";
import HIW3img from "images/HIW3.png";
import VectorImg from "images/VectorHIW.svg";
import { NavLink } from "react-router-dom";
import carUtilities1 from "../../images/carUtilities/1.png";
import carUtilities2 from "../../images/carUtilities/2.png";
import carUtilities3 from "../../images/carUtilities/3.png";
import carUtilities4 from "../../images/carUtilities/4.png";
import carUtilities5 from "../../images/carUtilities/5.png";
import carUtilities6 from "../../images/carUtilities/6.png";
import carUtilities7 from "../../images/carUtilities/7.png";
import carUtilities8 from "../../images/carUtilities/8.png";

import Label from "components/Label/Label";
import Avatar from "shared/Avatar/Avatar";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import Textarea from "shared/Textarea/Textarea";
import CommonLayout from "../../../src/containers/AccountPage/CommonLayout";

import { Tab } from "@headlessui/react";
import mastercardPng from "images/mastercard.svg";
import visaPng from "images/vis.png";
import { Helmet } from "react-helmet";

export interface SectionHowItWorkProps {
  className?: string;
}

const DEMO_DATA = [
  {
    id: 1,
    img: HIW1img,
    title: "Book & relax",
    desc: "Let each trip be an inspirational journey, each room a peaceful space",
  },
  {
    id: 2,
    img: HIW2img,
    title: "Smart checklist",
    desc: "Let each trip be an inspirational journey, each room a peaceful space",
  },
  {
    id: 3,
    img: HIW3img,
    title: "Save more",
    desc: "Let each trip be an inspirational journey, each room a peaceful space",
  },
];

const Amenities_demos = [
  { name: "Exit from India may be restricted ", icon: carUtilities1 },
  {
    name: "Travel is allowed with restrictions ",
    icon: carUtilities2,
  },
  {
    name: "Mandatory COVID-19 testing on day 2 and day 8 in England for unvaccinated travelers",
    icon: carUtilities3,
  },
  {
    name: "Mandatory 10-day quarantine for England for unvaccinated travelers",
    icon: carUtilities4,
  },
  { name: "8-inch color touchscreen display audio", icon: carUtilities5 },
  { name: "Smart Cruise Control with Stop & Go (SCC)", icon: carUtilities6 },
  { name: "LED Daytime Running Lights (DRL)", icon: carUtilities7 },
  { name: "Blind-Spot Collision Warning (BCW)", icon: carUtilities8 },
];

const SectionHowItWork: FC<SectionHowItWorkProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionSliderNewCategories relative`}>
      {/* <h3 className='text-2xl font-semibold'>Departure</h3> */}
      <div className='mt-6'>
        <Tab.Group>
          <Tab.List className='flex'>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${
                    selected
                      ? "bg-neutral-800 text-white"
                      : "text-neutral-6000 dark:text-neutral-400"
                  }`}>
                  Departure
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${
                    selected
                      ? "bg-neutral-800 text-white"
                      : " text-neutral-6000 dark:text-neutral-400"
                  }`}>
                  <span className='mr-2.5'>Return</span>
                </button>
              )}
            </Tab>
          </Tab.List>

          <div className='w-14 border-b border-neutral-200 my-5'></div>
          <Tab.Panels>
            <Tab.Panel className='space-y-5'>
              <div className='listingSection__wrap bg-white'>
                <div>
                  <h2 className='text-2xl font-semibold'>
                    Travel restrictions{" "}
                  </h2>
                  <span className='block mt-2 text-neutral-500 dark:text-neutral-400'>
                    Questions are at the heart of making things great.
                  </span>
                </div>
                <div className='w-14 border-b border-neutral-200 dark:border-neutral-700'></div>
                {/* 6 */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 '>
                  {/* TIEN ICH 1 */}
                  {Amenities_demos.map((item, index) => (
                    <div key={index} className='flex items-center space-x-4 '>
                      <div className='w-10 flex-shrink-0'>
                        <img src={item.icon} alt='' />
                      </div>
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='listingSection__wrap bg-white'>
                <div>
                  <h2 className='text-2xl font-semibold'>Visa requirements </h2>
                  <span className='block mt-2 text-neutral-500 dark:text-neutral-400'>
                    Questions are at the heart of making things great.
                  </span>
                </div>
                <div className='w-14 border-b border-neutral-200 dark:border-neutral-700'></div>
                {/* 6 */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 '>
                  {/* TIEN ICH 1 */}
                  {Amenities_demos.map((item, index) => (
                    <div key={index} className='flex items-center space-x-4 '>
                      <div className='w-10 flex-shrink-0'>
                        <img src={item.icon} alt='' />
                      </div>
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='listingSection__wrap bg-white'>
                <div>
                  <h2 className='text-2xl font-semibold'>
                    Forms and documents{" "}
                  </h2>
                  <span className='block mt-2 text-neutral-500 dark:text-neutral-400'>
                    Questions are at the heart of making things great.
                  </span>
                </div>
                <div className='w-14 border-b border-neutral-200 dark:border-neutral-700'></div>
                {/* 6 */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 '>
                  {/* TIEN ICH 1 */}
                  {Amenities_demos.map((item, index) => (
                    <div key={index} className='flex items-center space-x-4 '>
                      <div className='w-10 flex-shrink-0'>
                        <img src={item.icon} alt='' />
                      </div>
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* <div className='pt-4'>
                <ButtonPrimary>Confirm and pay</ButtonPrimary>
              </div> */}
            </Tab.Panel>
            <Tab.Panel className='space-y-5'>
              <div className='listingSection__wrap bg-white'>
                <div>
                  <h2 className='text-2xl font-semibold'>
                    Forms and documents{" "}
                  </h2>
                  <span className='block mt-2 text-neutral-500 dark:text-neutral-400'>
                    Questions are at the heart of making things great.
                  </span>
                </div>
                <div className='w-14 border-b border-neutral-200 dark:border-neutral-700'></div>
                {/* 6 */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 '>
                  {/* TIEN ICH 1 */}
                  {Amenities_demos.map((item, index) => (
                    <div key={index} className='flex items-center space-x-4 '>
                      <div className='w-10 flex-shrink-0'>
                        <img src={item.icon} alt='' />
                      </div>
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* <div className='pt-4'>
                <ButtonPrimary>Confirm and pay</ButtonPrimary>
              </div> */}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default SectionHowItWork;
