import BackgroundSection from "../../components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "../../components/BgGlassmorphism/BgGlassmorphism";
import SectionGridAuthorBox from "../../components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionHeroArchivePage from "../../components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSliderNewCategories from "../../components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "../../components/SectionSubscribe2/SectionSubscribe2";
import React, { FC, Fragment, useEffect, useState } from "react";
import SectionGridFilterCard from "../../containers/ListingStayPage/SectionGridFilterCard";
import { Helmet } from "react-helmet";
import HeroSearchForm from "components/HeroSearchForm/HeroSearchForm";
import imagePng from "images/hero-right2.png";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import carUtilities2 from "../../images/carUtilities/2.png";
import { Tab } from "@headlessui/react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { useHistory } from "react-router";
import { query, collection, where, getDocs, addDoc } from "@firebase/firestore";
import { db } from "firebase";
import { doc, updateDoc } from "firebase/firestore";

export interface ListingStayPageProps {
  className?: string;
}

const requirementsData = [
  {
    title: "Who can travel to Norway?",
    desc: "Citizens and Residents, Case-by-case",
    icon: carUtilities2,
  },
  {
    title: "Do children need to be tested?",
    desc: "Testing is required, except for children under the age of 12 years old.",
    icon: carUtilities2,
  },
  {
    title: "Test Requirements",
    desc: "PCR, Antigen",
    icon: carUtilities2,
  },
  {
    title: "Quarantine required and quarantine length",
    desc: "Yes 10 days",
    icon: carUtilities2,
  },
];

const includes_demo = [
  { name: "Set Menu Lunch on boat" },
  { name: "Express Bus From Hanoi To Halong and Return" },
  { name: "Mineral Water On Express Bus" },
];

