  let land
  let detail
  let imageurl
  let detaillink
  let land2
  let detail2
  let imageurl2
  let detaillink2
  let land3
  let detail3
  let imageurl3
  let detaillink3

function main() {

  var SHEET_NAME_DETAIL = 'shousai'
  let sheet_detail = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME_DETAIL);
  var SHEET_NAME_MAYBE = 'maybe'
  var sheet_data = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME_MAYBE);

  //最終行を取得
  lastdata = sheet_data.getLastRow();
  lastdataUser = sheet_data.getRange(lastdata, 2).getValue();
  //最新のユーザー情報を取得
  agesnum = sheet_data.getRange(lastdata - 2, 4).getValue();
  numbersnum = sheet_data.getRange(lastdata - 1, 4).getValue();
  colorsnum = sheet_data.getRange(lastdata, 4).getValue();


  placekanko = myFunction(agesnum, numbersnum, colorsnum)

  console.log(placekanko)

  jikko(placekanko)

}

function jikko(placekanko) {

  let kankochi = [
    {
      "type": "template",
      "altText": "this is a carousel template",
      "template": {
        "type": "carousel",
        "columns": [
          {
            "thumbnailImageUrl": imageurl,
            "title": land,
            "text": detail,
            "actions": [
              {
                "type": "uri",
                "label": "詳細",
                "uri": detaillink
              }
            ]
          },
          {
            "thumbnailImageUrl": imageurl2,
            "title": land2,
            "text": detail2,
            "actions": [
              {
                "type": "uri",
                "label": "詳細",
                "uri": detaillink2
              }
            ]
          },
          {
            "thumbnailImageUrl": imageurl3,
            "title": land3,
            "text": detail3,
            "actions": [
              {
                "type": "uri",
                "label": "詳細",
                "uri": detaillink3
              }
            ]
          }
        ]
      }
    }


  ]

  postData = {
    "messages": kankochi
  };

  let testmodel = JSON.stringify(postData)
  console.log(testmodel)

}

function myFunction(agesnum, numbersnum, colorsnum) {

  let list = [];
  //データセット 観光地のベクトルを設定
  const teradomari = [1, 2, 2]
  const kokueipark = [1, 3, 4]
  const sauna = [2, 1, 3]
  const museum = [3, 2, 1]
  const settapark = [4, 2, 2]

  //宣言 
  let SHEET_NAME_DETAIL = 'shousai'
  let sheet_detail = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME_DETAIL);
  let personality = [agesnum, numbersnum, colorsnum]
  const place = [teradomari, kokueipark, sauna, museum, settapark]
  const str_place = ["1", "2", "3", "4", "5"]

  //agesnum numbers colors のノルム
  let personalitynolm = [(personality[0] ** 2 + personality[1] ** 2 + personality[2] ** 2) ** 0.5]

  for (let j = 0; j < place.length; j++) {

    //placeのノルム 各配列要素を2乗にしている mapメソッド各配列を指定
    const map1 = place[j].map(x => x ** 2);

    //place配列の二乗総和
    const reducer = (accumulator, curr) => accumulator + curr;
    map1total = map1.reduce(reducer);
    const placenolm = Math.pow(map1total, 0.5);

    //cos類似度
    let bunshi = personality[0] * place[j][0] + personality[1] * place[j][1] + personality[2] * place[j][2]
    let ruijido = bunshi / (personalitynolm * placenolm)
    list.push(ruijido)
    //  簡略化に繋がるかもしれない list.push([ruijido,str_place[j]])
  }
  let spot = [[list[0], str_place[0]], [list[1], str_place[1]], [list[2], str_place[2]], [list[3], str_place[3]], [list[4], str_place[4]]]

  //sort関数で昇順へ
  spotshojun = spot.sort();
  let max = spotshojun[spotshojun.length - 1];
  let max2 = spotshojun[spotshojun.length - 2];
  let max3 = spotshojun[spotshojun.length - 3];

  let land
  let detail
  let imageurl
  let detaillink
  let land2
  let detail2
  let imageurl2
  let detaillink2
  let land3
  let detail3
  let imageurl3
  let detaillink3

  console.log(max2[1])

  for (let i = 2; i < place.length + 2; i++) {
    if (max[1] == sheet_detail.getRange(`A${i}`).getValue()) {
      land = sheet_detail.getRange(`B${i}`).getValue()
      detail = sheet_detail.getRange(`C${i}`).getValue()
      imageurl = sheet_detail.getRange(`D${i}`).getValue()
      detaillink = sheet_detail.getRange(`E${i}`).getValue()
    } else if (max2[1] == sheet_detail.getRange(`A${i}`).getValue()) {
      land2 = sheet_detail.getRange(`B${i}`).getValue()
      detail2 = sheet_detail.getRange(`C${i}`).getValue()
      imageurl2 = sheet_detail.getRange(`D${i}`).getValue()
      detaillink2 = sheet_detail.getRange(`E${i}`).getValue()
    } else if (max3[1] == sheet_detail.getRange(`A${i}`).getValue()) {
      land3 = sheet_detail.getRange(`B${i}`).getValue()
      detail3 = sheet_detail.getRange(`C${i}`).getValue()
      imageurl3 = sheet_detail.getRange(`D${i}`).getValue()
      detaillink3 = sheet_detail.getRange(`E${i}`).getValue()
    }
  }

  resultkanko = [land,detail,imageurl,detaillink,land2,imageurl2,detaillink2,land3,detail3,imageurl3,detaillink3]
  return(resultkanko)




}
