// This file is created by egg-ts-helper@1.24.0
// Do not modify this file!!!!!!!!!

import 'egg';
import { EggAppConfig } from 'egg';
import ExportConfigDefault = require('../../config/config.default');
type ConfigDefault = ReturnType<typeof ExportConfigDefault>;
declare module 'egg' {
  type NewEggAppConfig = ConfigDefault;
  interface EggAppConfig extends NewEggAppConfig { }
}