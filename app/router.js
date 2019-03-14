'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // common router
  router.post('/common/upload', controller.common.upload);
  // user router
  router.get('/user/query', controller.user.query);
  router.post('/user/update', controller.user.update);
  router.delete('/user/destroy/:id', controller.user.destroy);
  // school router
  router.get('/school/query', controller.school.query);
  router.post('/school/update', controller.school.update);
  router.delete('/school/destroy/:id', controller.school.destroy);

};
