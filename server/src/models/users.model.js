const NeDB = require('nedb');
const path = require('path');

module.exports = function (app) {
  const dbPath = app.get('nedb');
  const Model = new NeDB({
    filename: path.join(dbPath, 'users.db'),
    autoload: true
  });

  // Using a unique constraint with the index
  Model.ensureIndex({ fieldName: 'username', unique: true },  err => err && app.error('Model initialization', err));
  Model.ensureIndex({ fieldName: 'email', unique: true },  err => err && app.error('Model initialization', err));

  return Model;
};
