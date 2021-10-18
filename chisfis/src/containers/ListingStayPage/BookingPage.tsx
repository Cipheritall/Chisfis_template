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
            <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
                <h2 className="text-2xl lg:text-2xl ">
                    Book your test
                </h2>
                <div className="border-b border-neutral-200 dark:border-neutral-700"></div>


                <div>


                    <div className="space-y-2">
                        <div className="flex space-x-5  ">
                            <div className="flex-1 space-y-1">
                                <Label>Appointment date </Label>
                                <Input type="date" defaultValue="MM/YY" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <Label>Time Slot </Label>
                                <Input />
                            </div>
                            <div className="flex-1 space-y-1">
                                <Label>No of people </Label>
                                <Input />
                            </div>
                        </div>
                      
                    </div>
                    <div className="space-y-2">
                        <div className="flex space-x-5  ">
                            <div className="flex-1 space-y-1">
                                <Label>First Name </Label>
                                <Input />
                            </div>
                            <div className="flex-1 space-y-1">
                                <Label>Last Name </Label>
                                <Input />
                            </div>
                        </div>
                      
                    </div>
                    <div className="space-y-2">
                        <div className="flex space-x-5  ">
                            <div className="flex-1 space-y-1">
                                <Label>Email</Label>
                                <Input />
                            </div>
                            <div className="flex-1 space-y-1">
                                <Label>Mobile </Label>
                                <Input />
                            </div>
                        </div>
                      
                    </div>
                    <div className="space-y-2">
                        <div className="flex space-x-5  ">
                            <div className="flex-1 space-y-1">
                                <Label>Date of Birth </Label>
                                <Input type="date" defaultValue="MM/YY" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <Label>Passport/Id No </Label>
                                <Input />
                            </div>
                        </div>
                      
                    </div>
                    <div className="space-y-2">
                        <div className="flex space-x-5  ">
                            <div className="flex-1 space-y-1">
                                <Label>Sex </Label>
                                <Input />
                            </div>
                            <div className="flex-1 space-y-1">
                                <Label>Ethnicity </Label>
                                <Input />
                            </div>
                        </div>
                      
                    </div>
                    <div className="space-y-2">
                        <Label>Street Address </Label>
                        <Input />
                    </div>
                    <div className="space-y-2">
                        <div className="flex space-x-5  ">
                            <div className="flex-1 space-y-1">
                                <Label>City </Label>
                                <Input />
                            </div>
                            <div className="flex-1 space-y-1">
                                <Label>Country </Label>
                                <Input />
                            </div>
                            <div className="flex-1 space-y-1">
                                <Label>Postal Code </Label>
                                <Input />
                            </div>
                        </div>
                      
                    </div>


                    <div className="space-y-2">
                        <Label>Any notes for test provider</Label>
                        <Textarea placeholder="..." />
                        <span className="text-sm text-neutral-500 block">
                            Please provide any message that you want to sent to test provider
                        </span>
                    </div>
                    <div className="pt-4">
                        <ButtonPrimary>Confirm and pay</ButtonPrimary>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={`nc-CheckOutPage ${className}`} data-nc-id="CheckOutPage">
            <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
                <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
                <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
            </main>
        </div>
    );
};

export default CheckOutPage;
