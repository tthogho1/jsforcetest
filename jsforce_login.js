var jsforce = require('jsforce');
const test = require('./salesforcetest');
//var oauth_login_url = 'https://test.salesforce.com';
//// 本番環境へ接続する場合のAPIエンドポイント

var oauth_login_url = 'https://login.salesforce.com';
// Salesforce REST APIで接続するアプリケーションの「コンシューマ鍵」を設定する
var oauth_client_id = '';
// Salesforce REST API接続用のSalesforceユーザ名を設定する
var oauth_client_username = '';
var oauth_client_secret = '';
var oauth_client_authenticate_password = '';

var conn = new jsforce.Connection({
  oauth2 : {
    loginUrl : oauth_login_url,
    clientId : oauth_client_id,
    clientSecret : oauth_client_secret
  }
});

async function doTest(conn) {
  let userInfo = await conn.login(oauth_client_username, oauth_client_authenticate_password); 
  
  console.log(conn.accessToken);
  console.log(conn.instanceUrl);
  // logged in user property
  console.log("User ID: " + userInfo.id);
  console.log("Org ID: " + userInfo.organizationId);

  await test.salesforceTest(conn,userInfo);
}

doTest(conn);
