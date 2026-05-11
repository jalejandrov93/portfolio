import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import PricingTable from "../../components/sections/pricing/pricing-table";
import Color from "../../components/utils/page.colors.util";

import colors from "../../content/pricing/_colors.json";

export default function PricingPage() {
  return (
    <>
      <Color colors={colors} />
      <PricingTable />
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
