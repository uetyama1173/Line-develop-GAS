var SHEET_ID = '1Fh11dX0rqX2vc40sPRIYtN2MqSATH588k0LE_4pZdyQ';// 利用しているシート
var SHEET_NAME = 'faq';// 利用しているSSのシート名（※変えるとみえなくなる）
var SHEET_NAME_MAYBE = 'maybe';// 利用しているもしかしてSSのシート名（※変えるとみえなくなる）
var SHEET_NAME_USER_ID = 'userId';
var SHEET_NAME_LOG = 'chatLog';
var SHEET_NAME_DETAIL ='shousai'


// LINE Message API アクセストークン
var ACCESS_TOKEN = "Zh2DtBRmmgS6txv9AFji1PeLYTKiBQSybL0iRSj3y8i2ORCnxIF4sob1d5p7W4rWVsoL+T44+qKg/qsnraSdx/POivkCQm2Fe8204WJDN4Oi5DRG8YGH9m4lvxO5D0EQ1JE0zZX75TG8RlwPoO6FEwdB04t89/1O/w1cDnyilFU=";
var PUSH = "https://api.line.me/v2/bot/message/push";// 通知URL
var REPLY = "https://api.line.me/v2/bot/message/reply";// リプライ時URL
var PROFILE = "https://api.line.me/v2/profile";// プロフィール取得URL


/**
 * doPOST
 * POSTリクエストのハンドリング
 */
function doPost(e) {
  var json = JSON.parse(e.postData.contents);
  
  reply(json);
}

/** 
 * doGet
 * GETリクエストのハンドリング
 */
// function doGet(e) {
//     // return ContentService.createTextOutput("SUCCESS");

//     // データの成形

//   // console.log(responseList);

//   // レスポンス
//   var response = {
    
//     meta: { status: 'success' }
//   };
//     return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);

// }

function replyTextMessage(replyToken, replyText) {  
  var postData = {
    "replyToken" : replyToken,
    "messages" : [
      {
        "type" : "flex",
        "flex" : replyText
      }
    ]
  };
  replyMessage(postData);
}

function getUserDisplayName(userId) {
  var url = 'https://api.line.me/v2/bot/profile/' + userId;
  var userProfile = UrlFetchApp.fetch(url,{
    'headers': {
      'Authorization' :  'Bearer ' + ACCESS_TOKEN,
    },
  })
  return JSON.parse(userProfile).displayName;
}

