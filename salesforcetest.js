
exports.salesforceTest=async function(conn) {
    try  {
  
  
  
      let result = await conn.query("SELECT Id, Name FROM Account");
      console.log("total : " + result.totalSize);
      console.log("fetched : " + result.records.length);
  
      let testname ={
        "Name" : "日本語名称"
      }
      let _request = {
        url: '/sobjects/Account/0015g00000woGr8AA',
        body: testname,
        headers: {
            "Content-Type": "application/json"
        }
      };
      
      let resp = await conn.requestPatch('/sobjects/Account/0015g00000woGr8AAE',testname);
      console.log(resp);
  
      let testname2 ={
        Id: '0015g00000woGr6AAE',
        Name : "日本語名称2"
      }
  
      let resp2 = await conn.sobject('Account').update(testname2);
      console.log(resp2);
  
    }catch(err){
      console.error(err);
    }
  
  }