const AWS = require ("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({region:'us-east-1'});

exports.handler = function(event, context, callback)
{

  let scanningParameters =
  {
    TableName: 'masters',
    Limit: 100
  };
  
  docClient.scan(scanningParameters,function(err,data)
  {
    if (err) {
      callback(err,null,);
    }
    else {
      callback(null, data.Items);
    }
  
  });
  
  //put
  
  // let scanningParameters =
  // {
  //   TableName: 'masters',
  //   "Item":{
  //     "id": "1"
  //   }
  // };
  
  // docClient.put(scanningParameters,function(err,data)
  // {
  //   if (err) {
  //     callback(err,null,);
  //   }
  //   else {
  //     callback(null, data);
  //   }
  
  // });
  
}