const jsforce = require('jsforce');
const jwt = require("salesforce-jwt-bearer-token-flow");

var oauth_login_url = 'https://login.salesforce.com';
// Salesforce REST APIで接続するアプリケーションの「コンシューマ鍵」を設定する
var oauth_client_id = '';
// Salesforce REST API接続用のSalesforceユーザ名を設定する
var oauth_client_username = '';
//  Salesforce REST APIで接続するアプリケーションの「コンシューマの秘密」を設定する
//var oauth_client_secret = '';
//var oauth_client_authenticate_password = '';

// create the connection to the org
let conn = new jsforce.Connection();

// load the private key for the token
let privateKey = require('fs').readFileSync('./myapp.pem');

async function doTest(conn) {
    let response = jwt.getToken({
        iss: oauth_client_id,
        sub: oauth_client_username,
        aud: oauth_login_url,
        privateKey: privateKey
    },function(err,token) {
        console.log(token);
        conn.initialize({
            instanceUrl: response.instance_url,
            accessToken: response.access_token
        });
        test.salesforceTest(conn,userInfo);
    });
   // console.log('Successfully connected to Org');
   // console.log(conn.accessToken);
   // console.log(conn.instanceUrl);
    // logged in user property
   // console.log("User ID: " + userInfo.id);
   // console.log("Org ID: " + userInfo.organizationId);

};

doTest(conn);

  
  

 