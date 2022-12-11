function myFunction(usernum, row) {

  //質問数取得
  let lastdata = sheet_user.getLastRow()
  
  //ユーザの質問IDを取得
  let hasAnswered = sheet_user.getRange(usernum, row).getValue()
  
  var min = 1, max = lastdata;

  while(true){
    random = Math.floor(Math.random() * (max + 1 - min)) + min;
    if(random != hasAnswered){
      random
      break
    }
  }

  //質問IDを返す
  return random  
}

function outputtest(){
  console.log(outQuestion_ID(6,5))
}

