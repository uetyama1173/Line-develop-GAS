function ssRef_test(userNum,num) {

  //判定
  let refUser = sheet_user.getRange(userNum , 2 + num).getValue()
  return refUser

}

function afe(){
  console.log(ssRef_Test(6,2))
}