// Rehype plugin: restore placeholder characters in final HTML output.
// Docusaurus 3 MDX v3 parses { and < as JSX expressions even in code blocks,
// so we replace them with placeholders in the source and restore them here.

const { visit } = require('unist-util-visit');

const replacements = [
  ['[[H2]]', '## '],
  ['[[H3]]', '### '],
  ['[[OB]]', '{'],
  ['[[CB]]', '}'],
  ['[[LT]]', '<'],
  ['[[GT]]', '>'],
];

module.exports = function restorePlaceholders() {
  return (tree) => {
    visit(tree, 'text', (node) => {
      for (const [placeholder, char] of replacements) {
        node.value = node.value.split(placeholder).join(char);
      }
    });
    visit(tree, 'raw', (node) => {
      for (const [placeholder, char] of replacements) {
        node.value = node.value.split(placeholder).join(char);
      }
    });
  };
};
