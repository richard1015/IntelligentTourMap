// This file is created by egg-ts-helper@1.24.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase = require('../../../app/service/base');
import ExportSchool = require('../../../app/service/school');
import ExportSpot = require('../../../app/service/spot');
import ExportUser = require('../../../app/service/user');

declare module 'egg' {
  interface IService {
    base: ExportBase;
    school: ExportSchool;
    spot: ExportSpot;
    user: ExportUser;
  }
}
