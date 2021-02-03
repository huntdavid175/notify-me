const express = require('express');
const cron = require('node-cron');
const Twilio = require("twilio");
const request = require("request");
require('dotenv').config();

const app = express();


const accountSid = process.env.ACCOUNT_SID;
const accountToken = process.env.ACCOUNT_TOKEN;
const weatherAPIKEY = process.env.API_TOKEN;

const runApp = () => {
  request(`https://api.openweathermap.org/data/2.5/onecall?lat=51.759048&lon=19.458599&exclude=daily,current,minutely,alerts&appid=${weatherAPIKEY}`, {json: true}, (error, response, body)=> {
  if(error) {
    console.log(error)
  }
  const hourlyIdArray = body.hourly.map(hour => hour.weather).map(arr => arr[0]).map(obj => obj.id).slice(0,8);
  hourlyIdArray.push(500)
  console.log(hourlyIdArray);

  const willRain = hourlyIdArray.every(id => id < 600);
  if (willRain) {
    sendMessage()
  }
})
}






// Function to text message 
const sendMessage = () => {
const client = new Twilio(accountSid, accountToken);

client.messages
  .create({
    body: "It will rain today",
    to: "+233545817432",
    from: "+18252515419",
  })
  .then((message) => console.log(message.sid));
}

 cron.schedule('0 6 * * *', () => {
   runApp()
 }, {
   scheduled:true,
  timezone: "Europe/London" });

app.listen(3000);