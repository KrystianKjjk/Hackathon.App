import React, { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';

// import style from './Messages.module.css'

interface MessageProps {
    name: string;
    userId: string;
    text: string;
    _id: string;
    date: string;
}

const Message: React.FC<MessageProps> = props => {
    return (
        <div>
            <div>
                <p>
                    {props.name} <span>{props.date}</span>
                </p>
                <p>{props.text}</p>
            </div>
        </div>
    );
};
  
type MessagesProps = {
messages: MessageProps[];
onClick: () => void;
loading: boolean;
};
  
  const Messages: React.FC<MessagesProps> = props => {
    useEffect(() => {
      const chatElement = document.getElementById('chat');
      if (chatElement) {
        chatElement.scrollTop = chatElement.scrollHeight;
      }
    });
  
    return (
      <div id="chat" onClick={props.onClick}>
        {props.loading ? (
          <div>
            <CircularProgress />
          </div>
        ) : (
          <div>
            {props.messages.map(message => (
              <Message
                _id={message._id}
                key={message._id}
                name={message.name}
                userId={message.userId}
                text={message.text}
                date={message.date}
              />
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default Messages;