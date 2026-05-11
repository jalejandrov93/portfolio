import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// Above-the-fold — load eagerly for first paint.
import Hero from "../components/sections/index/hero";
import FeaturedProjects from "../components/sections/projects/featured";

import Color from "../components/utils/page.colors.util";
import colors from "../content/index/_colors.json";

// Below-the-fold — code-split so they don't block the recruiter's 5-second
// moment. ssr:true keeps SEO + zero-FOUC; only the JS chunk is deferred.
const About = dynamic(() => import("../components/sections/index/about"), { ssr: true });
const Technical = dynamic(() => import("../components/sections/index/technical"), { ssr: true });
const Career = dynamic(() => import("../components/sections/index/career"), { ssr: true });
const PricingTable = dynamic(() => import("../components/sections/pricing/pricing-table"), { ssr: true });

export default function HomePage() {
  return (
    <>
      <Color colors={colors} />
      <Hero />
      <section id="featured-projects">
        <FeaturedProjects />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="technical">
        <Technical />
      </section>
      <section id="career">
        <Career />
      </section>
      <section id="pricing">
        <PricingTable />
      </section>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
