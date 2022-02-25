/*   Radha Swami ji   */

const url = "https://www.pepcoding.com/faangList2.0";

const request = require("request");

const cheerio = require("cheerio");
const { index } = require("cheerio/lib/api/traversing");

var xl = require("excel4node");

// create bew work book
var wb = new xl.Workbook();

//sheet
var ws = wb.addWorksheet("Sheet 1");

// for taking here i send the request
request(url, cb);

function cb(error, response, html) {
  if (error) {
    console.log("error");
  } else {
    // console.log(html);
    getLink(html);
  }
}

function getLink(html) {
  let $ = cheerio.load(html);

  let linkArr = $(".collapsible-header.bold.active");

  var style = wb.createStyle({
    font: {
      //   color: "#FF0800",
      color: "#ffa500",
      size: 28,
    },
    numberFormat: "$#,##0.00; ($#,##0.00); -",
  });

  // console.log(linkArr.length);
  let index = 0;
  let k = 0;

  //below array create for taking the topics data.
  let krr = [];
  let linkArray = [];
  //document.querySelectorAll(".collection-item a")[0].href
  // TRQ array keep the info of question means how many questions
  let TRQ = [42, 101, 160, 283, 338, 451, 567, 687, 703, 718];
  for (let i = 0; i < linkArr.length; i++, k++) {
    let topic = $(linkArr[i]).text();
    // console.log(topic);
    krr.push(topic);

    // 719 question vali link.
    let arr = $(".no-padding.col.l10.s9.m10.push-s1.no-margin.questions-name");
    let link = $(".collection-item a");
    for (index; index < arr.length; index++) {
      // main line of the program
      if (index <= TRQ[k]) {
        // console.log(arr.eq(index).text().trim())
        krr.push(arr.eq(index).text().trim());
        linkArray.push(link.eq(index).attr("href"));
      } else {
        // jese index ki value TRQ[k] se  bdi hogi then loop ko break kr denge
        break;
      }
    }
    // console.log(linkArray);
  }
  const maxWidth = 500;
  let idx = 0;
  for (let p = 1; p <= krr.length; p++) {
    if (p - 1 == 0 || p - idx - 3 == TRQ[idx] || p == 45) {
      idx++;
      // below for inserting data in excel in order
      ws.cell(p, 1)
        .string(krr[p - 1])
        .style(style);
    } else {
      ws.cell(p, 1).string(krr[p - 1]);

      ws.cell(p, 2).link(linkArray[p - 1]);
    }
  }

  wb.write("Maangquestion.xlsx");
  console.log(" Guru : Project Created Successfully");
}
