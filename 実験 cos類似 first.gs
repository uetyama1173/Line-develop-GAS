

function jikken1() {
var SHEET_NAME_DETAIL = 'shousai'
let sheet_detail = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME_DETAIL);
var SHEET_NAME_MAYBE = 'maybe'
var sheet_data = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME_MAYBE);

  agesnum = 2
  numbersnum = 2
  colorsnum = 3

  let list = [];
  const teradomari = [1, 2, 2]
  const kokueipark = [1, 3, 4]
  const sauna = [2, 1, 3]
  const museum = [3, 2, 1]
  const settapark = [4, 2, 2]


  let personality = [agesnum, numbersnum, colorsnum]

  let sum = 0;
  let sum2 = 0;
  let sum3 = 0;

  const place = [teradomari, kokueipark, sauna, museum, settapark]
  const str_place = ["1", "2", "3", "4", "5"]

  //agesnum numbers colors のノルム
  personalitynolm2 = [personality[0] ** 2, personality[1] ** 2, personality[2] ** 2]

  for (let i = 0; i < 3; i++) {
    sum += personalitynolm2[i];
  }
  const personalitynolm = Math.pow(sum, 0.5);

  for (let j = 0; j < place.length; j++) {

    //各配列を二乗している．
    const map1 = place[j].map(x => x ** 2);


    //place配列の二乗(map1)総和 
    const reducer = (accumulator, curr) => accumulator + curr;
    map1total = map1.reduce(reducer);
    const placenolm = Math.pow(map1total, 0.5);

    //cos類似度
    let bunshi = personality[0] * place[j][0] + personality[1] * place[j][1] + personality[2] * place[j][2]
    let ruijido = bunshi / (personalitynolm * placenolm)


    //  簡略化に繋がるかもしれない list.push([ruijido,str_place[j]])

    list.push(ruijido)

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
    if (spot[max1_i][1] == sheet_detail.getRange(`B${i}`).getValue()) {
      land = sheet_detail.getRange(`B${i}`).getValue()
      detail = sheet_detail.getRange(`C${i}`).getValue()
      imageurl = sheet_detail.getRange(`D${i}`).getValue()
      detaillink = sheet_detail.getRange(`E${i}`).getValue()
    } else if (spot[max2_i][1] == sheet_detail.getRange(`B${i}`).getValue()) {
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
  }

  console.log("1番類似度の高い観光地" + spot[max1_i][1])
  console.log("2番類似度の高い観光地" + spot[max2_i][1])
  console.log("3番類似度の高い観光地" + spot[max3_i][1])



}

