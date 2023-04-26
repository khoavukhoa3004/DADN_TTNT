const mqtt = require('mqtt');

class MQTTService {
    // constructor(){
    //     this.mqttClient = null;
    //     // this.host = host;
    //     // this.messageCallback = messageCallback;
    // }    

    connect() {
        const feed = [
            "dangnguyen/feeds/button1", 
            "dangnguyen/feeds/button2",
            "dangnguyen/feeds/button3",
            "dangnguyen/feeds/FanValue",
            "dangnguyen/feeds/LightValue",
            "dangnguyen/feeds/sensor1",
            "dangnguyen/feeds/sensor2"
        ];

        this.mqttClient = mqtt.connect({
            host: "io.adafruit.com",
            port: 1883,
            protocol: ('mqtt'),
            username: process.env.AIO_USERNAME,
            password: process.env.AIO_KEY,
            connectTimeout: 60 * 1000,
            keepalive: 3600
        });

        // MQTT Callback for 'error' event
        this.mqttClient.on("error", (err) => {
            console.log(err);
            this.mqttClient.end();
        });
        
        // MQTT Callback for 'connect' event
        this.mqttClient.on("connect", () => {
            for (const topic in feed){
                this.mqttClient.subscribe(feed[topic]);
                console.log('connected ' + feed[topic]);
            }
            // console.log("MQTT client connected!");
        });

        this.mqttClient.on('reconnect', () => {
            for (const topic in feed){
                this.mqttClient.subscribe(feed[topic]);
                console.log('connected ' + feed[topic]);
            }
            console.log("MQTT client reconnected!");
        });

        // Call the message callback function when message arrived
        this.mqttClient.on("message", (topic, message) => {
            console.log(`From topic: ${topic}, received: `);
            console.log(message.toString('utf8'));
        });

        this.mqttClient.on("close", () => {
            // connected = false;
            console.log("MQTT client disconnected!");
        });
    }

    // Publish MQTT Message
    publish(topic, message){
        this.mqttClient.publish(topic, message);
    }

    // Subscribe to MQTT Message
    subscribe(topic, message){
        this.mqttClient.subscribe(topic, message);
    }
}

module.exports = MQTTService;





































// const client = mqtt.connect({
//     host: "io.adafruit.com",
//     port: 1883,
//     protocol: ('mqtt'),
//     username: "dangnguyen",
//     password: "aio_Tpns72HEyXkIXko7394emsFLSZPL",
//     connectTimeout: 60 * 1000,
//     keepalive: 3600
// });

// client.on('connect', () => {
//     // sub đúng kênh để nhận dữ liệu
//     for (const topic in feed){
//         client.subscribe(feed[topic]);
//         console.log('connected ' + feed[topic]);
//     }
// });

// client.on('reconnect', () => {
//     for (const topic in feed){
//         client.subscribe(feed[topic]);
//         // console.log('connected ' + feed[topic]);
//     }
// });

// //Auto Generate when Errors:
// client.on('error', (err) => console.log('error', err));

// //Close Connection:
// client.on('close', () => connected = false);

// client.on('message', (topic, message) => {
//     // nó sẽ nhận được thông tin khi có tín hiệu bị thay đổi 
//     // và nó chỉ nhận được những kênh mà nó sub, giống như youtube vậy :)

//     // mai mốt mấy ông xử lí cái này thay vì in ra console thì mấy ông hiển thị lên sprite.
//     // console.log(`From topic: ${topic}, received: `)
//     // console.log(message.toString('utf8'));
// });