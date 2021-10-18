import React, { FC } from "react";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";

export interface PageAddListing1Props {}

const PageAddListing1: FC<PageAddListing1Props> = () => {
  return (
    <CommonLayout
      index="01"
      header="Choose your service"
      backtHref="/add-booking-1"
      nextHref="/test-centers"
    >
      <>
        <h2 className="text-2xl font-semibold">Which test do you need?</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
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
      </>
    </CommonLayout>
  );
};

export default PageAddListing1;
