import { useState, useEffect } from 'react';

function Chat() {
  const [socket, setSocket] = useState<WebSocket>();
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState<string[]>([]);

  useEffect(() => {
    // WebSocket 객체 생성
    const ws = new WebSocket('ws://127.0.0.1:8001/ws/chat/');
    
    // 연결 성공 시
    ws.onopen = () => {
      console.log('WebSocket Connected');
    };
    
    // 메시지 수신 시
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newMsg = data.message;
      setChatLog((prev) => [...prev, newMsg]);
    };
    
    // 연결 종료 시
    ws.onclose = () => {
      console.log('WebSocket Disconnected');
    };
    
    setSocket(ws);
    
    // 컴포넌트 언마운트 시 소켓 닫기
    return () => {
      ws.close();
    };
  }, []);

  // 메시지 전송
  const sendMessage = () => {
    if (socket && message.trim() !== '') {
      socket.send(JSON.stringify({ message }));
      setMessage('');
    }
  };

  return (
    <div>
      <h1>실시간 채팅</h1>
      <ul>
        {chatLog.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
      <input 
        value={message} 
        onChange={e => setMessage(e.target.value)} 
      />
      <button onClick={sendMessage}>전송</button>
    </div>
  );
}

export default Chat;
