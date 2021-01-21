const accountSid = "AC62909e6a2c1c3271a9f6d04c5ee20baa";
const accountToken = "681ec409e3b142a1277f8663110bcef0";

const Twilio = require("twilio");

const client = new Twilio(accountSid, accountToken);

client.messages
  .create({
    body: "From my twilio app",
    to: "+233545817432",
    from: "+18252515419",
  })
  .then((message) => console.log(message.sid));
