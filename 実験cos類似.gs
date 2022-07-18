//let SHEET_NAME_DETAIL = 'shousai'
//let sheet_detail = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME_DETAIL);
function kekka(){
 (jikkencos(1,2,3))
}

function jikkencos(agesnum, numbersnum, colorsnum) {
  //空配列を作成している．
  var list = [];

  //データセット 観光地のベクトルを設定
  const teradomari = [1, 2, 2]
  const kokueipark = [1, 3, 4]
  const sauna = [2, 1, 3]
  const museum = [3, 2, 1]
  const settapark = [4, 2, 2]

  let kekka = [agesnum, numbersnum, colorsnum]

  let sum = 0;
  let sum2 = 0;
  let sum3 = 0;

  const place = [teradomari, kokueipark, sauna, museum, settapark]
  const str_place = ["1", "2", "3", "4", "5"]

    //kekkaのノルム
    for (let i = 0; i < 3; i++) {
      let kekka2 = [kekka[0] ** 2, kekka[1] ** 2, kekka[2] ** 2]
      sum += kekka2[i];
    }

      console.log(sum)

   for (let j = 0; j < place.length; j++) {

    const kekkanolm = Math.pow(sum, 0.5);

    //placeのノルム 各配列要素を2乗にしている mapメソッド各配列を指定
    const map1 = place[j].map(x => x ** 2);

    for (let i = 0; i < map1.length; i++) {
      sum2 += map1[i];
    }

    const resultnolm = Math.pow(sum2, 0.5);


    //cos類似度(分子)
    let cos = [kekka[0] * place[j][0], kekka[1] * place[j][1], kekka[2] * place[j][2]]

    for (let i = 0; i < cos.length; i++) {
      sum3 += cos[i];
    }

    const bunshi = sum3
    
    let ruijido = bunshi / (kekkanolm * resultnolm)




    list.push(ruijido)

    //console.log(`${place[j]}の類似度:${ruijido}`);


  }

  let spot = [[list[0], str_place[0]], [list[1], str_place[1]], [list[2], str_place[2]], [list[3], str_place[3]], [list[4], str_place[4]]]



  let m1 = 0
  let max1_i
  let max2_i
  let max3_i
  let m2 = 0
  let m3 = 0

  for (let i = 0; i < place.length; i++) {
    if (spot[i][0] > m1) {
      m1 = spot[i][0];
      max1_i = i;
    } else if (spot[i][0] > m2) {
      m2 = spot[i][0];
      max2_i = i;
    } else if (spot[i][0] > m3) {
      m3 = spot[i][0];
      max3_i = i;
    }
  }





  for (let i = 2; i < place.length + 2; i++) {
    if (spot[max1_i][1] == sheet_detail.getRange(`A${i}`).getValues()) {
      land = sheet_detail.getRange(`B${i}`).getValue()
      detail = sheet_detail.getRange(`C${i}`).getValue()
      imageurl = sheet_detail.getRange(`D${i}`).getValue()
      detaillink = sheet_detail.getRange(`E${i}`).getValue()
    } else if (spot[max2_i][1] == sheet_detail.getRange(`A${i}`).getValues()) {
      land2 = sheet_detail.getRange(`B${i}`).getValue()
      detail2 = sheet_detail.getRange(`C${i}`).getValue()
      imageurl2 = sheet_detail.getRange(`D${i}`).getValue()
      detaillink2 = sheet_detail.getRange(`E${i}`).getValue()
    } else {
      land3 = sheet_detail.getRange(`B${i}`).getValue()
      detail3 = sheet_detail.getRange(`C${i}`).getValue()
      imageurl3 = sheet_detail.getRange(`D${i}`).getValue()
      detaillink3 = sheet_detail.getRange(`E${i}`).getValue()
    }

    // console.log("1番類似度の高い観光地" + spot[max1_i][1])
    // console.log("2番類似度の高い観光地" + spot[max2_i][1])
    // console.log("3番類似度の高い観光地" + spot[max3_i][1])




    resultkanko = [land, detail, imageurl, detaillink]

    return (resultkanko)




  }
}
