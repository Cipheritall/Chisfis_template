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

import styled from "styled-components";

import swal from "sweetalert2/dist/sweetalert2.all.min.js";

import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { CLIENT_RENEG_LIMIT } from "tls";
import { useHistory } from "react-router";
import { resourceLimits } from "worker_threads";
import { db } from "firebase";
import { addDoc, collection } from "firebase/firestore";

export interface CheckOutPageProps {
  className?: string;
}

const CheckOutPage: FC<CheckOutPageProps> = ({ className = "" }) => {
  const history = useHistory();

  const stripePromise = loadStripe(
    "pk_test_51Jn1M5D6QVbbUe2SEWO6S72rZ4cRrOABtPgcrmpirR8Wd5osZLq4oPKwgMW2QlqcgVeNk1a8ibU7VRlT9paIIQJD00Hgscl9lW"
  );

  const renderSidebar = () => {
    return (
      <div className='w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8'>
        <div className='flex flex-col sm:flex-row sm:items-center'>
          <div className='flex-shrink-0 w-full sm:w-40'>
            <div className=' aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden'>
              <NcImage src='https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' />
            </div>
          </div>
          <div className='py-5 sm:px-5 space-y-3'>
            <div>
              <span className='text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1'>
                Hotel room in Tokyo, Jappan
              </span>
              <span className='text-base font-medium mt-1 block'>
                The Lounge & Bar
              </span>
            </div>
            <span className='block  text-sm text-neutral-500 dark:text-neutral-400'>
              2 beds · 2 baths
            </span>
            <div className='w-10 border-b border-neutral-200  dark:border-neutral-700'></div>
            <StartRating />
          </div>
        </div>
        <div className='flex flex-col space-y-4'>
          <h3 className='text-2xl font-semibold'>Price detail</h3>
          <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
            <span>$19 x 3 day</span>
            <span>$57</span>
          </div>
          <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
            <span>Service charge</span>
            <span>$0</span>
          </div>

          <div className='border-b border-neutral-200 dark:border-neutral-700'></div>
          <div className='flex justify-between font-semibold'>
            <span>Total</span>
            <span>$57</span>
          </div>
        </div>
      </div>
    );
  };

  const handleSubmit = (stripe, elements) => async () => {
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      // ... SEND to your API server to process payment intent
    }
  };

  const PaymentForm = () => {
    // const stripe = useStripe();
    // const elements = useElements();
    // return (
    //   <>
    //     <h1>stripe form</h1>
    //     <CardElement options={CARD_ELEMENT_OPTIONS} />
    //     <button onClick={handleSubmit(stripe, elements)}>Buy</button>
    //   </>
    // );

    const history = useHistory();

    const elements = useElements();
    const stripe = useStripe();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState();

    const handleChange = (event) => {
      setDisabled(event.empty);
      setError(event.error ? event.error.message : "");
    };

    // useEffect(() => {
    //   const getClientSecret = async () => {
    //     const amount = 10000; //harcode
    //     const response = await axios({
    //       method: "post",
    //       url:
    //         "http://localhost:5001/testandtrip/us-central1/api/payments/create?total=" +
    //         amount,
    //     });

    //     setClientSecret(response.data.clientSecret);
    //   };

    //   getClientSecret();
    // }, []);

    const formSubmit = async (event) => {
      event.preventDefault();

      const cardElement = elements.getElement(CardElement);
      console.log(cardElement, "hjfdhjdfhj");

      swal
        .fire({
          title: "Are you sure?",
          text: "You want to pay now!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, pay now!",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              setProcessing(true);

              const amount = 10000; //harcode
              const response = await axios({
                method: "post",
                url:
                  "http://localhost:5001/testandtrip/us-central1/api/payments/create?total=" +
                  amount,
              });

              console.log(response);

              let formData;
              if (history.location.state) {
                // console.clear();
                // console.log(history.location.state.formData, "dfkjdkf");
                formData = history.location.state.formData;
              }
              const billingDetails = {
                name: formData.first_name + " " + formData.last_name,
                email: formData.email,
                address: {
                  city: formData.city,
                  line1: formData.address,
                  state: formData.state,
                  postal_code: formData.postal_code,
                },
              };

              if (response.status === 201) {
                const payload = await stripe
                  .confirmCardPayment(response.data.clientSecret, {
                    payment_method: {
                      type: "card",
                      card: elements.getElement(CardElement),
                      billing_details: billingDetails,
                    },
                  })
                  .then(
                    (result) => {
                      if (result.error) {
                        console.log(result, "res");
                        swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: result.error.message,
                        });
                        setSucceeded(true);
                        setError(null);
                        setProcessing(false);
                      }
                      if (result.paymentIntent) {
                        console.log(result, "dfkjkfdjkjfd");
                        formData["payment_id"] = result.paymentIntent.id;
                        formData["amount"] = result.paymentIntent.amount;
                        sendToFirebase(formData);
                        setSucceeded(true);
                        setError(null);
                        setProcessing(false);
                        swal.fire(
                          "Completed!",
                          "Payment Successful",
                          "success"
                        );
                      }

                      // history.replace("/payment/success");
                    },
                    function (error) {
                      console.log("error");
                      swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong",
                      });
                      setSucceeded(true);
                      setError(null);
                      setProcessing(false);
                    }
                  );
              } else if (response.status > 399 && response.status < 599) {
                swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: response["errorMessage"],
                });
                // setError(response["errorMessage"]);
              }

              setClientSecret(response.data.clientSecret);
            } catch {
              swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong",
              });
            }
          }
        });
    };

    const sendToFirebase = async (formData) => {
      const docRef = await addDoc(collection(db, "customerPayments"), {
        formData: formData,
      });
      console.log("Document written with ID: ", docRef.id);
    };
    const CARD_ELEMENT_OPTIONS = {
      hidePostalCode: true,
      style: {
        base: {
          border: "2px",
          iconColor: "blue",
          color: "#000",
          fontWeight: "500",
          fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
          fontSize: "16px",
          fontSmoothing: "antialiased",
          ":-webkit-autofill": {
            color: "#fce883",
          },
        },
        invalid: {
          iconColor: "#FFC7EE",
          color: "#FFC7EE",
        },
      },
    };

    return (
      <>
        <form onSubmit={formSubmit}>
          <div className='space-y-1'>
            <Label>Card holder </Label>
            <Input defaultValue='JOHN DOE' />
          </div>

          <div className='space-y-1'>
            <Label>Card number </Label>

            <CardElement
              id='card-element'
              onChange={handleChange}
              options={CARD_ELEMENT_OPTIONS}
            />
          </div>

          {/* <div>Price : 1000</div> */}
          <div className='pt-4'>
            <ButtonPrimary
              type='submit'
              disabled={error || processing}
              // disabled={error || processing || disabled || succeeded}
            >
              <span>{processing ? <p>Processing</p> : "Pay Now"}</span>
            </ButtonPrimary>
          </div>
        </form>
        {error && <div className='error-red'>{error}</div>}
      </>
    );
  };

  const renderMain = () => {
    return (
      <div className='w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8'>
        <h2 className='text-3xl lg:text-4xl font-semibold'>
          Confirm and payment
        </h2>
        <div className='border-b border-neutral-200 dark:border-neutral-700'></div>
        <div>
          <div>
            <h3 className='text-2xl font-semibold'>Your trip</h3>
            <NcModal
              renderTrigger={(openModal) => (
                <span
                  onClick={() => openModal()}
                  className='block lg:hidden underline  mt-1 cursor-pointer'>
                  View booking details
                </span>
              )}
              renderContent={renderSidebar}
            />
          </div>
          <div className='mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700'>
            <div className='flex-1 p-5 flex justify-between space-x-5'>
              <div className='flex flex-col'>
                <span className='text-sm text-neutral-400'>Date</span>
                <span className='mt-1.5 text-lg font-semibold'>
                  Aug 12 - 16, 2021
                </span>
              </div>
              <PencilAltIcon className='w-6 h-6 text-neutral-300 dark:text-neutral-6000' />
            </div>
            <div className='flex-1 p-5 flex justify-between space-x-5'>
              <div className='flex flex-col'>
                <span className='text-sm text-neutral-400'>Guests</span>
                <span className='mt-1.5 text-lg font-semibold'>3 Guests</span>
              </div>
              <PencilAltIcon className='w-6 h-6 text-neutral-300 dark:text-neutral-6000' />
            </div>
          </div>
        </div>

        <div>
          <h3 className='text-2xl font-semibold'>Pay with</h3>
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
                      Paypal
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
                      <span className='mr-2.5'>Credit card</span>
                      {/* <img className='w-8' src={visaPng} alt='' /> */}
                      {/* <img className='w-8' src={mastercardPng} alt='' /> */}
                    </button>
                  )}
                </Tab>
              </Tab.List>

              <div className='w-14 border-b border-neutral-200 my-5'></div>
              <Tab.Panels>
                <Tab.Panel className='space-y-5'>
                  <div className='space-y-1'>
                    <Label>Card number </Label>
                    <Input defaultValue='111 112 222 999' />
                  </div>
                  <div className='space-y-1'>
                    <Label>Card holder </Label>
                    <Input defaultValue='JOHN DOE' />
                  </div>
                  <div className='flex space-x-5  '>
                    <div className='flex-1 space-y-1'>
                      <Label>Expiration date </Label>
                      <Input type='date' defaultValue='MM/YY' />
                    </div>
                    <div className='flex-1 space-y-1'>
                      <Label>CVC </Label>
                      <Input />
                    </div>
                  </div>

                  <div className='pt-4'>
                    <ButtonPrimary>Confirm and pay</ButtonPrimary>
                  </div>
                </Tab.Panel>
                {/* <Tab.Panel className='space-y-5'>
                  <div className='space-y-1'>
                    <Label>Email </Label>
                    <Input type='email' defaultValue='example@gmail.com' />
                  </div>
                  <div className='space-y-1'>
                    <Label>Password </Label>
                    <Input type='password' defaultValue='***' />
                  </div>
                  <div className='space-y-1'>
                    <Label>Messager for author </Label>
                    <Textarea placeholder='...' />
                    <span className='text-sm text-neutral-500 block'>
                      Write a few sentences about yourself.
                    </span>
                  </div>
                  <div className='pt-4'>
                    <ButtonPrimary>Confirm and pay</ButtonPrimary>
                  </div>
                </Tab.Panel> */}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-CheckOutPage ${className}`} data-nc-id='CheckOutPage'>
      <main className='container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row'>
        <div className='w-full lg:w-3/5 xl:w-2/3 lg:pr-10 '>
          <div className='w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8'>
            <h2 className='text-3xl lg:text-4xl font-semibold'>
              Confirm and payment
            </h2>
            <div className='border-b border-neutral-200 dark:border-neutral-700'></div>
            <div>
              <div>
                <h3 className='text-2xl font-semibold'>Your trip</h3>
                <NcModal
                  renderTrigger={(openModal) => (
                    <span
                      onClick={() => openModal()}
                      className='block lg:hidden underline  mt-1 cursor-pointer'>
                      View booking details
                    </span>
                  )}
                  renderContent={renderSidebar}
                />
              </div>
              <div className='mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700'>
                <div className='flex-1 p-5 flex justify-between space-x-5'>
                  <div className='flex flex-col'>
                    <span className='text-sm text-neutral-400'>Date</span>
                    <span className='mt-1.5 text-lg font-semibold'>
                      Aug 12 - 16, 2021
                    </span>
                  </div>
                  <PencilAltIcon className='w-6 h-6 text-neutral-300 dark:text-neutral-6000' />
                </div>
                <div className='flex-1 p-5 flex justify-between space-x-5'>
                  <div className='flex flex-col'>
                    <span className='text-sm text-neutral-400'>Guests</span>
                    <span className='mt-1.5 text-lg font-semibold'>
                      3 Guests
                    </span>
                  </div>
                  <PencilAltIcon className='w-6 h-6 text-neutral-300 dark:text-neutral-6000' />
                </div>
              </div>
            </div>
            <Elements stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          </div>
        </div>
        <div className='hidden lg:block flex-grow'>{renderSidebar()}</div>
      </main>
    </div>
  );
};

export default CheckOutPage;
