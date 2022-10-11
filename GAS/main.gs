function reply(data) {
  let agesnum
  let numbersnum
  let favoritePlacesnum


  // POST情報から必要データを抽出;
  let replyToken = data.events[0].replyToken;
  let lineUserId = data.events[0].source.userId;
  let typedata = data.events[0].type;
  let ages = ["young", "middle", "high", "aged"]
  let numbers = ["solo", "duet", "trio", "quintet"]
  let favoritePlaces = ["food", "museum", "secret", "outdoor"]

  let sheet_detail = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME_DETAIL);
  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME_LOG);
  sheet.appendRow([data.events[0]]);
  var sheet_data = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME_MAYBE);
  let useridname = data.events[0].source.userId;
  var sheet_userdata = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME_USER_ID);
  sheet_userdata.appendRow([data.events[0].source.userId]);
  let timestampda = data.events[0].timestamp;

  if (typedata == "message") {
    sheet_data.appendRow([timestampda, useridname]);
  } else if (typedata == "postback") {
    let postbackdata = data.events[0].postback.data;
    if (ages.includes(postbackdata)) {
      sheet_data.appendRow([timestampda, useridname, "ages", ages.indexOf(postbackdata) + 1]);

    } else if (numbers.includes(postbackdata)) {
      sheet_data.appendRow([timestampda, useridname, "numbers", numbers.indexOf(postbackdata) + 1])
    }
    else {
      sheet_data.appendRow([timestampda, useridname, "favoritePlaces", favoritePlaces.indexOf(postbackdata) + 1])
    }
  }

  let land
  let detail
  let imageurl
  let detaillink
  let placekanko

  let nextMode = "default"
  if (typedata == "message") {
    nextMode = "age"
  } else if (typedata == "postback") {
    let postbackdata = data.events[0].postback.data;
    if (ages.includes(postbackdata)) {
      nextMode = "number"
    } else if (numbers.includes(postbackdata)) {
      nextMode = "color"
    } else if (favoritePlaces.includes(postbackdata)) {

      //最終行を取得
      lastdata = sheet_data.getLastRow();
      lastdataUser = sheet_data.getRange(lastdata, 2).getValue();

      agesnum = sheet_data.getRange(lastdata - 2, 4).getValue();
      numbersnum = sheet_data.getRange(lastdata - 1, 4).getValue();
      favoritePlacesnum = sheet_data.getRange(lastdata, 4).getValue();

      placekanko = myFunction(agesnum, numbersnum, favoritePlacesnum) //cos類似度
      //変数(placekanko)に return 値を格納している．


      nextMode = "ans"
    }
  }


  // メッセージAPI送信
  sendMessage(replyToken, nextMode, placekanko);

}

