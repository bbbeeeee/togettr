var db;

exports.setDb = function(_db){
	db = _db;
}

exports.getDb = function(){
	if(db)
	return db;
}