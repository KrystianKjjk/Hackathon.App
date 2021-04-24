import React, { useState } from 'react';
import { InputBase, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

// import styles from './MsgInput.module.css';

type Props = {
  sendClick: (msg: string, date: string) => void;
  onClick: () => void;
};

const MsgInput: React.FC<Props> = props => {
  const [msg, setMsg] = useState('');

  const getDateString = () => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    let dateObj = new Date();
    let month = monthNames[dateObj.getMonth()];
    let day = String(dateObj.getDate());
    let output = month + ' ' + day + ',';

    return `${output} - ${new Date().getHours()}:${new Date().getMinutes()}`;
  };

  const sendHandler = () => {
    props.sendClick(msg, getDateString());
    setMsg('');
  };

  return (
    <div onClick={props.onClick}>
      <InputBase
        placeholder="Write here..."
        value={msg}
        onChange={e => setMsg(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') sendHandler();
        }}
      />
      <IconButton onClick={sendHandler}>
        <SendIcon/>
      </IconButton>
    </div>
  );
};

export default MsgInput;