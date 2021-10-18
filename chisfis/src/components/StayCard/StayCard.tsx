import React, { FC } from "react";
import GallerySlider from "components/GallerySlider/GallerySlider";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import StartRating from "components/StartRating/StartRating";
import { Link } from "react-router-dom";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import Badge from "shared/Badge/Badge";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Button from "shared/Button/Button";
import ButtonThird from "shared/Button/ButtonThird";
import { ClockIcon } from "@heroicons/react/solid";
import provider_logo from "images/collinson.png";


export interface StayCardProps {
  className?: string;
  ratioClass?: string;
  data?: StayDataType;
  size?: "default" | "small";
}

const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const StayCard: FC<StayCardProps> = ({
  size = "default",
  className = "",
  data = DEMO_DATA,
  ratioClass,
}) => {
  const {
    galleryImgs,
    listingCategory,
    address,
    title,
    bedrooms,
    href,
    like,
    saleOff,
    isAds,
    price,
    reviewStart,
    reviewCount,
  } = data;

  const renderSliderGallery = () => {
    return (
      <div className='relative w-full'>
        {/* <GallerySlider ratioClass={ratioClass} galleryImgs={galleryImgs} /> */}
        {/* <BtnLikeIcon isLiked={like} className='absolute right-3 top-3' /> */}
        {/* {saleOff && <SaleOffBadge className='absolute left-3 top-3' />} */}
      </div>
    );
  };

  const includes_demo = [
    { name: "Pre-departure testing" },
    { name: "Test to release" },
    { name: "Mandatory arrivals testing" },
    { name: "Free parking on site" }
  ];

  const renderContent = () => {
    return (
      <div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-2"}>
        <div className='space-y-2'>

          <span className='text-sm text-neutral-500 dark:text-neutral-400'>
            {/* {listingCategory.name} · {bedrooms} beds */}
          </span>
          <div className='flex items-center space-x-2'>
            {/* {isAds && <Badge name='ADS' color='green' />} */}
            <h2
              className={` font-medium capitalize ${
                size === "default" ? "text-lg" : "text-base"
              }`}>
              <span className='line-clamp-1'>{title}</span>
            </h2>
          </div>
          <div className='flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2'>
            {/* {size === "default" && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
            )} */}
            <span className=''>{address}</span>
          </div>
        </div>
        <div className='w-14 border-b border-neutral-100 dark:border-neutral-800'></div>
        <div
          className='listingSection__wrap'
          style={{ border: "0px", margin: "0px", padding: "0px" }}>
          <div className='w-14'></div>
          <div className='grid gap-3 text-sm text-neutral-700 dark:text-neutral-300 '>
            {includes_demo
              .filter((_, i) => i < 12)
              .map((item) => (
                <div key={item.name} className='flex items-center space-x-3'>
                  <i className='las la-check-circle text-2xl'></i>
                  <span>{item.name}</span>
                </div>
              ))}
          </div>
        </div>


        <div className='flex justify-between items-center pt-3'>
          <span className='text-base font-semibold'>
            {/* {price}
            {` `}
            {size === "default" && (
              <span className='text-sm text-neutral-500 dark:text-neutral-400 font-normal'>
                /night
              </span>
            )} */}
            <div className='flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2'>
              <span className='text-sm text-neutral-500 dark:text-neutral-400 font-normal'>
                {size === "default" && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1.5}
                      d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1.5}
                      d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                )}
              </span>

              <span className='text-sm text-neutral-500 dark:text-neutral-400 font-normal'>
                Open in Maps
              </span>
            </div>
          </span>
          {/* {!!reviewStart && (
            <StartRating reviewCount={reviewCount} point={reviewStart} />
          )} */}

          <div
            className={`nc-StartRating flex items-center space-x-1 text-sm  ${className}`}
            data-nc-id='StartRating'>
            <ClockIcon className='w-5 h-5 text-gray-500' />
            <span className='text-neutral-500 dark:text-neutral-400'>
              07.00 - 19.00
            </span>
          </div>
        </div>

        <div className='flex justify-between items-center pt-3'>
         
          <ButtonThird
            className='ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50'
            sizeClass='px-4 py-2 sm:px-5'>
            Book Now
          </ButtonThird>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
      data-nc-id='StayCard'>
      <Link to="/booking-page">
        {/* {renderSliderGallery()} */}
        {renderContent()}
      </Link>
    </div>
  );
};

export default StayCard;
