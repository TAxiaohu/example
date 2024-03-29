'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  // mysql: {
  //   enable: true,
  //   package: 'egg-mysql',
  // },
  // mongoose: {
  //   enable: true,
  //   package: 'egg-mongoose',
  // },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
};
