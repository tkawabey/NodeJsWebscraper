// ポート番号の定数
const PORT = 8000;

// expressモジュールを使用する宣言を行います
const express = require("express");
// axiosモジュールを使用する宣言を行います
const axios = require("axios");
// cheerioモジュールを使用する宣言を行います
const cheerio = require("cheerio");
// iconv-liteモジュールを使用する宣言を行います
var iconv = require('iconv-lite')
// requestモジュールを使用する宣言を行います
const request = require('request')
// expressインスタンスを作成
const app = express();

// スクレイパーするURLを定義
const URL = "https://www.rakuten.co.jp/category/202178/";
// 取得したデータを保存する配列
const data = [];


//
// 指定したURLにリクエストを送り、レスポンスを解析する。
// 
request(URL, (e, response, body) => {
    if (e) {
        console.error(e)
    }
    try {
        // cheerioを使用して、レスポンスを解析します
        const $ = cheerio.load(body);

        // 取得したいdivタグのクラス名を指定します。ここではsearchresultitem
        $(".searchresultitem")
        // searchresultitemクラスのdivタグは複数とれるでの、eachメソッドでコールバックを登録します
        .each(function(){
            // titleクラスのテキストを取得
            const title = $(this).find(".title").text();
            // importantクラスのテキストを取得
            const price  = $(this).find(".important").text();
            //console.log(title + "  -  " + price);
            data.push({title, price});
        });


        console.log(data);
     } catch (e) {
         console.error(e);
     }
});


//  
// //  axiosのdataが文字化けするので、requestを使用する。
// //
// const axiosInst = axios.create({
//    responseType: 'arraybuffer',
//    responseEncoding: 'binary',
// });
// axiosで指定したURLの情報を取得
// //axiosInst.get(URL)
// axios(URL)
// //axios.get(URL, {responseType: 'arraybuffer', responseEncoding: 'binary'})
// .then(function(response) {
//        // 非同期で取得したレスポンスの情報
//        const bodyText = response.data;

//        //var body = iconv.decode(Buffer.from(response.data), 'Shift-JIS')
//        //console.log(body)
//        // cheerioを使用して、レスポンスを解析します
//        const $ = cheerio.load(bodyText);
       
//        // 取得したいdivタグのクラス名を指定します。ここではsearchresultitem
//        $(".searchresultitem")
//        // searchresultitemクラスのdivタグは複数とれるでの、eachメソッドでコールバックを登録します
//        .each(function(){
//             // titleクラスのテキストを取得
//             const title = $(this).find(".title").text();
//             // importantクラスのテキストを取得
//             const price  = $(this).find(".important").text();
//             //console.log(title + "  -  " + price);
//             data.push({title, price});
//        });
//        console.log(data);
//    })    
//    .catch(function (error) {
//        console.log(error);
//    })
//    .finally(function () {
//        // always executed
//    });


// 指定したポートでリッスンを開始します。
//app.listen(PORT, console.log("server running"));
