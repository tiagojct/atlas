export default {
  title: "Atlas",
  url: "https://tiagojct.eu/atlas",
  lang: "en",
  description:
    "A digital garden of atomic notes that link to one another — a public Zettelkasten, cultivated over time.",
  author: { name: "Tiago Jacinto", email: "tiagojacinto@med.up.pt", orcid: "0000-0002-7897-1101" },
  ogImage: "/assets/img/og-default.png",
  favicon: "/assets/img/favicon.svg",
  mastodon: "https://mastodon.social/@tiagojct",
  twitterCreator: "@tiagojct",

  // Flat nav for the single-section Atlas (the domain is the section).
  nav: [
    { text: "Home", url: "/", icon: "ph:house" },
    { text: "Map", url: "/map/", icon: "ph:graph" },
    { text: "Tags", url: "/tags/", icon: "ph:hash" },
    { text: "Random", url: "/random/", icon: "ph:shuffle" },
    { text: "About", url: "/about/", icon: "ph:info" },
  ],

  social: [
    { icon: "simple-icons:github", url: "https://github.com/tiagojct", label: "GitHub" },
    { icon: "simple-icons:mastodon", url: "https://mastodon.social/@tiagojct", label: "Mastodon" },
  ],
};
