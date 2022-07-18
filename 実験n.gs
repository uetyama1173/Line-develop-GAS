function jikken() {

  let sheet_detail = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME_DETAIL);
  for (let i = 2; i < 7; i++) {


    if ("2" == sheet_detail.getRange(`A${i}`).getValues()) {
      place = sheet_detail.getRange(`B${i}`).getValue()
      detail = sheet_detail.getRange(`C${i}`).getValue()
      imageurl = sheet_detail.getRange(`D${i}`).getValue()
      detaillink = sheet_detail.getRange(`E${i}`).getValue()

      // console.log(typeof(place))
      // console.log(imageurl)
    }




  }
}


 function jikken2() {


   let  obj 


}

 function jikken3() {

   for(i=0;i<5;i++){
     console.log("aiu");
   }
let count
   if(i>3){
     count = 10;
     console.log(count)
   }

   console.log(count);



}


