"use strict";
exports.__esModule = true;
var OSPoint = require("ospoint");
var point = new OSPoint(651409.903, 313177.270);
var pWgs84 = point.toWGS84();
console.log(pWgs84);
