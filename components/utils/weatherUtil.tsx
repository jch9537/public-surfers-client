import { weatherAPI } from "../fetch";

export function getFormatDate(date: Date): string {
  let year = date.getFullYear(); //yyyy
  let month: number | string = 1 + date.getMonth(); //M
  month = month >= 10 ? month : "0" + month; //month 두자리로 저장
  let day: number | string = date.getDate(); //d
  day = day >= 10 ? day : "0" + day; //day 두자리로 저장
  // let week = new Array("일", "월", "화", "수", "목", "금", "토");
  return year + "-" + month + "-" + day;
}
export function realTimeWeather(x: number, y: number) {
  // 시간수정하기
  var today: Date | string = new Date();
  // var week = new Array('일', '월', '화', '수', '목', '금', '토');
  var year = today.getFullYear();
  var month: number | string = today.getMonth() + 1;
  var day: number | string = today.getDate();
  // var day = 28;
  // var day = 29;
  var hours: number | string = today.getHours();
  // var hours = 1;
  // var hours = 23;
  // console.log('시간 ', hours, '시간타입 ', typeof hours);
  var minutes: number | string = today.getMinutes();
  // var minutes = 59;
  // var minutes = 36;
  // var minutes = 1
  // console.log('분 ', minutes, '분타입 ', typeof minutes);
  const weatherBaseTime = [
    "0200",
    "0500",
    "0800",
    "1100",
    "1400",
    "1700",
    "2000",
    "2300"
  ];

  if (minutes < 59) {
    minutes = "00";
  }
  // if (hours < 2) {
  //   today.setDate(today.getDate() - 1);
  //   day = today.getDate();
  // }

  let basetime;
  let time = `${hours}${minutes}`;
  // console.log('현재시간', time);

  if (Number(time) < Number(weatherBaseTime[0])) {
    today.setDate(today.getDate() - 1);
    day = today.getDate();
    month = today.getMonth() + 1;
    year = today.getFullYear();
    basetime = weatherBaseTime[weatherBaseTime.length - 1];
  } else if (
    Number(time) >= Number(weatherBaseTime[weatherBaseTime.length - 1])
  ) {
    basetime = weatherBaseTime[weatherBaseTime.length - 1];
  } else {
    for (let i = 0; i < weatherBaseTime.length; i++) {
      if (Number(time) < Number(weatherBaseTime[i])) {
        basetime = weatherBaseTime[i - 1];
        break;
      }
    }
  }

  // console.log('기준시간', basetime);

  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  today = year + "" + month + "" + day;
  // console.log("오늘", today);

  /* 좌표 */
  var _nx = x; //x좌표,
  var _ny = y; //y좌표,
  var apikey =
    "dbBOZxcc0%2FMjMwrE%2FjwPr7QSS5iBYesJaeZBmLBDCfpw4SGhwmge0fCkmk56yS5Ox2DNiDRWS3Ev%2BZwbZOdWGQ%3D%3D";
  var ForecastGribURL =
    "http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData";
  ForecastGribURL += "?ServiceKey=" + apikey;
  ForecastGribURL += "&base_date=" + today; //"20191204"
  ForecastGribURL += "&base_time=" + basetime; //"0100";
  ForecastGribURL += "&nx=" + _nx + "&ny=" + _ny;
  ForecastGribURL += "&pageNo=1&numOfRows=14";
  ForecastGribURL += "&_type=json";
  // console.log("인자", ForecastGribURL);

  // 기상청 자료요청
  return (
    weatherAPI(ForecastGribURL, "GET")
      .then((res: any) => res.json())
      // .then(json => console.log('빼치', json));
      .then(json => makeWeatherData(json))
  );
  // .catch(err => console.log(err))
}

//--------------------------------------응답 자료분석 콜백함수------------------------------------------------
// 아래 함수 자료 타입지정
interface weatherDetailType {
  강수확률?: string;
  시간당강수량?: string;
  최저기온?: string;
  최고기온?: string;
  "풍속(동서)"?: string;
  "풍속(남북)"?: string;
  파고?: string;
  풍향?: string;
  풍속?: string;
  하늘?: string;
}
// 응답받은 자료를 화면에 보여줄 날씨글자로 바꿔줄 콜백

function makeWeatherData(obj: any) {
  const weatherInfo = [];

  if (obj) {
    // console.log("전체 인자", obj.response.body.items.item);
    let announceTime = obj.response.body.items.item[0].fcstTime.toString();
    let itemObj = obj.response.body.items.item;
    // console.log('값', announceTime);
    for (let i = 0; i < itemObj.length; i++) {
      const weatherDetail: weatherDetailType = {};
      if (itemObj[i].fcstTime.toString() === announceTime) {
        // console.log('----------------------', itemObj[i].fcstTime);
        // console.log('----------', itemObj[i].category);
        if (itemObj[i].category === "POP") {
          weatherDetail["강수확률"] = itemObj[i].fcstValue + "%";
          weatherInfo.push(weatherDetail);
        }
        // else if (itemObj[i].category === "R06") {
        //   weatherDetail["시간당강수량"] = itemObj[i].fcstValue + "mm";
        //   weatherInfo.push(weatherDetail);
        // }
        // else if (itemObj[i].category === "TMN") {
        //   weatherDetail["최저기온"] = itemObj[i].fcstValue + "℃";
        //   weatherInfo.push(weatherDetail);
        // }
        // else if (itemObj[i].category === "TMX") {
        //   weatherDetail["최고기온"] = itemObj[i].fcstValue + "℃";
        //   weatherInfo.push(weatherDetail);
        // }
        // else if (itemObj[i].category === "T3H") {
        //   weatherDetail["풍속(동서)"] = itemObj[i].fcstValue + "m/s";
        //   weatherInfo.push(weatherDetail);
        // }
        // else if (itemObj[i].category === "UUU") {
        //   weatherDetail["풍속(남북)"] = itemObj[i].fcstValue + "M";
        //   weatherInfo.push(weatherDetail);
        // }
        else if (itemObj[i].category === "VVV") {
          weatherDetail["파고"] = itemObj[i].fcstValue + "M";
          weatherInfo.push(weatherDetail);
        }
        // else if (itemObj[i].category === "WAV") {
        //   weatherDetail["풍향"] = itemObj[i].fcstValue + "m/s";
        //   weatherInfo.push(weatherDetail);
        // }
        else if (itemObj[i].category === "WSD") {
          weatherDetail["풍속"] = itemObj[i].fcstValue + "m/s";
          weatherInfo.push(weatherDetail);
        } else if (itemObj[i].category === "SKY") {
          if (itemObj[i].fcstValue <= 5) {
            weatherDetail["하늘"] = "맑음";
            weatherInfo.push(weatherDetail);
          } else if (itemObj[i].fcstValue > 5 && itemObj[i].fcstValue <= 8) {
            weatherDetail["하늘"] = "구름많음";
            weatherInfo.push(weatherDetail);
          } else if (itemObj[i].fcstValue > 8 && itemObj[i].fcstValue <= 10) {
            weatherDetail["하늘"] = "흐림";
            weatherInfo.push(weatherDetail);
          }
        }
      }
    }
  }
  console.log("날씨", weatherInfo);
  return weatherInfo;
}
