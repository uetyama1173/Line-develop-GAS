/**
 * 質問IDの取得とuserシートに書き込みを行う関数
 * @param {number}usernum - LINEから送信されたユーザーID情報
 * @paream{number}row - ユーザーの質問IDが含まれる列
 * @return{number}random - 質問ID
 */
function outQuestion_ID(usernum, row) {

  //質問数取得
  let lastdata = sheet_user.getLastRow()
  
  //ユーザの質問IDを取得
  let hasAnswered = sheet_user.getRange(usernum, row).getValue()
  
  //2行目から最終行
  var min = 1, max = lastdata;

  while(true){
    var question_ID = Math.floor(Math.random() * (max + 1 - min)) + min;
    if(question_ID != hasAnswered){
      question_ID
      break
    }
  }

  //userテーブルに質問IDを書き込み
  write_QueId = sheet_user.getRange(usernum, 5).setValue(question_ID)

  //質問文をセット
  // 後日、実装　let question_img = 
  //質問内容
  // let question_content = sheet_user.getRange(question_ID + 1, 2).getValue()
  // let question_ans_first = sheet_user.getRange(question_ID + 1, 3).getValue()
  // let question_ans_second = sheet_user.getRange(question_ID + 1, 4).getValue()
  // let question_ans_third = sheet_user.getRange(question_ID + 1, 5).getValue()
  // let question_ans_force = sheet_user.getRange(question_ID + 1, 6).getValue()

  return question_ID

  
}



