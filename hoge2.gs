function yahoo(usernum, row, q2_row) {

  let hasAnswered = sheet_user.getRange(usernum, row, 1, q2_row).getValues()

  var min = 1, max = 9;

  while (true) {
    var question_ID = Math.floor(Math.random() * (max + 1 - min)) + min;
    if (question_ID != hasAnswered[0][0] && question_ID != hasAnswered[0][1]) {
      question_ID
      break
    }
  }

  return question_ID

}

function aaiuiew(){
  console.log(yahoo(6,5,7))

}
