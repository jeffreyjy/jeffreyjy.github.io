export const SITE = {
  website: 'https://jeffreyjy.github.io', // replace this with your deployed domain
  author: "Jeffrey Yang",
  profile: "assets/images/pfp.jpeg",
  desc: "A personal website of Jeffrey Yang",
  title: "jeffrey yang",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: false,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 10 * 365 * 24 * 60 * 60 * 1000, // 10 years
  showArchives: false,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "https://github.com/satnaing/astro-paper/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "America/Los_Angeles", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
