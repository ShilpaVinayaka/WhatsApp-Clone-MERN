import { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from "pusher-js";
import axios from "./axios";

function App() {

  const [messages, setMessages] = useState([]);
  useEffect(() => {

    axios.get('/messages/sync').then((response) =>{
      setMessages(response.data);
    })
  }, []);

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher('c6ea993ce75819e1df85', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage])
    });

    // Even when there are many subscribes there should be only one subscriber
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className='app__body'>
        <Sidebar />
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
