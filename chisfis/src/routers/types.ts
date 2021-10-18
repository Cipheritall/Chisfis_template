import { ComponentType } from "react";

export interface LocationStates {
  "/"?: {};
  "/#"?: {};
  //
  "/listing-stay"?: {};
  "/listing-stay-map"?: {};
  "/listing-stay-detail"?: {};
  //
  "/listing-experiences"?: {};
  "/listing-experiences-map"?: {};
  "/listing-experiences-detail"?: {};
  //
  "/listing-car"?: {};
  "/listing-car-map"?: {};
  "/listing-car-detail"?: {};
  //
  "/checkout"?: {};
  "/pay-done"?: {};
  //
  "/account"?: {};
  "/account-savelists"?: {};
  "/account-password"?: {};
  "/account-billing"?: {};
  //
  "/blog"?: {};
  "/blog-single"?: {};
  //
  "/add-booking-1"?: {};
  "/add-booking-2"?: {};
  "/add-booking-3"?: {};
  "/add-booking-4"?: {};
  "/add-booking-5"?: {};
  "/add-booking-6"?: {};
  "/add-booking-7"?: {};
  "/add-booking-8"?: {};
  "/add-booking-9"?: {};
  "/add-booking-10"?: {};
  //
  "/author"?: {};
  "/search"?: {};
  "/about"?: {};
  "/contact"?: {};
  "/login"?: {};
  "/signup"?: {};
  "/forgot-pass"?: {};
  "/page404"?: {};
  "/subscription"?: {};

  "/travel-destination"?: {};
  "/travel-destination-detail"?: {};
  "/test-centers"?: {};
  "/booking-page"?: {};
  "/select-test"?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  exact?: boolean;
  component: ComponentType<Object>;
}
