function clear(){
  sheet_user.getRange(6, 2, 1, 6).clearContent()
}

function indexOf() {

  let useridname = "U1dcd5c5fa46a5164aec2c94f8efb8b36"

  //Userの行数を返しているだけ
  let UserJudge = userJudge(useridname)

  Logger.log(ssRef_Test(UserJudge,0))

}

//第一引数: 行
function ssRef_Test(userNum,num) {

  //判定
  let refUser = sheet_user.getRange(userNum , 2 + num).getValue()
  return refUser

}

function test() {
  array = [1, 2, 3]
  array.forEach(i => {
    console.log(i);
    console.log(i)
  })

}

function hogee() {

  //判定
  let refSeason = sheet_user.getRange(1, 2).getValue()
  console.log(refSeason)
  return refSeason

}