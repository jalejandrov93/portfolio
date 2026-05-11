import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Recent from "../../components/sections/articles/recent";
import Color from "../../components/utils/page.colors.util";

import colors from "../../content/articles/_colors.json";
import settings from "../../content/_settings.json";

const ISR_REVALIDATE_SECONDS = 3600; // Medium RSS update cadence is generous.

export default function Articles({ mediumArticles }) {
	return (
		<>
			<Color colors={colors} />
			<Recent mediumArticles={mediumArticles} />
		</>
	);
}

// ISR — same hourly cache pattern as /projects. rss2json is unauthenticated and
// rate-limited; SSR was a daily-traffic liability.
export async function getStaticProps({ locale }) {
	let mediumArticles = null;

	try {
		const mediumRSS = await fetch(
			`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${settings.username.medium}`
		);
		mediumArticles = await mediumRSS.json();
	} catch (err) {
		console.error("[articles/getStaticProps] Medium RSS fetch failed:", err);
		mediumArticles = { items: [] };
	}

	return {
		props: {
			mediumArticles,
			...(await serverSideTranslations(locale, ["common"])),
		},
		revalidate: ISR_REVALIDATE_SECONDS,
	};
}
