const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get('/data', (req, res) => {
    const feed = 'dangnguyen/feeds/button1';
    const options = {
      url: `https://io.adafruit.com/api/v2/dangnguyen/feeds/${feed}`,
      headers: {
        'X-AIO-Key': 'aio_Tpns72HEyXkIXko7394emsFLSZPL'
      }
    };
    request(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        res.json(data);
      } else {
        res.status(500).send('Error fetching data from Adafruit IO');
      }
    });
  });
app.post('/data', (req, res) => {
  const feed = 'dangnguyen/feeds/button1';
  const value = req.body.value;
  const options = {
    url: `https://io.adafruit.com/api/v2/dangnguyen/feeds/${feed}`,
    headers: {
      'X-AIO-Key': 'aio_Tpns72HEyXkIXko7394emsFLSZPL'
    },
    json: {
      value: value
    }
  };
  request.post(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.send('Data sent to Adafruit IO');
    } else {
      res.status(500).send('Error sending data to Adafruit IO');
    }
  });
});
  