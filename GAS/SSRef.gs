function ssRef(num) {

  //最終行を取得
  let lastdata = sheet_data.getLastRow() - num;

  //判定
  let refSeason = sheet_data.getRange(lastdata, 3).getValue()


  return refSeason

}

function userJudge() {
  //最終行を取得
  let lastdata = sheet_user.getLastRow()

  //A列のUserIdを探索
  //0 ~ lastdata(3)
  let array = []
  for (let i = 0; i < lastdata -1 ; ++i) {
    let userid_getValue = sheet_user.getRange(i + 2, 1).getValue()
    array.push(userid_getValue)
  }

  //ID判定
  //もし、送信先のIDとスプシのusertableにuserIDが一致していれば
  for(let i = 0; i< array.length; ++i){
    if('hoge' === array[i]){
      //質問メッセージを送信
      

    }
    else{
      //やり直し
    }
  }

}