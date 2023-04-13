const AIO_KEY = 'aio_Tpns72HEyXkIXko7394emsFLSZPL';
const AIO_USERNAME = 'dangnguyen';
// const FEED_NAME = 'button1';


const sendToAdafruitIO = async (value, isFan) => {
  FEED_NAME = (isFan) ? "button1": "button2"
  const url = `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data`;

  const data = {
    value: value
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'X-AIO-Key': AIO_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response;
};

const getLatestButton1 = async (isFan) => {
    FEED_NAME = (isFan) ? "button1": "button2"
    const url = `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data/last`;
  
    const response = await fetch(url, {
      headers: {
        'X-AIO-Key': AIO_KEY,
      },
    });
  
    const data = await response.json();
  
    return data.value;
  };

export { sendToAdafruitIO, getLatestButton1 };
