import React, { useState, useEffect } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import dayjs from 'dayjs';
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Scroll from 'react-scroll';
import { TextInput } from "./TextInput";
import { MessageLeft, MessageRight } from "./Message";

const Element = Scroll.Element;
const Events = Scroll.Events;
const scrollSpy = Scroll.scrollSpy;
const scroller = Scroll.scroller;

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const BoxContainer = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const PaperContainer = styled(Paper)(({ theme }) => ({
  width: "80vw",
  height: "80vh",
  maxWidth: "500px",
  maxHeight: "700px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  position: "relative"
}));

const PaperBody = styled(Paper)(({ theme }) => ({
  width: "calc( 100% - 20px )",
  margin: 10,
  overflowY: "scroll",
  height: "calc( 100% - 80px )",
  backgroundColor: "#ECE5DD"
}));

interface Message {
  message: string;
  timestamp: string;
  photoURL: string;
  displayName: string;
  avatarDisp: boolean;
  role: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log(process.env.REACT_APP_OPENAI_API_KEY)
    setMessages([
      {
        message: 'Hi😀 I am a bot. I can answer your questions about the OpenAI.',
        timestamp: dayjs().format('MM/DD HH:MM'),
        photoURL: "https://icones.pro/wp-content/uploads/2022/10/robot-icon.png",
        displayName: "OpenAI",
        avatarDisp: true,
        role: "left"
      }
    ]);
    Events.scrollEvent.register('begin', function () {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function () {
      console.log("end", arguments);
    });

    scrollSpy.update();

  }, []);

  const handleSend = (message: string) => {
    setLoading(true);
    const newMessage = {
      message,
      timestamp: dayjs().format('MM/DD HH:MM'),//"MM/DD 00:00",
      photoURL: "https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c",
      displayName: "OpenAI",
      avatarDisp: true,
      role: "right"
    };
    const _messages = [...messages, newMessage];
    setMessages(_messages);
    handleOpenAI(message, _messages);
    scrollToBottom();
  };

  const handleOpenAI = async (message: string, messages: Message[]) => {
    let newMessage = {
      message: '',
      timestamp: '',
      photoURL: '',
      displayName: '',
      avatarDisp: true,
      role: ''
    };
    const { data, status } = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });
    if (status === 200) {
      const [choice] = data.choices;
      const content = choice?.message?.content || '';
      newMessage = {
        message: content,
        timestamp: dayjs().format('MM/DD HH:MM'),
        photoURL: "https://icones.pro/wp-content/uploads/2022/10/robot-icon.png",
        displayName: "OpenAI",
        avatarDisp: true,
        role: "left"
      };
    } else {
      newMessage = {
        message: 'Error, please check the logs.',
        timestamp: dayjs().format('MM/DD HH:MM'),
        photoURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Feedbin-Icon-error.svg/1200px-Feedbin-Icon-error.svg.png",
        displayName: "System",
        avatarDisp: true,
        role: "left"
      };
    }
    setLoading(false);
    setMessages([...messages, newMessage]);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    scroller.scrollTo('lastElement', {
      duration: 1500,
      delay: 100,
      smooth: 'easeInOutQuint',
      containerId: 'containerElement',
      offset: 50
    })
  };

  const props = {
    messages,
    setMessages,
    handleSend,
    loading,
    setLoading,
  };

  return (
    <BoxContainer>
      <PaperContainer elevation={2}>
        <PaperBody id="containerElement">
          {messages.map((message, index) => {
            const { message: msg, timestamp, photoURL, displayName, avatarDisp, role } = message;
            if (role === "left") {
              return (
                <MessageLeft
                  key={index}
                  message={msg}
                  timestamp={timestamp}
                  photoURL={photoURL}
                  displayName={displayName}
                  avatarDisp={avatarDisp}
                />
              );
            } else {
              return (
                <MessageRight
                  key={index}
                  message={msg}
                  timestamp={timestamp}
                  photoURL={photoURL}
                  displayName={displayName}
                  avatarDisp={avatarDisp}
                />
              );
            }
          })}
          <Element name="lastElement"></Element>
        </PaperBody>
        <TextInput {...props} />
      </PaperContainer>
    </BoxContainer>
  );
}

export default App;
