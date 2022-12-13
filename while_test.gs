function myFunction(usernum, row) {

  //質問数取得
  let lastdata = sheet_user.getLastRow()

  //ユーザの質問IDを取得
  let hasAnswered = [2, 4]

  var min = 1, max = lastdata;

  while (true) {
    random = Math.floor(Math.random() * (max + 1 - min)) + min;
    if (random != hasAnswered[0] && random != hasAnswered[1]) {
      random
      break
    }
  }

  //質問IDを返す
  return random
}

function outputtest() {
  //観光スポット数
  let place_kanko_total = sheet_shosai.getLastRow() 
  console.log(place_kanko_total)


  //cos類似度計算
  for (let i = 2; i <= place_kanko_total; i++) {
    console.log(i)
  }

}