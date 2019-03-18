'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc',
  },
  ejs: {
    enable: true,
    package: 'egg-view-ejs',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  }
}
