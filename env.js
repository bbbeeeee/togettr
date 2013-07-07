var MONGO_DB_URL = process.env.MONGO_DB || 'mongodb://localhost:27017/youtaan';
var APP_HOST = process.env.APP_HOST || 'localhost'; 
var APP_PORT = process.env.APP_PORT || 3000;
var SESSION_SECRET = process.env.SESSION_SECRET || 'CHANGE_ME';

var db = null;

