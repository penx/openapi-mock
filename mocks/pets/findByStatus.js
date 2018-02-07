'use strict';

var util = require('util');

module.exports = {
  findPetsByStatus: findPetsByStatus
};

function findPetsByStatus(req, res) {
  var status = req.swagger.params.status.value;
  res.json({
    status
  });
}
