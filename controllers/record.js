var db = require('../db');

module.exports={
  get:function(id,cb){
    var collection = db.get().collection('record');
    collection.find({id:id}).toArray((err,docs)=>{
      if(err) return cb(err);
      var sum = docs.reduce((tot,item)=>{
        tot=tot+item.value;
        return tot;
      },0);
      var result={
        total:sum.toFixed(2),
        id:id
      };
      return cb(null,result);
    });
  }
}
