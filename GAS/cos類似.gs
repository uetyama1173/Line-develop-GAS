//Test
function main() {

  var SHEET_NAME_DETAIL = 'shousai'
  let sheet_detail = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME_DETAIL);
  var SHEET_NAME_MAYBE = 'maybe'
  var sheet_data = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME_MAYBE);

  //最終行を取得
  lastdata = sheet_data.getLastRow();
  console.log(lastdata)
  lastdataUser = sheet_data.getRange(lastdata, 2).getValue();
  //最新のユーザー情報を取得
  agesnum = sheet_data.getRange(lastdata - 2, 4).getValue();
  numbersnum = sheet_data.getRange(lastdata - 1, 4).getValue();
  colorsnum = sheet_data.getRange(lastdata, 4).getValue();

  //   jikko(myFunction(agesnum, numbersnum, colorsnum))


}

//Test
function jikko(placekanko) {

  let kankochi = [
    {
      "type": "template",
      "altText": "this is a carousel template",
      "template": {
        "type": "carousel",
        "columns": [

          //  return [land,detail,imageurl,detaillink,land2,detail2,imageurl2,detaillink2,land3,detail3,imageurl3,detaillink3]
          {
            "thumbnailImageUrl": placekanko[2],
            "title": placekanko[0],
            "text": placekanko[1],
            "actions": [
              {
                "type": "uri",
                "label": "詳細",
                "uri": placekanko[3]
              }
            ]
          },
          {
            "thumbnailImageUrl": placekanko[6],
            "title": placekanko[4],
            "text": placekanko[5],
            "actions": [
              {
                "type": "uri",
                "label": "詳細",
                "uri": placekanko[7]
              }
            ]
          },
          {
            "thumbnailImageUrl": placekanko[10],
            "title": placekanko[8],
            "text": placekanko[9],
            "actions": [
              {
                "type": "uri",
                "label": "詳細",
                "uri": placekanko[11]
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


}

//cos類似度計算
function myFunction(agesnum, numbersnum, colorsnum) {

  let list = [];
  //データセット 観光地のベクトルを設定
  // age howmany color
  const teradomari = [1, 2, 2]
  const kokueipark = [1, 3, 4]
  const nagaoka_hanabikan = [2, 1, 3]
  const yukyuyama_park = [3, 2, 1]
  const settaya = [4, 2, 2]
  const wahima_auto_camp = [1, 3, 2]
  const ochimizu = [2, 3, 4]
  const hanabikan = [2, 2, 3]
  const yamamoto_kinenkan = [4, 1, 4]
  const kinpushrine = [2, 2, 4]
  //10
  const oguni_park = [3, 2, 4]
  const hakkkoku_mt = [2, 1, 4]
  const oguni_seseragipark = [2, 3, 4]
  const washima_eki = [3, 2, 2]
  const hachisuba = [1, 2, 2]
  const momijien = [2, 2, 1]
  const hasegawatei = [1, 2, 3]
  const hotarunosato = [2, 2, 3]
  const tomogaoka_park = [2, 1, 4]
  const masugatayama_park = [2, 2, 4]
  //20
  const gas_plant = [2, 2, 2]
  const settaya_museum = [2, 3, 4]
  const hujihashi = [2, 1, 3]
  const izumosaki_eki = [2, 2, 2]
  const teradomari_aquarium = [2, 3, 2]
  const nakayamazuido = [1, 2, 2]
  const koshiji_kokorate = [2, 2, 3]
  const tanada = [2, 2, 4]
  const eguchidango = [2, 2, 3]
  const toxurumondo = [2, 2, 3]
  //30


  //宣言 
  let SHEET_NAME_DETAIL = 'shousai'
  let sheet_detail = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME_DETAIL);
  let personality = [agesnum, numbersnum, colorsnum]
  const place = [teradomari, kokueipark, nagaoka_hanabikan, yukyuyama_park, settaya, wahima_auto_camp, ochimizu, hanabikan, yamamoto_kinenkan, kinpushrine, oguni_park, hakkkoku_mt, oguni_seseragipark, washima_eki, hachisuba, momijien, hasegawatei, hotarunosato, tomogaoka_park, masugatayama_park, gas_plant, settaya_museum, hujihashi, izumosaki_eki, teradomari_aquarium, nakayamazuido, koshiji_kokorate, tanada, eguchidango, toxurumondo]
  const str_place = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"]

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
    list.push(ruijido, str_place[j])

    //  簡略化に繋がるかもしれない list.push([ruijido,str_place[j]])
  }

  //配列をn個に分割できる関数
  function dividelistIntoPieces(list, n) {
    var listList = [];
    var idx = 0;
    while (idx < list.length) {
      listList.push(list.splice(idx, idx + n));
    }
    return listList;
  }

  //配列を2個指定: ex [[1,2],[2,3]・・・]
  let listsprit = dividelistIntoPieces(list, 2);

  //sort関数で昇順へ ※デフォルト状態で動いている
  listshojun = listsprit.sort();




  let max = listshojun[listshojun.length - 1];

  let max2 = listshojun[listshojun.length - 2];
  let max3 = listshojun[listshojun.length - 3];



  let land
  let detail
  let imageurl
  let detaillink
  let outline
  let eigyojikan
  let closedday
  let officiallink
  let land2
  let detail2
  let imageurl2
  let detaillink2
  let outline2
  let eigyojikan2
  let closedday2
  let officiallink2
  let land3
  let detail3
  let imageurl3
  let detaillink3
  let outline3
  let eigyojikan3
  let closedday3
  let officiallink3
  let spots = []
  //配列
  for (let i = 2; i < place.length + 2; i++) {
    let spot = {}
    //オブジェクト
    if (max[1] == sheet_detail.getRange(`A${i}`).getValue()) {
      spot.id = sheet_detail.getRange(`A${i}`).getValue()
      spot.land = sheet_detail.getRange(`B${i}`).getValue()
      spot.detail = sheet_detail.getRange(`C${i}`).getValue()
      spot.imageurl = sheet_detail.getRange(`D${i}`).getValue()
      spot.detaillink = sheet_detail.getRange(`E${i}`).getValue()
      spot.outline = sheet_detail.getRange(`F${i}`).getValue()
      spot.eigyojikan = sheet_detail.getRange(`G${i}`).getValue()
      spot.closedday = sheet_detail.getRange(`H${i}`).getValue()
      spot.officiallink = sheet_detail.getRange(`I${i}`).getValue()
      spots.push(spot)
    } else if (max2[1] == sheet_detail.getRange(`A${i}`).getValue()) {
      spot.id = sheet_detail.getRange(`A${i}`).getValue()
      spot.land = sheet_detail.getRange(`B${i}`).getValue()
      spot.detail = sheet_detail.getRange(`C${i}`).getValue()
      spot.imageurl = sheet_detail.getRange(`D${i}`).getValue()
      spot.detaillink = sheet_detail.getRange(`E${i}`).getValue()
      spot.outline = sheet_detail.getRange(`F${i}`).getValue()
      spot.eigyojikan = sheet_detail.getRange(`G${i}`).getValue()
      spot.closedday = sheet_detail.getRange(`H${i}`).getValue()
      spot.officiallink = sheet_detail.getRange(`I${i}`).getValue()
      spots.push(spot)
    } else if (max3[1] == sheet_detail.getRange(`A${i}`).getValue()) {
      spot.id = sheet_detail.getRange(`A${i}`).getValue()
      spot.land = sheet_detail.getRange(`B${i}`).getValue()
      spot.detail = sheet_detail.getRange(`C${i}`).getValue()
      spot.imageurl = sheet_detail.getRange(`D${i}`).getValue()
      spot.detaillink = sheet_detail.getRange(`E${i}`).getValue()
      spot.outline = sheet_detail.getRange(`F${i}`).getValue()
      spot.eigyojikan = sheet_detail.getRange(`G${i}`).getValue()
      spot.closedday = sheet_detail.getRange(`H${i}`).getValue()
      spot.officiallink = sheet_detail.getRange(`I${i}`).getValue()
      spots.push(spot)//オブジェクトでまとめたものを配列化している．
    }
  }

  console.log(spots)

  return spots
  // return [land, detail, imageurl, detaillink, outline, eigyojikan, closedday, officiallink, land2, detail2, imageurl2, detaillink2, outline2, eigyojikan2, closedday2, officiallink2, land3, detail3, imageurl3, detaillink3, outline3, eigyojikan3, closedday3, officiallink3]






}
