'use strict';
/*eslint no-invalid-this:0*/
import mongoose from 'mongoose';
import { Schema } from 'mongoose';
// mongoose.Promise = require('bluebird');

var UserSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  middleName: {
    type: String
  },
  userName: {
    type: String
  },
  password: {
    type: String
  },
  Address: {
    type: String
  },
  id: {
    type: String
  },
}, { usePushEach: true, timestamps: true });


export default mongoose.model('Test-User', UserSchema);
