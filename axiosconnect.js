const axios= require('axios');

testAxiosConnection();


async function testAxiosConnection() {
    let params = new URLSearchParams();

    params.append('grant_type', 'password');
    params.append('client_id', '');    
    params.append('client_secret', '');
    params.append('username', '');
    params.append('password', '');

   /* let SQL = "SELECT+Id,Opportunity__c,Status__c,IiyadoNetContact__c,InvoiceToName__c,Amount__c," +
      " BankName__c,BranchName__c,AccountType__c,AccountNumber__c,AccountHolder__c,BranchNameSearch__c" +
      " FROM CreditSettlement__c";
    */
    let id = "a015g00000lCrcFAAS";
    let whereId = `WHERE+Id+='${id}'`;
    let SQL = "SELECT+Id,Opportunity__c,Status__c,IiyadoNetContact__c,InvoiceToName__c,Amount__c," +
     "BankName__c,BranchName__c,AccountType__c,AccountNumber__c,AccountHolder__c,BranchNameSearch__c" +
    "+FROM+CreditSettlement__c+" + whereId;

    try {
        let respons = await axios.post('https://login.salesforce.com/services/oauth2/token', params);
        let data = respons.data;
        let accessToken = data.access_token;
        let instanceUrl = data.instance_url;
        console.log(accessToken);
        console.log(instanceUrl);

        // query
        let query = await axios.get(instanceUrl + '/services/data/v56.0/query/?q=' + SQL, {
            headers: {                
                Authorization: "Bearer " + accessToken
            }
        })
        console.log(query.data);

        let testname2 ={
            InvoiceToName__c : '田中　太郎',
          }
        
        //pach
        let PATHCURL = instanceUrl + '/services/data/v56.0/sobjects/CreditSettlement__c/' + id;
        let res = await axios.patch(PATHCURL,testname2,
            {
            headers: {
                Authorization : "Bearer " + accessToken,
                'Content-Type' : 'application/json'
            }
         }
         );
         console.log(res.data);

    } catch (error) {
        console.log(error);
    }

}