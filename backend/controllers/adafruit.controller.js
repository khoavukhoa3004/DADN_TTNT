const axios = require('axios');

exports.postData = async (req,res) => {
    /**
     * @param {
     *  "feedName": "button1", 
     *  "value": "ON"
     * } - indicates the body of data to be sent
     */

    const { user } = req;
    if(!user) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized access!'
        });
    }

    const { feedName, value } = req.body;
    if (!feedName || !value) {
        return res.status(400).json({
            success: false,
            message: 'A feedName and a value must be provided!',
        });
    }
    console.log(`https://io.adafruit.com/api/v2/${process.env.AIO_USERNAME}/feeds/${feedName}/data`);
    try {
        const response = await axios({
            method: 'POST',
            url: `https://io.adafruit.com/api/v2/${process.env.AIO_USERNAME}/feeds/${feedName}/data`,
            headers: {
                'X-AIO-Key': process.env.AIO_KEY,
                'Content-Type': 'application/json',
            },
            data: { value: value },
        });

        if(response.status === 200){
            res.json({
                success: true,
                message: 'Data sent to Adafruit IO',
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Error sending data to Adafruit IO',
            });
        }
    } catch (error) {
        console.error('Error while sending data to Adafruit IO:', error);
        res.status(500).json({
            success: false, 
            message: error
        });
    }
}

exports.getCurrentData = async (req, res) => {
    const { user } = req;
    if(!user) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized access!'
        });
    }
    const feedKey = req.params.feedKey;
    const url =  `https://io.adafruit.com/api/v2/${process.env.AIO_USERNAME}/feeds/${feedKey}/data/last`;
    const headers = {
        'X-AIO-Key': process.env.AIO_KEY,
    }
    
    try {
        const response = await axios.get(url,{headers});
        const data = response.data;
        const value = data?.value;
        const timestamp = data?.created_at;

        // Send response with current value and timestamp
        res.json({
            feed: feedKey,
            value: value,
            timestamp: timestamp,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error retrieving data from Adafruit IO',
        });
    }
}

exports.getAllData = async (req, res) => {
    const { user } = req;
    if(!user) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized access!'
        });
    }
    const feedKey = req.params.feedKey;
    const url =  `https://io.adafruit.com/api/v2/${process.env.AIO_USERNAME}/feeds/${feedKey}/data`;
    const headers = {
        'X-AIO-Key': process.env.AIO_KEY,
    }
    try {
        const response = await axios.get(url, {headers});
        const data = response.data;

        // Send response with all feed data
        res.json({
            feed: feedKey,
            data: data,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error retrieving data from Adafruit IO',
        });
    }
}

exports.getCurrentDataWithoutAuthenticated = async (req, res) => {
    const feedKey = req.params.feedKey;
    const url =  `https://io.adafruit.com/api/v2/${process.env.AIO_USERNAME}/feeds/${feedKey}/data/last`;
    const headers = {
        'X-AIO-Key': process.env.AIO_KEY,
    }
    
    try {
        const response = await axios.get(url,{headers});
        const data = response.data;
        const value = data?.value;
        const timestamp = data?.created_at;

        // Send response with current value and timestamp
        res.json({
            feed: feedKey,
            value: value,
            timestamp: timestamp,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error retrieving data from Adafruit IO',
        });
    }
}

exports.postDataWithoutAuthenticated = async(req, res) => {
    const { feedName, value } = req.body;
    if (!feedName || !value) {
        return res.status(400).json({
            success: false,
            message: 'A feedName and a value must be provided!',
        });
    }
    console.log(`https://io.adafruit.com/api/v2/${process.env.AIO_USERNAME}/feeds/${feedName}/data`);
    try {
        const response = await axios({
            method: 'POST',
            url: `https://io.adafruit.com/api/v2/${process.env.AIO_USERNAME}/feeds/${feedName}/data`,
            headers: {
                'X-AIO-Key': process.env.AIO_KEY,
                'Content-Type': 'application/json',
            },
            data: { value: value },
        });

        if(response.status === 200){
            res.json({
                success: true,
                message: 'Data sent to Adafruit IO',
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Error sending data to Adafruit IO',
            });
        }
    } catch (error) {
        console.error('Error while sending data to Adafruit IO:', error);
        res.status(500).json({
            success: false, 
            message: error
        });
    }
}