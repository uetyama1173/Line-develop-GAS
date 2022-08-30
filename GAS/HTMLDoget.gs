function doGet(e) {
  id = e.parameter.id

  numrow = sheet_detail.getLastRow()
  numcolums = sheet_detail.getLastColumn()
  sheetdata = sheet_detail.getSheetValues(2, 1, numrow - 1, numcolums)
  data = sheetdata.filter((d) => {
    return d[0] == id
  })

  land = data[1]
  imageurl = data[3]
  outline = data[5]
  eigyojikan = data[6]
  closedday = data[7]
  officiallink = data[8]

  return HtmlService.createTemplateFromFile('index').evaluate();

}

//宣言
var SHEET_ID = '1Fh11dX0rqX2vc40sPRIYtN2MqSATH588k0LE_4pZdyQ';// 利用しているシート
var SHEET_NAME_DETAIL = 'shousai'
let sheet_detail = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME_DETAIL);
//let land = sheet_detail.getRange(`B${1}`).getValue()



//関数呼び出し
// let land = myFunction()[0]
// let imageurl = myFunction()[2]
// let outline = myFunction()[4]
// let eigyojikan = myFunction()[5]
// let closedday = myFunction()[6]
// let officiallink = myFunction()[7]



function test() {
  numrow = sheet_detail.getLastRow()
  numcolums = sheet_detail.getLastColumn()
  sheetdata = sheet_detail.getSheetValues(2, 1, numrow - 1, numcolums)
  console.log(sheetdata[5])
}