// LINE messaging apiにJSON形式でデータをPOST
function sendMessage(replyToken, nextMode, placekanko) {


  let ageQuestion = [
    {
      "type": "flex",
      "altText": "this is a flex message",
      "contents": {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://uetyama1173.github.io/Line-develop-GAS/img/age2.jpg",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "uri": "http://linecorp.com/"
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "年代を教えて下さい",
              "weight": "bold",
              "size": "xl",
              "margin": "none",
              "align": "center"
            },
            {
              "type": "box",
              "layout": "baseline",
              "margin": "md",
              "contents": []
            }
          ],
          "borderColor": "#696969",
          "cornerRadius": "30px"
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            {
              "type": "button",
              "style": "link",
              "height": "sm",
              "action": {
                "type": "postback",
                "label": "20代",
                "data": "young",
                "displayText": "20代"
              }
            },
            {
              "type": "button",
              "style": "link",
              "height": "sm",
              "action": {
                "type": "postback",
                "label": "30~40代",
                "data": "middle",
                "displayText": "30~40代"
              }
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [],
              "margin": "sm"
            },
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": "50~60代",
                "data": "high",
                "displayText": "50~60代"
              }
            },
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": "60代以上",
                "data": "aged",
                "displayText": "60代以上"
              }
            }
          ],
          "flex": 0
        }
      }

    }
  ]

  let numberQuestion = [
    {

      "type": "flex",
      "altText": "this is a flex message",
      "contents": {


        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://uetyama1173.github.io/Line-develop-GAS/img/who.jpg",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "uri": "http://linecorp.com/"
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "誰と観光へ行きますか？",
              "weight": "bold",
              "size": "xl",
              "margin": "none",
              "align": "center"
            },
            {
              "type": "box",
              "layout": "baseline",
              "margin": "md",
              "contents": []
            }
          ],
          "borderColor": "#696969",
          "cornerRadius": "30px"
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            {
              "type": "button",
              "style": "link",
              "height": "sm",
              "action": {
                "type": "postback",
                "label": "一人旅",
                "data": "solo",
                "displayText": "一人旅"
              }
            },
            {
              "type": "button",
              "style": "link",
              "height": "sm",
              "action": {
                "type": "postback",
                "label": "夫婦・カップル",
                "data": "duet",
                "displayText": "夫婦・カップル"
              }
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [],
              "margin": "sm"
            },
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": "友達",
                "data": "trio",
                "displayText": "友達"
              }
            },
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": "団体(5人以上)",
                "data": "quintet",
                "displayText": "団体(5人以上)"
              }
            }
          ],
          "flex": 0

        }
      }
    }


  ]

  let favoritePlaceQuestion = [
    {
      "type": "flex",
      "altText": "this is a flex message",
      "contents": {

        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://uetyama1173.github.io/Line-develop-GAS/img/likecolor.jpg",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "uri": "http://linecorp.com/"
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "どんな場所が良いですか？",
              "weight": "bold",
              "size": "xl"
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            {
              "type": "button",
              "style": "link",
              "height": "sm",
              "action": {
                "type": "postback",
                "label": "グルメ・カフェ",
                "data": "food",
                "displayText": "グルメ・カフェ"
              }
            },
            {
              "type": "button",
              "style": "link",
              "height": "sm",
              "action": {
                "type": "postback",
                "label": "博物館・美術館",
                "data": "museum",
                "displayText": "博物館・美術館"
              }
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [],
              "margin": "sm"
            },
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": "穴場へ行ってみたい",
                "data": "secret",
                "displayText": "穴場へ行ってみたい"
              }
            },
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": "外で遊びたい！",
                "data": "outdoor",
                "displayText": "外で遊びたい"
              }
            }
          ],
          "flex": 0
        }
      }

    }
  ]

  // replyするメッセージの定義
  let postData = {}

  //Postdata を送ってます．
  if (nextMode == "age") {
    postData = {
      "replyToken": replyToken,
      "messages": ageQuestion
    };
  } else if (nextMode == "number") {
    postData = {
      "replyToken": replyToken,
      "messages": numberQuestion
    };
  } else if (nextMode == "color") {
    postData = {
      "replyToken": replyToken,
      "messages": favoritePlaceQuestion
    };
  } else if (nextMode == "ans") {
    let columnsData = placekanko.map((test) => {
      //アロー関数：functionの代わりのようなもの(=>)
      //観光地(return値)をmapで呼び出し，生成を行っている．
      //.mapメソッド 与えられた関数を配列のすべての要素に対して呼び出し，その結果から新しい配列を生成
      return {
        "thumbnailImageUrl": test.imageurl,
        "title": test.land,
        "text": test.detail,
        "actions": [
          {
            "type": "uri",
            "label": "詳細",
            "uri": `https://script.google.com/macros/s/AKfycbw_jQnSeziriTuwkuxztGtS6QYT3Gxbtptx4VeIbMRlsbfhqWMxvlKuyKkqc2wFUcxD0Q/exec?id=${test.id}`

          }
        ]
      }
    })
    let kankochi = [
      {
        "type": "template",
        "altText": "this is a carousel template",
        "template": {
          "type": "carousel",
          "columns": columnsData
        }
      }




    ]


    postData = {
      "replyToken": replyToken,
      "messages": kankochi
    };
  }



  // リクエストヘッダ
  var headers = {
    "Content-Type": "application/json; charset=UTF-8",
    "Authorization": "Bearer " + ACCESS_TOKEN
  };
  // POSTオプション作成
  var options = {
    "method": "POST",
    "headers": headers,
    "payload": JSON.stringify(postData)
  };
  return UrlFetchApp.fetch(REPLY, options);
}



