// Pequod syntax themes for Shiki (light + dark), mapping TextMate scopes to the
// Pequod crew accents (pequod.json). Keyword→Ahab, string→Tashtego, number→Pip,
// comment→Ishmael, function→Starbuck, type→Queequeg, const→Stubb, variable→Daggoo.

function theme(name, type, c) {
  return {
    name,
    type,
    colors: { "editor.background": c.bg, "editor.foreground": c.fg },
    settings: [
      { settings: { background: c.bg, foreground: c.fg } },
      { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: c.comment, fontStyle: "italic" } },
      { scope: ["keyword", "storage", "storage.type", "keyword.control", "keyword.operator.new"], settings: { foreground: c.keyword } },
      { scope: ["string", "string.quoted", "string.template", "constant.character"], settings: { foreground: c.string } },
      { scope: ["constant.numeric", "constant.language.boolean"], settings: { foreground: c.number } },
      { scope: ["entity.name.function", "support.function", "meta.function-call", "variable.function"], settings: { foreground: c.func } },
      { scope: ["entity.name.type", "entity.name.class", "support.type", "support.class", "storage.type.class"], settings: { foreground: c.type } },
      { scope: ["constant.language", "support.constant", "constant.other"], settings: { foreground: c.constant } },
      { scope: ["variable", "variable.other", "variable.parameter", "meta.definition.variable", "entity.other.attribute-name"], settings: { foreground: c.variable } },
      { scope: ["keyword.operator", "punctuation", "meta.brace"], settings: { foreground: c.punct } },
      { scope: ["entity.name.tag"], settings: { foreground: c.keyword } },
      { scope: ["markup.inserted"], settings: { foreground: c.string } },
      { scope: ["markup.deleted"], settings: { foreground: c.keyword } },
    ],
  };
}

export const pequodLight = theme("pequod-light", "light", {
  bg: "#EAE1D7", fg: "#0D2F42",
  comment: "#76716B", keyword: "#A83732", string: "#177C55", number: "#6A4A00",
  func: "#0082B1", type: "#253E82", constant: "#CA6435", variable: "#552823", punct: "#5d6b6f",
});

export const pequodDark = theme("pequod-dark", "dark", {
  bg: "#0C222F", fg: "#EAE1D7",
  comment: "#BFBBB6", keyword: "#E3877C", string: "#82C4A2", number: "#DEC577",
  func: "#A6DFFF", type: "#838CCF", constant: "#FFD9BB", variable: "#A17069", punct: "#9aa7ab",
});
