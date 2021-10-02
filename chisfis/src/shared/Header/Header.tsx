import React, { FC } from "react";
import MainNav1 from "./MainNav1";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useState } from "react";

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const [isTop, setisTop] = useState(true);

  useEffect(() => {
    window.onscroll = function () {
      scrollFunction();
    };
  }, []);

  function scrollFunction() {
    const $head = document.getElementById("nc-chifis-header");
    if (!$head) return;
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      !!isTop && setisTop(false);
    } else {
      setisTop(true);
    }
  }

  return (
    <div
      id="nc-chifis-header"
      className="nc-Header lg:sticky lg:top-0 w-full lg:left-0 lg:right-0 z-40"
    >
      <Helmet>
        <title>Chisfis || Booking React Template</title>
      </Helmet>

      {/* NAV */}
      <MainNav1 isTop={isTop} />
    </div>
  );
};

export default Header;
