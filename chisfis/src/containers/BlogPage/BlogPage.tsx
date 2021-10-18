import React from "react";
import { DEMO_POSTS } from "data/posts";
import { Helmet } from "react-helmet";
import SectionAds from "./SectionAds";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionMagazine5 from "./SectionMagazine5";
import SectionLatestPosts from "./SectionLatestPosts";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";

// DEMO DATA
const POSTS = DEMO_POSTS;

// DEMO POST FOR MAGAZINE SECTION
const MAGAZINE1_POSTS = POSTS.filter((_, i) => i >= 0 && i < 8);
//

const BlogPage: React.FC = () => {
  return (
    <div className="nc-BlogPage overflow-hidden relative">
      <Helmet>
        <title>Select Test Center</title>
      </Helmet>

     
      {/* ======== ALL SECTIONS ======== */}
      {/* ======= START CONTAINER ============= */}
      <div className="container relative">
       
      
        {/* === SECTION 8 === */}
        <SectionLatestPosts className="py-16 lg:py-28" />

      </div>
    </div>
  );
};

export default BlogPage;
