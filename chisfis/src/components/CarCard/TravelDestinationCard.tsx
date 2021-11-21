import React, { FC, useEffect, useState } from "react";
import { DEMO_CAR_LISTINGS } from "data/listings";
import { CarDataType } from "data/types";
import StartRating from "components/StartRating/StartRating";
import { Link } from "react-router-dom";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import Badge from "shared/Badge/Badge";
import NcImage from "shared/NcImage/NcImage";
import Heading2 from "components/Heading/Heading2";
import TabFilters from "containers/ListingStayPage/TabFilters";
import Pagination from "shared/Pagination/Pagination";
import CarCard from "./CarCard";
import { query, collection, getDocs } from "@firebase/firestore";
import { db } from "firebase";

interface pageDataType {
  id: string | number;
  href: string;
  title: string;
  featuredImage: string;
  desc: string;
  testingWindow: string;
}
// interface pageDataType extends Array<pageDataType> {}

export interface CarCardProps {
  className?: string;
  data?: pageDataType[];
  size?: "default" | "small";
}

// const DEMO_DATA: CarDataType = DEMO_CAR_LISTINGS[0];

const pageData: Array<pageDataType> = [
  {
    id: "9824dd51-14bc-4a05-ba7d-1ca3c3c08bd7",
    title: "Norway",
    href: "/travel-destination-detail",
    desc: "UK travellers to Norway must quarantine in a hotel and present a negative pre-departure test. Domestic restrictions are gradually being lifted.",
    testingWindow: "24 hours",
    featuredImage:
      "https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "9824dd51-14bc-4a05-ba7d-1ca3c3c08bd7",
    href: "/travel-destination-detail",
    title: "France",
    desc: "UK travellers to Norway must quarantine in a hotel and present a negative pre-departure test. Domestic restrictions are gradually being lifted.",
    testingWindow: "24 hours",
    featuredImage:
      "https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "9824dd51-14bc-4a05-ba7d-1ca3c3c08bd7",
    href: "/travel-destination-detail",
    title: "Paris",
    desc: "UK travellers to Norway must quarantine in a hotel and present a negative pre-departure test. Domestic restrictions are gradually being lifted.",
    testingWindow: "24 hours",
    featuredImage:
      "https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "9824dd51-14bc-4a05-ba7d-1ca3c3c08bd7",
    href: "/travel-destination-detail",
    title: "Singapore",
    desc: "UK travellers to Norway must quarantine in a hotel and present a negative pre-departure test. Domestic restrictions are gradually being lifted.",
    testingWindow: "24 hours",
    featuredImage:
      "https://images.pexels.com/photos/4151484/pexels-photo-4151484.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
];
const TravelDestinationCard: FC<CarCardProps> = ({
  size = "default",
  className = "",
  data = pageData,
}) => {
  //   const renderSliderGallery = () => {
  //     return (
  //       <div className='relative w-full rounded-2xl overflow-hidden'>
  //         <div className='aspect-w-16 aspect-h-9 '>
  //           <NcImage
  //             containerClassName='flex items-center justify-center'
  //             className='w-full'
  //             src={featuredImage}
  //           />
  //         </div>
  //         {/* <BtnLikeIcon isLiked={like} className='absolute right-3 top-3' /> */}
  //         {/* {saleOff && <SaleOffBadge className="absolute left-3 top-3" />} */}
  //         {/* {<SaleOffBadge className='absolute left-3 top-3' />} */}
  //       </div>
  //     );
  //   };

  //   const renderContent = () => {
  //     return (
  //       <div className={size === "default" ? "p-5  space-y-4" : "p-3  space-y-2"}>
  //         <div className='space-y-2'>
  //           <div className='flex items-center space-x-2'>
  //             {<Badge name='Open' color='green' />}
  //             <h2
  //               className={`  capitalize ${
  //                 size === "default"
  //                   ? "text-xl font-semibold"
  //                   : "text-base font-medium"
  //               }`}>
  //               <span className='line-clamp-1'>{title}</span>
  //             </h2>
  //           </div>
  //           <div className='flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2'>
  //             <span className=''>{desc}</span>
  //           </div>
  //         </div>
  //         <div className='w-14 border-b border-neutral-100 dark:border-neutral-800'></div>

  //         <div>
  //           <p className='text-sm'>Testing Window</p>
  //         </div>

  //         <div className='flex justify-between items-center'>
  //           <span className='text-base font-semibold'>
  //             {testingWindow}
  //             {/* {` `}
  //             {size === "default" && (
  //               <span className='text-sm text-neutral-500 dark:text-neutral-400 font-normal'>
  //                 /day
  //               </span>
  //             )} */}
  //           </span>
  //           <span className='text-base font-semibold'>
  //             Learn More
  //             {/* {` `}
  //             {size === "default" && (
  //               <span className='text-sm text-neutral-500 dark:text-neutral-400 font-normal'>
  //                 /day
  //               </span>
  //             )} */}
  //           </span>
  //           {/* <StartRating reviewCount={reviewCount} point={reviewStart} /> */}
  //         </div>
  //       </div>
  //     );
  //   };

  const [travelDestinations, setTravelDestinations] = useState([]);

  useEffect(() => {
    getPageData();
  }, []);

  const getPageData = async () => {
    try {
      const q1 = query(collection(db, "TravelDestinations"));

      const querySnapshot1 = await getDocs(q1);
      let data = [];
      querySnapshot1.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        data.push(doc.data());
      });
      setTravelDestinations(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='container relative mt-10'>
      <div
        className={`nc-SectionGridFilterCard pb-24 lg:pb-32`}
        data-nc-id='SectionGridFilterCard'>
        <Heading2
          heading='Browse Destinations'
          subHeading={
            <span className='block text-neutral-500 dark:text-neutral-400 mt-3'>
              Discover COVID-19 testing requirements for over 190 international
              destinations
              {/* <span className="mx-2">·</span>
              Aug 12 - 18 */}
            </span>
          }
        />

        <div className='grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {travelDestinations &&
            travelDestinations.map((d) => (
              <div
                className={`nc-CarCard group relative border border-neutral-200 dark:border-neutral-700 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow bg-white dark:bg-neutral-900 ${className}`}
                data-nc-id='CarCard'>
                <Link
                  to={{
                    pathname: "/travel-destination-detail",
                    state: { destinationDetails: d },
                  }}
                  className='flex flex-col'>
                  <div className='relative w-full rounded-2xl overflow-hidden'>
                    <div className='aspect-w-16 aspect-h-9 '>
                      <NcImage
                        containerClassName='flex items-center justify-center'
                        className='w-full'
                        src={d.destinationImage}
                      />
                    </div>
                    {/* <BtnLikeIcon isLiked={like} className='absolute right-3 top-3' /> */}
                    {/* {saleOff && <SaleOffBadge className="absolute left-3 top-3" />} */}
                    {/* {<SaleOffBadge className='absolute left-3 top-3' />} */}
                  </div>

                  <div
                    className={
                      size === "default" ? "p-5  space-y-4" : "p-3  space-y-2"
                    }>
                    <div className='space-y-2'>
                      <div className='flex items-center space-x-2'>
                        {<Badge name='Open' color='green' />}
                        <h2
                          className={`  capitalize ${
                            size === "default"
                              ? "text-xl font-semibold"
                              : "text-base font-medium"
                          }`}>
                          <span className='line-clamp-1'>
                            {d.destinationName}
                          </span>
                        </h2>
                      </div>
                      <div className='flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2'>
                        <span className=''>{d.destinationDescription}</span>
                      </div>
                    </div>
                    <div className='w-14 border-b border-neutral-100 dark:border-neutral-800'></div>

                    {/* <div> */}
                    {/* <p className='text-sm'>Testing Window</p>
                    </div> */}

                    <div className='flex justify-between items-center'>
                      {/* <span className='text-base font-semibold'>
                        {d.testingWindow}
                      </span> */}
                      <span className='text-base font-semibold'>
                        Learn More
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>

        {/* <div className='flex mt-16 justify-center items-center'>
          <Pagination />
        </div> */}
      </div>
    </div>
  );
};

export default TravelDestinationCard;
