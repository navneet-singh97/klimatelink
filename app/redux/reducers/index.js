import {combineReducers} from 'redux';
import initial from './initial';
import user from './user';
import certificates from './certificates';
import communities from './communities';
import payments from './payments.js';
import jobs from './jobs.js';

const rootReducer = combineReducers({
  initial,
  user,
  certificates,
  communities,
  payments,
  jobs,
});

export default rootReducer;
