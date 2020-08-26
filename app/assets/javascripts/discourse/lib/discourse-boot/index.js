"use strict";

module.exports = {
  name: require("./package").name,

  included() {
    this.app.options.autoRun = false;
  },

  contentFor(type, config) {
    if (type === "discourse-boot") {
      let appJSON = JSON.stringify(config.APP || {});
      return `
        <script>
          (function() {
            fetch("/bootstrap.json").then(res => res.json()).then(data => {
              let appJSON = ${appJSON};
              appJSON.bootstrap = data.bootstrap;
              const app = require("${config.modulePrefix}/app")["default"].create(appJSON);
              app.start();
            });
          })();
        </script>
      `;
    }
  }
};
