import { fetchAPI } from '../fetch';

export function getFormatDate(date: Date): string {
    let year = date.getFullYear(); //yyyy
    let month: number | string = 1 + date.getMonth(); //M
    month = month >= 10 ? month : '0' + month; //month 두자리로 저장
    let day: number | string = date.getDate(); //d
    day = day >= 10 ? day : '0' + day; //day 두자리로 저장
    let week = new Array('일', '월', '화', '수', '목', '금', '토');
    return (
        year + '년 ' + month + '월' + day + '일 ' + week[date.getDay()] + '요일'
    );
}

// 지역정보 fakeData
export const locationInfo = ['LOCATION', '강원도', '부산', '제주', '기타'];
export const locationDetail = [
    {
        강원도: [
            '천진',
            '송지호',
            '속초',
            '설악',
            '기사문',
            '동산',
            '죽도',
            '인구',
            '갯마을',
            '남애3리',
            '사천',
            '금진',
            '용화'
        ]
    },
    { 부산: ['송정', '다대포'] },
    { 제주: ['중문', '쇠소깍', '월정'] },
    { 기타: ['용한', '진하', '만리포'] }
];
const localPoint = [
    //강원 고성
    { 천진해변: { x: 87, y: 142 } },
    { 송지호해변: { x: 86, y: 144 } },
    //강원 속초
    { 속초해변: { x: 87, y: 141 } },
    //강원 양양
    { 설악해변: { x: 87, y: 140 } },
    { 기사문해변: { x: 89, y: 137 } },
    { 동산해변: { x: 90, y: 136 } },
    { 죽도해변: { x: 90, y: 136 } },
    { 인구해변: { x: 90, y: 136 } },
    { 갯마을해변: { x: 90, y: 136 } },
    { 남애3리해변: { x: 90, y: 136 } },
    //강원 강릉
    { 사천해변: { x: 92, y: 133 } },
    { 금진해변: { x: 95, y: 129 } },
    //강원 삼척
    { 용화해변: { x: 99, y: 124 } },
    //경북 포항
    { 용한해변: { x: 102, y: 96 } },
    //울산
    { 진하해변: { x: 102, y: 80 } },
    //부산
    { 송정해변: { x: 100, y: 76 } },
    { 다대포해변: { x: 96, y: 73 } },
    //충남 태안
    { 만리포해변: { x: 46, y: 109 } },
    //제주
    { 중문해변: { x: 51, y: 32 } },
    { 쇠소깍해변: { x: 54, y: 33 } },
    { 월정해변: { x: 59, y: 38 } }
];

//세부지역 선택

//------------------------------------- 날씨 요청보내는 함수--------------------------------------------------
export function realTimeWeather() {
    // 각 좌표 인자로 넣기 x: number, y: number
    //위 fakeData에서 해변이름으로 검색 후
    // console.log('작동은함');
    var today: Date | string = new Date();
    // var week = new Array('일', '월', '화', '수', '목', '금', '토');
    var year = today.getFullYear();
    var month: number | string = today.getMonth() + 1;
    var day: number | string = today.getDate();
    var hours: number | string = today.getHours();
    var minutes = today.getMinutes();
    /*
     * 기상청 30분마다 발표
     * 30분보다 작으면, 한시간 전 hours 값
     */
    if (minutes < 30) {
        hours = hours - 1;
        if (hours < 0) {
            // 자정 이전은 전날로 계산
            today.setDate(today.getDate() - 1);
            day = today.getDate();
            month = today.getMonth() + 1;
            year = today.getFullYear();
            hours = 23;
        }
    }
    /* example
     * 9시 -> 09시 변경 필요
     */
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    today = year + '' + month + '' + day;

    /* 좌표 */
    var _nx = 88; //x좌표,
    var _ny = 138; //y좌표,
    var apikey =
        'dbBOZxcc0%2FMjMwrE%2FjwPr7QSS5iBYesJaeZBmLBDCfpw4SGhwmge0fCkmk56yS5Ox2DNiDRWS3Ev%2BZwbZOdWGQ%3D%3D';
    var ForecastGribURL =
        'http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData';
    ForecastGribURL += '?ServiceKey=' + apikey;
    ForecastGribURL += '&base_date=' + today;
    ForecastGribURL += '&base_time=' + hours + '00'; //+ hours
    ForecastGribURL += '&nx=' + _nx + '&ny=' + _ny;
    ForecastGribURL += '&pageNo=1&numOfRows=20';
    ForecastGribURL += '&_type=json';
    // console.log('인자', ForecastGribURL);

    /*테스트데이터 : 새벽에 테스트 안됨
    ForecastGribURL = 'http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData?ServiceKey=dbBOZxcc0%2FMjMwrE%2FjwPr7QSS5iBYesJaeZBmLBDCfpw4SGhwmge0fCkmk56yS5Ox2DNiDRWS3Ev%2BZwbZOdWGQ%3D%3D&base_date=20191122&base_time=1700&nx=88&ny=138&pageNo=1&numOfRows=20&_type=json'
    */
    ForecastGribURL =
        'http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData?ServiceKey=dbBOZxcc0%2FMjMwrE%2FjwPr7QSS5iBYesJaeZBmLBDCfpw4SGhwmge0fCkmk56yS5Ox2DNiDRWS3Ev%2BZwbZOdWGQ%3D%3D&base_date=20191122&base_time=1700&nx=88&ny=138&pageNo=1&numOfRows=20&_type=json';

    // 기상청 자료요청
    fetchAPI(ForecastGribURL, 'GET')
        .then(res => res.json())
        .then(json => makeWeatherData(json));
}

