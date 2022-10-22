// importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from "./dbMessages.js"
import Pusher from 'pusher';
import cors from 'cors';

// app config
const app = express();       //application instance
const port = process.env.PORT || 9000;        //Port where we will be running our appli

const pusher = new Pusher({
    appId: "******",
    key: "**************",
    secret: "*******************",
    cluster: "ap2",
    useTLS: true
    //,encrypted:true  -->not in our code (updated)
  });

// middleware
app.use(express.json())
app.use(cors());

//security
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     next();
// })

// DB config
const connection_url ="*************************"
mongoose.connect(connection_url, {
    // useCreateIndex: true,
    // useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.once('open', ()=>{
    console.log('DB is connected');

    const msgCollection = db.collection('messagecontents'); //Name of collection in Mongodb
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        console.log(change);

        if(change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
            {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.message,
                received: messageDetails.received
            });
        } else {
            console.log('Error triggering Pusher');
        }
    })
})

//????

// api routes
app.get('/', (req,res)=>res.status(200).send("Hello World"));

//api to post messages
app.post('/messages/new', (req,res)=> {
    const dbMessage = req.body;
    Messages.create(dbMessage, (err, data) => {
        if(err){
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})

//api to get all the data from database
app.get('/messages/sync', (req,res)=> {
    Messages.find((err, data) => {
        if(err){
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
});


// listen
app.listen(port, ()=>console.log(`Listening on localhost:${port}`));
