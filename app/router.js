'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // user router
  router.get('/user', controller.user.index);
  router.post('/user/update', controller.user.update);
  router.delete('/user/destroy/:id', controller.user.destroy);
  // school router
  router.get('/school', controller.school.index);
  router.post('/school/update', controller.school.update);
  router.delete('/school/destroy/:id', controller.school.destroy);

};
