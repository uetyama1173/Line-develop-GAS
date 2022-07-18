function kankochijson() {

  place = "寺泊"
  detail = "海"
  detaillink = "https://script.google.com/home/projects/1yXDCPCffe9OtbPBLxl_XFGX26LHXSXpBo5kK-12Jvd2eEAzUI9D5S6sm/edit"

  let ans = [

    {
      "type": "flex",
      "altText": place,
      "contents": {

        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "waa",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "uri": detaillink
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "waa",
              "weight": "bold",
              "size": "xl"
            },
            {
              "type": "box",
              "layout": "vertical",
              "margin": "lg",
              "spacing": "sm",
              "contents": []
            },
            {
              "type": "text",
              "text": detail
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            {
              "type": "button",
              "style": "link",
              "height": "sm",
              "action": {
                "type": "uri",
                "label": "詳細",
                "uri": "aaa"
              }
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [],
              "margin": "sm"
            }
          ],
          "flex": 0,
          "action": {
            "type": "uri",
            "label": "action",
            "uri": "http://linecorp.com/"
          }
        }

      }



    }
  ]

  postData = {
    "messages": ans
  };

  let wao = JSON.stringify(postData)
  console.log(wao)

}
