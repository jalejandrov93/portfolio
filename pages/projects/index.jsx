// Sections
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import GitRecentProjects from "../../components/sections/projects/recent";
import FeaturedProjects from "../../components/sections/projects/featured";

import Color from "../../components/utils/page.colors.util";

import settings from "../../content/_settings.json";
import colors from "../../content/projects/_colors.json";

const ISR_REVALIDATE_SECONDS = 3600; // GitHub data updates hourly — plenty fresh.

export default function Projects({ user, repos }) {
  return (
    <>
      <Color colors={colors} />
      <FeaturedProjects />
      <GitRecentProjects user={user} repos={repos} />
    </>
  );
}

// ISR — single GitHub fetch per hour per route, served from edge cache thereafter.
// Recovers from rate-limiting and survives traffic spikes that the previous
// getServerSideProps could not.
export async function getStaticProps({ locale }) {
  let user = null;
  let repos = [];

  try {
    const [gitUserRes, gitReposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${settings.username.github}`),
      fetch(`https://api.github.com/users/${settings.username.github}/repos`),
    ]);

    const [userJson, reposJson] = await Promise.all([
      gitUserRes.json(),
      gitReposRes.json(),
    ]);

    if (userJson && userJson.login) {
      const { login, name, avatar_url, html_url } = userJson;
      user = [{ login, name, avatar_url, html_url }];
    }

    if (Array.isArray(reposJson) && reposJson.length) {
      repos = reposJson
        .map(
          ({
            name,
            fork,
            description,
            forks_count,
            html_url,
            language,
            watchers,
            default_branch,
            homepage,
            pushed_at,
            topics,
          }) => ({
            name,
            fork,
            description,
            forks_count,
            html_url,
            language,
            watchers,
            default_branch,
            homepage,
            timestamp: Math.floor(new Date(pushed_at) / 1000),
            topics: topics || [],
            pushed_at,
          })
        )
        .sort((a, b) => b.timestamp - a.timestamp)
        .filter((repo, i) => i < 8 && !repo.topics.includes("github-config"));
    }
  } catch (err) {
    // ISR will keep serving the last successful build until the next revalidate
    // window — graceful degradation when GitHub blips.
    console.error("[projects/getStaticProps] GitHub fetch failed:", err);
  }

  return {
    props: {
      repos,
      user,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: ISR_REVALIDATE_SECONDS,
  };
}
