"use strict";

const writeFile = require("broccoli-file-creator");
const fetch = require("node-fetch");

module.exports = {
  name: require("./package").name,

  treeForPublic() {
    function getForLocale(locale) {
      return fetch(`http://dev.local:3000/assets/locales/${locale}.js`).then(
        res => {
          return res.text();
        }
      );
    }

    return writeFile("assets/locales/en_US.js", getForLocale("en_US"));
  },

  contentFor(type, config) {
    if (type === "body-footer") {
      return `
        <script src="${config.rootURL}assets/locales/en_US.js"></script>
        <script>
          define("I18n", ['exports'], function(exports) { return I18n; });
        </script>
      `;
    }
  }
};
