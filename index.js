// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use((req,res,next)=>{
  console.log(
    `${req.method} ${req.path} - ${req.ip}`
  )
  next()
})

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?" ,(req,res)=>{
  let dateParm = req.params.date;
  if(!dateParm){
    date = new Date();
  }else{
    if(!isNaN(dateParm)){
      dateParm = parseInt(dateParm)
    }
    date = new Date(dateParm);
  }


  // Check if the date is valid
  if (date.toString() === 'Invalid Date') {
    res.json({ error: 'Invalid Date' });
  } else {
    res.json({
      unix: date.getTime(), // Unix timestamp in milliseconds
      utc: date.toUTCString()
    });
  }
})

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
