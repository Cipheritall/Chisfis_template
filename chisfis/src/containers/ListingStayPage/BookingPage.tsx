import { Tab } from "@headlessui/react";
import { PencilAltIcon } from "@heroicons/react/outline";
import React, { FC, Fragment, useEffect, useState } from "react";
import visaPng from "images/vis.png";
import mastercardPng from "images/mastercard.svg";
import Input from "shared/Input/Input";
import Label from "components/Label/Label";
import Textarea from "shared/Textarea/Textarea";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import StartRating from "components/StartRating/StartRating";
import NcModal from "shared/NcModal/NcModal";
import { useHistory } from "react-router";
import moment from "moment";

export interface CheckOutPageProps {
  className?: string;
}

const CheckOutPage: FC<CheckOutPageProps> = ({ className = "" }) => {
  const renderSidebar = () => {
    return (
      <div className='w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8'>
        <div className='flex flex-col sm:flex-row sm:items-center'>
          <div className='py-5  space-y-3'>
            <div>
              <h3 className='text-2xl font-semibold'>Day 5 Test to Release</h3>
              <span className='text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1'>
                {testCentreBook.testCentreName}
              </span>
              <span className='text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1'>
                {testCentreBook.location}
              </span>
            </div>
            <span className='block  text-sm text-neutral-500 dark:text-neutral-400'>
              {numberOfPeople} Members
            </span>
            <div className='w-10 border-b border-neutral-200  dark:border-neutral-700'></div>
          </div>
        </div>
        <div className='flex flex-col space-y-4'>
          <h3 className='text-2xl font-semibold'>Price detail</h3>
          <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
            <span>
              {testCentreBook.price} x {numberOfPeople} members
            </span>
            <span>{parseInt(testCentreBook.price) * numberOfPeople} $</span>
          </div>
          <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
            <span>Service charge</span>
            <span>15$</span>
          </div>

          <div className='border-b border-neutral-200 dark:border-neutral-700'></div>
          <div className='flex justify-between font-semibold'>
            <span>Total</span>
            <span>
              {parseInt(testCentreBook.price) * numberOfPeople + 15} $
            </span>
          </div>
        </div>
        {/* <div className='pt-4'>
          <ButtonPrimary>Confirm and pay</ButtonPrimary>
        </div> */}
      </div>
    );
  };

  const history = useHistory();

  const [genderType, setGenderType] = useState(null);
  const genderTypeOptions = ["Male", "Female"];

  const formSubmit = (event) => {
    event.preventDefault();
    console.log(event);

    const formData = {
      time_slot: event.target.time_slot.value,
      appointment_date: event.target.appointment_date.value,
      no_of_people: event.target.no_of_people.value,
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      email: event.target.email.value,
      mobile_number: event.target.mobile_number.value,
      dob: event.target.dob.value,
      passport_no: event.target.passport_no.value,
      sex: genderType,
      ethnicity: event.target.ethnicity.value,
      address: event.target.address.value,
      city: event.target.city.value,
      country: event.target.country.value,
      postal_code: event.target.postal_code.value,
      notes: event.target.notes.value,
      price: parseInt(testCentreBook.price),
      numberOfPeople: numberOfPeople,
      testCentreName: testCentreBook.testCentreName,
      location: testCentreBook.location,
      serviceCharge: 15,
    };

    history.push({
      pathname: "/checkout",
      state: { billingDet: formData },
    });
  };

  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const handleNoOfPeople = (e) => {
    let e2 = e.replace(/[^\d]/, "");
    setNumberOfPeople(e2);
  };

  const [testCentreBook, setTestCentre] = useState({
    testCentreName: "",
    location: "",
    price: "",
  });
  useEffect(() => {
    const loadPageData = () => {
      let fd;
      if (history.location.state) {
        // console.clear();
        // console.log(history.location.state.testCentre, "dfkjdkf");
        fd = history.location.state;
        setTestCentre(fd.testCentre);
      }
    };

    loadPageData();
  }, []);

  const [dob, setDob] = useState("");
  const handleDob = (e) => {
    setDob(e);
    let dtToday = new Date();

    let month = (dtToday.getMonth() + 1).toString();
    let day = dtToday.getDate().toString();
    let year = dtToday.getFullYear();

    if (parseInt(month) < 10) {
      month = "0" + month.toString();
    }
    if (parseInt(day) < 10) {
      day = "0" + day.toString();
    }

    var maxDate = year + "-" + month + "-" + day;
    console.log(
      "🚀 ~ file: BookingPage.tsx ~ line 148 ~ handleDob ~ maxDate",
      maxDate
    );
    setDob(maxDate);
  };

  const renderMain = () => {
    return (
      <div className='w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8'>
        <h2 className='text-2xl lg:text-2xl '>Book your test</h2>
        <div className='border-b border-neutral-200 dark:border-neutral-700'></div>

        <div>
          <form onSubmit={formSubmit}>
            <div className='space-y-2'>
              <div className='flex space-x-5  '>
                <div className='flex-1 space-y-1'>
                  <Label>Appointment date </Label>
                  <Input
                    type='date'
                    defaultValue='MM/YY'
                    name='appointment_date'
                    min={moment(new Date()).format("YYYY-MM-DD")}
                    required={true}
                  />
                </div>
                <div className='flex-1 space-y-1'>
                  <Label>Time Slot </Label>
                  <Input required={true} name='time_slot' />
                </div>
                <div className='flex-1 space-y-1'>
                  <Label>No of people </Label>
                  <Input
                    name='no_of_people'
                    type='number'
                    required={true}
                    onChange={(e) => handleNoOfPeople(e.currentTarget.value)}
                    value={numberOfPeople}
                    min={1}
                  />
                </div>
              </div>
            </div>
            <div className='space-y-2'>
              <div className='flex space-x-5  '>
                <div className='flex-1 space-y-1'>
                  <Label>First Name </Label>
                  <Input name='first_name' required={true} />
                </div>
                <div className='flex-1 space-y-1'>
                  <Label>Last Name </Label>
                  <Input name='last_name' required={true} />
                </div>
              </div>
            </div>
            <div className='space-y-2'>
              <div className='flex space-x-5  '>
                <div className='flex-1 space-y-1'>
                  <Label>Email</Label>
                  <Input name='email' required={true} />
                </div>
                <div className='flex-1 space-y-1'>
                  <Label>Mobile </Label>
                  <Input name='mobile_number' type='number' required={true} />
                </div>
              </div>
            </div>
            <div className='space-y-2'>
              <div className='flex space-x-5  '>
                <div className='flex-1 space-y-1'>
                  <Label>Date of Birth </Label>
                  <Input
                    type='date'
                    defaultValue='MM/YY'
                    name='dob'
                    // max='2014-05-15'
                    max={moment(new Date()).format("YYYY-MM-DD")}
                    // value={dob}
                    // onChange={(e) => handleDob(e.currentTarget.value)}
                    required={true}
                  />
                </div>
                <div className='flex-1 space-y-1'>
                  <Label>Passport/Id No </Label>
                  <Input name='passport_no' required={true} />
                </div>
              </div>
            </div>
            <div className='space-y-2'>
              <div className='flex space-x-5  '>
                <div className='flex-1 space-y-1'>
                  <Label>Sex </Label>
                  {/* <Input name='sex' required={true} /> */}

                  <select
                    value={genderType}
                    onChange={(e) => setGenderType(e.target.value)}
                    className={`nc-Select h-11 block w-full text-sm rounded-2xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900`}>
                    {genderTypeOptions.map((gender) => (
                      <option value={gender}>{gender}</option>
                    ))}
                  </select>
                </div>
                <div className='flex-1 space-y-1'>
                  <Label>Ethnicity </Label>
                  <Input name='ethnicity' required={true} />
                </div>
              </div>
            </div>
            <div className='space-y-2'>
              <Label>Street Address </Label>
              <Input name='address' required={true} />
            </div>
            <div className='space-y-2'>
              <div className='flex space-x-5  '>
                <div className='flex-1 space-y-1'>
                  <Label>City </Label>
                  <Input name='city' required={true} />
                </div>
                <div className='flex-1 space-y-1'>
                  <Label>Country </Label>
                  <Input name='country' required={true} />
                </div>
                <div className='flex-1 space-y-1'>
                  <Label>Postal Code </Label>
                  <Input name='postal_code' required={true} />
                </div>
              </div>
            </div>

            <div className='space-y-2'>
              <Label>Any notes for test provider</Label>
              <Textarea placeholder='...' name='notes' />
              <span className='text-sm text-neutral-500 block'>
                Please provide any message that you want to sent to test
                provider
              </span>
            </div>
            <div className='pt-4'>
              <ButtonPrimary>Confirm and pay</ButtonPrimary>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-CheckOutPage ${className}`} data-nc-id='CheckOutPage'>
      <main className='container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row'>
        <div className='w-full lg:w-3/5 xl:w-2/3 lg:pr-10 '>{renderMain()}</div>
        <div className='hidden lg:block flex-grow'>{renderSidebar()}</div>
      </main>
    </div>
  );
};

export default CheckOutPage;
