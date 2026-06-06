// 顯示時間
const displayTime = document.querySelector("#displayTime")
// 顯示最低溫~最高溫
const temperature = document.querySelector("#temperature")
// 顯示氣象資訊
const weatherInfo = document.querySelector("#weatherInfo")
// 取得城市按鈕
const btnCity = document.querySelectorAll(".btn-city")
// 顯示目前選到的城市
const showcity = document.querySelector("#showcity")
// 整個body元素，用來改變背景圖片
const body = document.querySelector("body")
// 計時器
setInterval(() => {
    timerReflash()
}, 1000);
// 可簡寫為 setInterval(timerReflash, 1000);
// 每秒更新一次時間
function timerReflash() {
    var dateTime = new Date();
    // 依使用者地區格式顯示日期與時間（例如 zh-TW）
    displayTime.innerHTML = dateTime.toLocaleString();
}
//取得時間的各種方式
//const getTime = {}
// getTime.year = dateTime.getFullYear()
// getMonth() 回傳是「從 0 開始算」的月份數字，所以要加 1 才會是我們平常認知的月份數字
// getTime.month = dateTime.getMonth()+1
// getTime.date = dateTime.getDate()
// getTime.hour = dateTime.getHours()
// getTime.minute = dateTime.getMinutes()
// getTime.second = dateTime.getSeconds()
// API授權碼，請自行申請後替換
const Authorization = 'CWA-AC8248B4-C6B9-4DE9-9ABF-A764D9592C17'
// API網址，記得替換授權碼
const api = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${Authorization}`
// 儲存API資料的變數
let weatherData = {}
// 使用async/await語法來處理非同步的API請求
const handleAsync = async (city) => {
    try {
        // 取得中央氣象署資料，並保存各城市天氣陣列
        const res = await axios.get(api)
        console.log(res.data);
        weatherData = res.data.records.location;
        // 初次載入時先顯示預設城市
        displayWeather(city)
        document.getElementById('loading').style.display = 'none';
    } catch (error) {
        // API 請求失敗或資料格式錯誤時會進入這裡
        console.error(error);
    }
}
// 每個城市按鈕點擊後，依按鈕文字更新天氣內容
btnCity.forEach(element => {
    element.addEventListener("click", (e) => {
        displayWeather(e.target.textContent)
    })
})
// 根據選擇的城市顯示天氣資訊和背景圖片
function displayWeather(city) {
    showcity.innerHTML = city
    body.style.backgroundImage = `url(./img/${city}.jpg)`
    weatherData.forEach(element => {
        if (element.locationName == city) {
            weatherInfo.innerHTML = element.weatherElement[0].time[0].parameter.parameterName
            // 氣象資料索引：2 最低溫、4 最高溫
            const minT = element.weatherElement[2].time[0].parameter.parameterName
            const maxT = element.weatherElement[4].time[0].parameter.parameterName
            temperature.innerHTML = `${minT}℃~${maxT}℃`
            console.log(element);
        }
    });
}
handleAsync('臺北市')
timerReflash()