//--------------------------------------응답 자료분석 콜백함수------------------------------------------------
// 아래 함수 자료 타입지정
interface weatherDetailType {
    강수확률?: string;
    시간당강수량?: string;
    최저기온?: string;
    최고기온?: string;
    '풍속(동서)'?: string;
    '풍속(남북)'?: string;
    파고?: string;
    풍향?: string;
    풍속?: string;
    하늘?: string;
}
// 응답받은 자료를 화면에 보여줄 날씨글자로 바꿔줄 콜백
function makeWeatherData(obj: any) {
    // const weatherBaseTime = ['0200', 500, 800, 1100, 1400, 1700, 2000, 2300];
    const weatherInfo = [];

    if (obj) {
        // console.log('전체 인자', obj.response.body.items.item);
        let announceTime = obj.response.body.items.item[0].fcstTime.toString();
        let itemObj = obj.response.body.items.item;
        // console.log('값', announceTime);
        for (let i = 0; i < itemObj.length; i++) {
            const weatherDetail: weatherDetailType = {};
            if (itemObj[i].fcstTime.toString() === announceTime) {
                // console.log('----------------------', itemObj[i].fcstTime);
                // console.log('----------', itemObj[i].category);
                if (itemObj[i].category === 'POP') {
                    weatherDetail['강수확률'] = itemObj[i].fcstValue + '%';
                    weatherInfo.push(weatherDetail);
                } else if (itemObj[i].category === 'R06') {
                    weatherDetail['시간당강수량'] = itemObj[i].fcstValue + 'mm';
                    weatherInfo.push(weatherDetail);
                } else if (itemObj[i].category === 'TMN') {
                    weatherDetail['최저기온'] = itemObj[i].fcstValue + '℃';
                    weatherInfo.push(weatherDetail);
                } else if (itemObj[i].category === 'TMX') {
                    weatherDetail['최고기온'] = itemObj[i].fcstValue + '℃';
                    weatherInfo.push(weatherDetail);
                } else if (itemObj[i].category === 'T3H') {
                    weatherDetail['풍속(동서)'] = itemObj[i].fcstValue + 'm/s';
                    weatherInfo.push(weatherDetail);
                } else if (itemObj[i].category === 'UUU') {
                    weatherDetail['풍속(남북)'] = itemObj[i].fcstValue + 'M';
                    weatherInfo.push(weatherDetail);
                } else if (itemObj[i].category === 'VVV') {
                    weatherDetail['파고'] = itemObj[i].fcstValue + 'mm';
                    weatherInfo.push(weatherDetail);
                } else if (itemObj[i].category === 'WAV') {
                    weatherDetail['풍향'] = itemObj[i].fcstValue + 'm/s';
                    weatherInfo.push(weatherDetail);
                } else if (itemObj[i].category === 'WSD') {
                    weatherDetail['풍속'] = itemObj[i].fcstValue + '';
                    weatherInfo.push(weatherDetail);
                } else if (itemObj[i].category === 'SKY') {
                    if (itemObj[i].fcstValue <= 5) {
                        weatherDetail['하늘'] = '맑음';
                        weatherInfo.push(weatherDetail);
                    } else if (
                        itemObj[i].fcstValue > 5 &&
                        itemObj[i].fcstValue <= 8
                    ) {
                        weatherDetail['하늘'] = '구름많음';
                        weatherInfo.push(weatherDetail);
                    } else if (
                        itemObj[i].fcstValue > 8 &&
                        itemObj[i].fcstValue <= 10
                    ) {
                        weatherDetail['하늘'] = '흐림';
                        weatherInfo.push(weatherDetail);
                    }
                }
            }
        }
    }
    console.log('날씨', weatherInfo);
    // return weather;
}