const TravelDestinationDetail: FC<ListingStayPageProps> = ({
  className = "",
}) => {
  const history = useHistory();

  const [destDet, setDestDetails] = useState({
    destinationName: "",
    destinationDescription: "",
    entryRequirementsAnswers: [],
    destinationImage: "",
    visits: "",
    id: "",
    entryReqQueAns: {
      question1: "",
      question2: "",
      question3: "",
      question4: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
    },
  });
  useEffect(() => {
    const loadFormData = async () => {
      let fd;
      if (history.location.state) {
        fd = history.location.state;

        setDestDetails(fd.destinationDetails);

        const travelDestRef = collection(db, "TravelDestinations");
        await updateDoc(doc(travelDestRef, fd.destinationDetails.id.trim()), {
          visits: parseInt(fd.destinationDetails.visits) + 1,
        });
      }
    };

    loadFormData();
  }, []);

  return (
    <div
      className={`nc-ListingStayPage relative overflow-hidden ${className}`}
      data-nc-id='ListingStayPage'>
      <Helmet>
        <title>Details</title>
      </Helmet>

      <div className='container relative overflow-hidden'>
        {/* SECTION HERO */}
        <div className='relative py-16'>
          <div
            className={`nc-SectionHeroArchivePage flex flex-col relative pt-10 pb-24 lg:pb-32 lg:pt-28`}
            data-nc-id='SectionHeroArchivePage'>
            <div className='flex flex-col lg:flex-row lg:items-center'>
              <div className='flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-6 lg:space-y-10 pb-14 lg:pb-64 xl:pb-80 xl:pr-14 lg:mr-10 xl:mr-0'>
                <h2 className='font-medium text-3xl md:text-4xl xl:text-6xl leading-[110%]'>
                  {destDet && destDet.destinationName} Travel Restrictions
                </h2>
                <div className='flex items-center text-base md:text-lg text-neutral-500 dark:text-neutral-400'>
                  <i className='text-2xl las la-map-marked'></i>
                  <span className='ml-2.5'>Updated: 04 / 10/2021</span>

                  {/* <i className='text-2xl las la-home'></i> */}
                  <span className='ml-2.5'>- Reviewed: Current </span>
                </div>

                <div className='w-14 border-b border-neutral-200 dark:border-neutral-700' />

                <div>
                  <h4 className='text-lg font-semibold'>
                    {destDet && destDet.entryReqQueAns.question1} ?
                  </h4>
                  <span className='block mt-3 text-neutral-500 dark:text-neutral-400'>
                    {destDet && destDet.entryReqQueAns.answer1}
                  </span>
                </div>

                <div>
                  <h4 className='text-lg font-semibold'>
                    Accepted tests for entry{" "}
                  </h4>
                  <span className='block mt-3 text-neutral-500 dark:text-neutral-400'>
                    {destDet && destDet.destinationDescription}
                  </span>
                </div>

                <div className='w-14 border-b border-neutral-200 dark:border-neutral-700' />

                <ButtonPrimary href='/select-test'>Book a Test</ButtonPrimary>
              </div>
              <div className='flex-grow'>
                <img
                  className='w-full'
                  src={destDet && destDet.destinationImage}
                  alt='hero'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION */}
      {/* <SectionGridFilterCard className='pb-24 lg:pb-32' /> */}

      {/* SECTION 1 */}
      <div className='container relative overflow-hidden mt-10'>
        <div className='relative py-16'>
          <div className='listingSection__wrap relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow '>
            <div className='text-center'>
              <h2 className='text-2xl font-semibold'>
                {destDet && destDet.destinationName} COVID-19 Entry Requirements{" "}
              </h2>
              {/* <span className='block mt-2 text-neutral-500 dark:text-neutral-400'>
                Questions are at the heart of making things great.
              </span> */}
            </div>
            <div className='w-14 border-b border-neutral-200 dark:border-neutral-700'></div>
            {/* 6 */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 '>
              {/* TIEN ICH 1 */}

              {/* {requirementsData.map((item, index) => (
                <div key={index} className='flex items-center space-x-4 '>
                  <div className='w-10 flex-shrink-0'>
                    <img src={item.icon} alt='' />
                  </div>

                  <div>
                    <h4 className='text-lg font-semibold'>{item.title}</h4>
                    <span className='block mt-3 text-neutral-500 dark:text-neutral-400'>
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))} */}
              <div className='flex items-center space-x-4 '>
                <div className='w-10 flex-shrink-0'>
                  <img src={carUtilities2} alt='' />
                </div>

                <div>
                  <h4 className='text-lg font-semibold'>
                    {destDet && destDet.entryReqQueAns.question1}
                  </h4>
                  <span className='block mt-3 text-neutral-500 dark:text-neutral-400'>
                    {destDet && destDet.entryReqQueAns.answer1}
                  </span>
                </div>
              </div>

              <div className='flex items-center space-x-4 '>
                <div className='w-10 flex-shrink-0'>
                  <img src={carUtilities2} alt='' />
                </div>

                <div>
                  <h4 className='text-lg font-semibold'>
                    {destDet && destDet.entryReqQueAns.question2}
                  </h4>
                  <span className='block mt-3 text-neutral-500 dark:text-neutral-400'>
                    {destDet && destDet.entryReqQueAns.answer2}
                  </span>
                </div>
              </div>

              <div className='flex items-center space-x-4 '>
                <div className='w-10 flex-shrink-0'>
                  <img src={carUtilities2} alt='' />
                </div>

                <div>
                  <h4 className='text-lg font-semibold'>
                    {destDet && destDet.entryReqQueAns.question3}
                  </h4>
                  <span className='block mt-3 text-neutral-500 dark:text-neutral-400'>
                    {destDet && destDet.entryReqQueAns.answer3}
                  </span>
                </div>
              </div>

              <div className='flex items-center space-x-4 '>
                <div className='w-10 flex-shrink-0'>
                  <img src={carUtilities2} alt='' />
                </div>

                <div>
                  <h4 className='text-lg font-semibold'>
                    {destDet && destDet.entryReqQueAns.question4}
                  </h4>
                  <span className='block mt-3 text-neutral-500 dark:text-neutral-400'>
                    {destDet && destDet.entryReqQueAns.answer4}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1 */}
      <div className='container relative overflow-hidden mt-10'>
        <div className='relative py-16'>
          <div className='listingSection__wrap relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow '>
            <div className='text-center'>
              <h2 className='text-2xl font-semibold'>
                Can You Travel To {destDet && destDet.destinationName}?{" "}
              </h2>
              {/* <span className='block mt-2 text-neutral-500 dark:text-neutral-400'>
                Questions are at the heart of making things great.
              </span> */}
            </div>
            <div className='w-14 border-b border-neutral-200 dark:border-neutral-700'></div>
            {/* 6 */}
            <div className='grid grid-cols-1 lg:grid-cols-1 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 '>
              {/* TIEN ICH 1 */}
              <div
                id='single-entry-content'
                className='prose prose-lg mx-auto dark:prose-dark'
                style={{ maxWidth: "100ch" }}>
                <p>
                  Norway have open its borders for non-essential travel from
                  some countries. Domestically, restrictions are gradually being
                  lifted.
                </p>
                <ul>
                  <li>
                    Residents of EU and Schengen member countries may enter
                    Norway, as well as arrivals from the UK, Switzerland, Saudi
                    Arabia, Singapore, Taiwan and New Zealand.{" "}
                  </li>
                  <li>
                    Vaccinated travelers from Albania, Faroe Islands, Israel,
                    Morocco, North Macedonia, Panama, Turkey and Ukraine ma
                    enter as well.
                  </li>
                  <li>
                    Norwegian citizens and residents may enter from any country,
                    as well as family members arriving from some low-risk third
                    countries.
                  </li>
                  <li>
                    Residents of EU and Schengen member countries may enter
                    Norway, as well as arrivals from the UK, Switzerland, Saudi
                    Arabia, Singapore, Taiwan and New Zealand.{" "}
                  </li>
                  <li>
                    Vaccinated travelers from Albania, Faroe Islands, Israel,
                    Morocco, North Macedonia, Panama, Turkey and Ukraine ma
                    enter as well.
                  </li>
                  <li>
                    Norwegian citizens and residents may enter from any country,
                    as well as family members arriving from some low-risk third
                    countries.
                  </li>
                  <li>
                    Residents of EU and Schengen member countries may enter
                    Norway, as well as arrivals from the UK, Switzerland, Saudi
                    Arabia, Singapore, Taiwan and New Zealand.{" "}
                  </li>
                  <li>
                    Vaccinated travelers from Albania, Faroe Islands, Israel,
                    Morocco, North Macedonia, Panama, Turkey and Ukraine ma
                    enter as well.
                  </li>
                  <li>
                    Norwegian citizens and residents may enter from any country,
                    as well as family members arriving from some low-risk third
                    countries.
                  </li>
                  <li>
                    Residents of EU and Schengen member countries may enter
                    Norway, as well as arrivals from the UK, Switzerland, Saudi
                    Arabia, Singapore, Taiwan and New Zealand.{" "}
                  </li>
                  <li>
                    Vaccinated travelers from Albania, Faroe Islands, Israel,
                    Morocco, North Macedonia, Panama, Turkey and Ukraine ma
                    enter as well.
                  </li>
                  <li>
                    Norwegian citizens and residents may enter from any country,
                    as well as family members arriving from some low-risk third
                    countries.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* SECTION */}

      <div className='container relative overflow-hidden mt-10'>
        <div className='relative py-16'>
          <div className='relative text-center mt-10'>
            <h2 className='text-2xl font-semibold'>Choose Your Test</h2>
            <span className='block mt-2 text-neutral-500 dark:text-neutral-400'>
              We offer a range of COVID-19 Travel tests including PCR Fit to
              Fly, Antigen, Day 2 & Day 8 Tests and <br /> Test to Release.
            </span>
          </div>
          <div className='listingSection__wrap mt-10 relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow'>
            <div className='flex items-center space-x-4 '>
              <div>
                <h2 className='text-2xl font-semibold'>
                  Leaving the {destDet && destDet.destinationName}
                </h2>
              </div>
              <div className='w-10 flex-shrink-0'>
                <img src={carUtilities2} alt='' />
              </div>
            </div>

            <div className='w-14 border-b border-neutral-100 dark:border-neutral-800'></div>

            {/* 6 */}

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 listingSection__wrap elative bg-white'>
              {/* TIEN ICH 1 */}

              <div className='flex items-center space-x-4 '>
                <div
                  className='listingSection__wrap'
                  style={{ border: "0px", margin: "0px", padding: "0px" }}>
                  <div className='flex items-center space-x-4 '>
                    <div className='w-10 flex-shrink-0 '>
                      <img src={carUtilities2} alt='' />
                    </div>
                    <div>
                      <h3 className='text-lg font-semibold'>Fit to Fly Test</h3>
                    </div>
                  </div>

                  <div className='w-14'></div>

                  <div className='grid gap-3 text-sm text-neutral-700 dark:text-neutral-300 '>
                    {includes_demo
                      .filter((_, i) => i < 12)
                      .map((item) => (
                        <div
                          key={item.name}
                          className='flex items-center space-x-3'>
                          <i className='las la-check-circle text-2xl'></i>
                          <span>{item.name}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className={`nc-SectionSliderNewCategories relative`}>
                <div className='mt-6'>
                  {/* <h3 className='text-2xl font-semibold'>Departure</h3> */}

                  <Tab.Group>
                    <Tab.List className='flex grid grid-cols-1 lg:grid-cols-2'>
                      <Tab as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${
                              selected
                                ? "bg-neutral-800 text-white"
                                : "text-neutral-6000 dark:text-neutral-400"
                            }`}>
                            PCR Test
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
                            <span className='mr-2.5'>Antigen Test</span>
                          </button>
                        )}
                      </Tab>
                    </Tab.List>

                    <div className='w-14 border-b border-neutral-200 my-5'></div>
                    <Tab.Panels>
                      <Tab.Panel className='space-y-5'>
                        <div className='elative bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden '>
                          <div className='mt-10'>
                            <div className='flex grid grid-cols-1 lg:grid-cols-2 space-x-5 mt-10'>
                              <ButtonPrimary href=''>
                                Book PCR Test
                              </ButtonPrimary>
                              <ButtonSecondary href=''>
                                Learn More
                              </ButtonSecondary>
                            </div>
                          </div>
                        </div>
                      </Tab.Panel>
                      <Tab.Panel className='space-y-5'>
                        <div className='bg-white dark:bg-neutral-900 dark:border-neutral-800 rounded-2xl overflow-hidden'>
                          <div className='mt-10'>
                            <div className='flex grid grid-cols-1 lg:grid-cols-2 space-x-5 mt-10'>
                              <ButtonPrimary href=''>
                                Book Antigen Test
                              </ButtonPrimary>
                              <ButtonSecondary href=''>
                                Learn More
                              </ButtonSecondary>
                            </div>
                          </div>
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                  <div className='justify-center'>
                    <h3 className='text-lg mt-5 flex justify-center'>
                      PCR Fit to Fly Test
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='listingSection__wrap relative mt-10 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow '>
            <div className='flex items-center space-x-4 '>
              <div>
                <h2 className='text-2xl font-semibold'>
                  Entering the {destDet && destDet.destinationName}
                </h2>
              </div>
              <div className='w-10 flex-shrink-0'>
                <img src={carUtilities2} alt='' />
              </div>
            </div>

            <div className='w-14 border-b border-neutral-100 dark:border-neutral-800'></div>

            {/* 6 */}

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 listingSection__wrap elative bg-white'>
              {/* TIEN ICH 1 */}

              <div className='flex items-center space-x-4 '>
                <div
                  className='listingSection__wrap'
                  style={{ border: "0px", margin: "0px", padding: "0px" }}>
                  <div className='flex items-center space-x-4 '>
                    <div className='w-10 flex-shrink-0 '>
                      <img src={carUtilities2} alt='' />
                    </div>
                    <div>
                      <h3 className='text-lg font-semibold'>Fit to Fly Test</h3>
                    </div>
                  </div>

                  <div className='w-14'></div>

                  <div className='grid gap-3 text-sm text-neutral-700 dark:text-neutral-300 '>
                    {includes_demo
                      .filter((_, i) => i < 12)
                      .map((item) => (
                        <div
                          key={item.name}
                          className='flex items-center space-x-3'>
                          <i className='las la-check-circle text-2xl'></i>
                          <span>{item.name}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className={`nc-SectionSliderNewCategories relative`}>
                <div className='mt-6'>
                  {/* <h3 className='text-2xl font-semibold'>Departure</h3> */}

                  <Tab.Group>
                    <Tab.List className='flex grid grid-cols-1 lg:grid-cols-2'>
                      <Tab as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${
                              selected
                                ? "bg-neutral-800 text-white"
                                : "text-neutral-6000 dark:text-neutral-400"
                            }`}>
                            PCR Test
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
                            <span className='mr-2.5'>Antigen Test</span>
                          </button>
                        )}
                      </Tab>
                    </Tab.List>

                    <div className='w-14 border-b border-neutral-200 my-5'></div>
                    <Tab.Panels>
                      <Tab.Panel className='space-y-5'>
                        <div className='elative bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden '>
                          <div className='mt-10'>
                            <div className='flex grid grid-cols-1 lg:grid-cols-2 space-x-5 mt-10'>
                              <ButtonPrimary href=''>
                                Book PCR Test
                              </ButtonPrimary>
                              <ButtonSecondary href=''>
                                Learn More
                              </ButtonSecondary>
                            </div>
                          </div>
                        </div>
                      </Tab.Panel>
                      <Tab.Panel className='space-y-5'>
                        <div className='bg-white dark:bg-neutral-900 dark:border-neutral-800 rounded-2xl overflow-hidden'>
                          <div className='mt-10'>
                            <div className='flex grid grid-cols-1 lg:grid-cols-2 space-x-5 mt-10'>
                              <ButtonPrimary href=''>
                                Book Antigen Test
                              </ButtonPrimary>
                              <ButtonSecondary href=''>
                                Learn More
                              </ButtonSecondary>
                            </div>
                          </div>
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                  <div className='justify-center'>
                    <h3 className='text-lg mt-5 flex justify-center'>
                      PCR Fit to Fly Test
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION */}
      {/* <SectionSubscribe2 className='py-24 lg:py-32' /> */}

      {/* SECTION */}
      {/* <div className='relative py-16 mb-24 lg:mb-32'>
        <BackgroundSection className='bg-orange-50 dark:bg-black dark:bg-opacity-20 ' />
        <SectionGridAuthorBox />
      </div> */}
    </div>
  );
};

export default TravelDestinationDetail;
