// This file is created by egg-ts-helper@1.24.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase = require('../../../app/service/base');
import ExportSchool = require('../../../app/service/school');
import ExportUser = require('../../../app/service/user');

declare module 'egg' {
  interface IService {
    base: ExportBase;
    school: ExportSchool;
    user: ExportUser;
  }
}
