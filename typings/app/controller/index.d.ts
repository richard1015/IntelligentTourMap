// This file is created by egg-ts-helper@1.24.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase = require('../../../app/controller/base');
import ExportCommon = require('../../../app/controller/common');
import ExportSchool = require('../../../app/controller/school');
import ExportUser = require('../../../app/controller/user');

declare module 'egg' {
  interface IController {
    base: ExportBase;
    common: ExportCommon;
    school: ExportSchool;
    user: ExportUser;
  }
}
