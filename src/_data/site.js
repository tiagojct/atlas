export default {
  title: "Atlas",
  url: "https://tiagojct.eu/atlas",
  lang: "pt-PT",
  description:
    "Um jardim digital de notas atómicas que se ligam entre si — um Zettelkasten público, cultivado ao longo do tempo.",
  author: { name: "Tiago Jacinto", email: "tiagojacinto@med.up.pt", orcid: "0000-0002-7897-1101" },
  ogImage: "/assets/img/og-default.png",
  favicon: "/assets/img/favicon.svg",
  mastodon: "https://mastodon.social/@tiagojct",
  twitterCreator: "@tiagojct",

  // Flat nav for the single-section Atlas (the domain is the section).
  nav: [
    { text: "Início", url: "/", icon: "ph:house" },
    { text: "Mapa", url: "/mapa/", icon: "ph:graph" },
    { text: "Tags", url: "/tags/", icon: "ph:hash" },
    { text: "Aleatória", url: "/aleatoria/", icon: "ph:shuffle" },
    { text: "Sobre", url: "/sobre/", icon: "ph:info" },
  ],

  social: [
    { icon: "simple-icons:github", url: "https://github.com/tiagojct", label: "GitHub" },
    { icon: "simple-icons:mastodon", url: "https://mastodon.social/@tiagojct", label: "Mastodon" },
  ],
};
