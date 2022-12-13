function foo() {
  let best_place = cosRuiji(6)
  console.log(best_place[1][0].imgUrl)

}

function send(best_place) {

  let hoge = best_place[0].imgUrl

  return hoge
}


function cosRuiji_test() {

  //ユーザの質問回答
  let ans_user1 = sheet_user.getRange(6, 2).getValue()
  let ans_user2 = sheet_user.getRange(6, 3).getValue()
  let ans_user3 = sheet_user.getRange(6, 4).getValue()

  //観光スポット数
  let place_kanko_total = sheet_shosai.getLastRow()

  let list = []

  //cos類似度計算
  for (let i = 2; i < place_kanko_total; i++) {

    //SSで観光地のパラメータ値を取得
    let ans1 = sheet_shosai.getRange(i, 10).getValue()
    let ans2 = sheet_shosai.getRange(i, 11).getValue()
    let ans3 = sheet_shosai.getRange(i, 12).getValue()

    //SSから観光地情報を取得
    let id = sheet_shosai.getRange(i, 1).getValue()
    let land = sheet_shosai.getRange(i, 2).getValue()
    let imgUrl = sheet_shosai.getRange(i, 4).getValue()
    let detailText = sheet_shosai.getRange(i, 3).getValue()
    let address = sheet_shosai.getRange(i, 5).getValue()


    //cos類似度計算
    const bunshi = (ans1 * ans_user1 + ans2 * ans_user2 + ans3 * ans_user3)
    const bunbo = Math.sqrt((ans1 ** 2 + ans2 ** 2 + ans3 ** 2) * (ans_user1 ** 2 + ans_user2 ** 2 + ans_user3 ** 2))
    cosRuiji = [{ id: id, land: land, imgUrl: imgUrl, detailText: detailText, address: address, ruijido: bunshi / bunbo }]

    // 配列を追加している
    list.push(cosRuiji)

  }

  //sort　昇順
  list.sort(function (a, b) {
    return a[0].ruijido - b[0].ruijido;
  });


  //要素を取り出す
  let max1 = list.pop()
  let max2 = list.pop()
  let max3 = list.pop()

  //最適化された観光地の空配列を生成する
  let bestland = [max1, max2, max3]





  return bestland

}




function hoge(test_place) {

  let hoge = cosRuiji()


  let kankochiAnswer = [

    {
      "type": "template",
      "altText": "this is a carousel template",
      "template": {
        "type": "carousel",
        "columns": [
          {
            "thumbnailImageUrl": hoge[0].imgUrl,
            "title": hoge[0].land,
            "text": hoge[0].detailText,
            "actions": [
              {
                "type": "uri",
                "label": "詳細",
                "uri": `https://script.google.com/a/macros/style-arts.jp/s/AKfycbzYZ2-Ez4DexD1PDDAM6pDuvPtcbDpPpqOLSL70FUlH-C80FA7p3gf_0v1LeRxxbE4A/exec?id=${hoge[0].id}`
              }
            ]
          },
          {
            "thumbnailImageUrl": hoge[1].imgUrl,
            "title": hoge[1].land,
            "text": hoge[1].detailText,
            "actions": [
              {
                "type": "uri",
                "label": "詳細",
                "uri": `https://script.google.com/a/macros/style-arts.jp/s/AKfycbzYZ2-Ez4DexD1PDDAM6pDuvPtcbDpPpqOLSL70FUlH-C80FA7p3gf_0v1LeRxxbE4A/exec?id=${hoge[1].id}`
              }
            ]
          },
          {
            "thumbnailImageUrl": hoge[2].imgUrl,
            "title": hoge[2].land,
            "text": hoge[2].detailText,
            "actions": [
              {
                "type": "uri",
                "label": "詳細",
                "uri": `https://script.google.com/a/macros/style-arts.jp/s/AKfycbzYZ2-Ez4DexD1PDDAM6pDuvPtcbDpPpqOLSL70FUlH-C80FA7p3gf_0v1LeRxxbE4A/exec?id=${hoge[2].id}`
              }
            ]
          }
        ]
      }
    }


  ]

  console.log(kankochiAnswer)
  console.log(kankochiAnswer.template)


}

