import __locations from "./jsons/__locations.json";
import __stayTaxonomies from "./jsons/__stayTaxonomies.json";
import __experiencesTaxonomies from "./jsons/__experiencesTaxonomies.json";
import { TaxonomyType } from "./types";



const DEMO_TAGS: TaxonomyType[] = __locations.map((item) => ({
  ...item,
  taxonomy: "tag",
}));



export {
  DEMO_TAGS
};
