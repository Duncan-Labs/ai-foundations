module.exports = {
  arrowParens: "avoid",
  bracketSameLine: true,
  bracketSpacing: true,
  singleQuote: true,
  trailingComma: "all",
  useTabs: true,
  plugins: ["@ianvs/prettier-plugin-sort-imports"], // https://github.com/IanVS/prettier-plugin-sort-imports
  importOrder: [
    "^react$",
    "^react-native*",
    "^expo*",
    "<THIRD_PARTY_MODULES>",
    "",
    "^(@screens|@components|@assets|@services|@svgs|@utils|@hooks|@context)/(.*)$",
    "@globalStyles",
    "@fontFamilies",
    "@colors$",
    "@constants$",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
};
