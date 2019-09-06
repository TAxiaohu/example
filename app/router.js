'use strict';
// const routerConfig = require('./routerConfig');
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.resources('users', '/users', controller.user);
  // router.resources('/users/batchDelete', controller.user);
};
