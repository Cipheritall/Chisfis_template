import { Tab } from "@headlessui/react";
import { PencilAltIcon } from "@heroicons/react/outline";
import React, { FC, Fragment } from "react";
import visaPng from "images/vis.png";
import mastercardPng from "images/mastercard.svg";
import Input from "shared/Input/Input";
import Label from "components/Label/Label";
import Textarea from "shared/Textarea/Textarea";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import StartRating from "components/StartRating/StartRating";
import NcModal from "shared/NcModal/NcModal";
import Select from "shared/Select/Select";
import FormItem from "./FormItem";
import { Link } from "react-router-dom";
import Heading2 from "components/Heading/Heading2";


export interface CheckOutPageProps {
    className?: string;
}

const CheckOutPage: FC<CheckOutPageProps> = ({ className = "" }) => {
    const renderSidebar = () => {
        return (
            <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center">

                    <div className="py-5  space-y-3">
                        <div>
                        <h3 className="text-2xl font-semibold">Day 5 Test to Release</h3>
                        <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                            DAM Health
                            </span>
                            <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                            Liverpool Location 
                            </span>
                          
                        </div>
                        <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
                            2 Members
                        </span>
                        <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>

                    </div>
                </div>
                <div className="flex flex-col space-y-4">
                    <h3 className="text-2xl font-semibold">Price detail</h3>
                    <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                        <span>19 x 2 members</span>
                        <span>38</span>
                    </div>
                    <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                        <span>Service charge</span>
                        <span>5</span>
                    </div>

                    <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
                    <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>38</span>
                    </div>
                </div>
                <div className="pt-4">
                        <ButtonPrimary>Confirm and pay</ButtonPrimary>
                    </div>
            </div>
        );
    };

    const renderMain = () => {
        return (
            <>
             <Heading2
        heading='Which test do you need?'
        subHeading={
          <span className='block text-neutral-500 dark:text-neutral-400 mt-3'>
             Lets help you choose your test

          </span>
        }
      />
            <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
              
                <div className="space-y-8">
          {/* ITEM */}
          <FormItem
            label="Select the region you will be taking your test in"
            desc="Please select the country or region that you will be taking the test in, so that we can offer you the right services"
          >
            <Select>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States">United States</option>
              <option value="Mexico">Mexico</option>
              <option value="Spain">Spain</option>
              <option value="Portugal">Portugal</option>
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="France">France</option>
            </Select>
          </FormItem>
          <FormItem
            label="Arriving or Departing"
            desc="Are you going way, coming home or already back home?"
          >
            <Select>
              <option value="Hotel">Departing (Pre-departure)</option>
              <option value="Private room">Returning (Pre-Return)</option>
              <option value="Private room">Already Arrived (After-Return)</option>
            </Select>
          </FormItem>
          <FormItem
            label="Vaccination Status"
            desc="Please tell us about your vaccination status"
          >
            <Select>
              <option value="Hotel">Not Vaccinated</option>
              <option value="Private room">1 Dose</option>
              <option value="Private room">Fully Vaccinated</option>
            </Select>
          </FormItem>
          <FormItem
            label="Resident or Visitor"
            desc="Where you a resident of the region or are you visiting?"
          >
            <Select>
              <option value="Resident">Resident</option>
              <option value="Visitor">Visitor</option>
            </Select>
          </FormItem>
          <FormItem
            label="Center or Self-test"
            desc="Where will you be taking the test?"
          >
            <Select>
              <option value="Self-test">Self-test</option>
              <option value="Center">At a Test Center</option>
            </Select>
          </FormItem>
       
          <FormItem
            label="Test Type"
            desc="We offer the full range of tests to depart out of as well as return from the region"
          >
            <Select>
              <option value="Day 2">Day 2</option>
              <option value="Day 8">Day 8</option>
              <option value="PCR">PCR</option>
              <option value="Antigen">Antigen</option>
              <option value="LAMP">LAMP</option>
              <option value="Antibody">Antibody</option>
            </Select>
          </FormItem>
          <FormItem
            label="Service Type"
            desc="How fast do you want the results?"
          >
            <Select>
              <option value="Same Day">Same Day (Results by mid-night same day)</option>
              <option value="Next Day">Next Day (Results by mid-night next day)</option>
              <option value="Express">Express (Results in 1-3 hrs)</option>
              <option value="Hour">In an hour (Results in 60 mins)</option>

            </Select>
          </FormItem>
       
        
        </div>
        <div className="pt-4">
        <Link to="/test-centers">
        {/* {renderSliderGallery()} */}
        <ButtonPrimary>Continue</ButtonPrimary>
      </Link>
                       
                    </div>
            </div>
            </>
        );
    };

    return (
        <div className={`nc-CheckOutPage ${className}`} data-nc-id="CheckOutPage">
            <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
                <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
            </main>
        </div>
    );
};

export default CheckOutPage;
