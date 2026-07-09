import { useState } from "react";
import axios from "axios";
import "./Chat.css";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = message;
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/chat",
        {
          message: currentMessage,
        }
      );

      const aiMessage = {
        sender: "ai",
        text: res.data.message,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Something went wrong.",
        },
      ]);
    }
  };

  return (
    <div className="chat-page">

      <aside className="sidebar">

        <h2 className="logo">🤖 Nova AI</h2>

        <button className="new-chat">
          + New Chat
        </button>

        <ul className="menu">
          <li>💬 Chat History</li>
          <li>⭐ Favorites</li>
          <li>📝 My Tasks</li>
          <li>📄 Documents</li>
          <li>📥 Export Chat</li>
          <li>⚙ Settings</li>
          <li>🚪 Logout</li>
        </ul>

      </aside>

      <div className="main">

        <header className="topbar">

          <h3>Nova AI Assistant</h3>

          <div className="profile">
            🌙 Bhavanasri
          </div>

        </header>

        <div className="messages">

          {messages.length === 0 ? (

            <>
              <div className="welcome">

                <h1>Welcome to Nova AI 👋</h1>

                <p>
                  Ask questions, upload files,
                  generate code or plan your day.
                </p>

              </div>

              <div className="suggestions">

                <div
                  className="card"
                  onClick={() => setMessage("Explain React Hooks")}
                >
                  💡 Explain React Hooks
                </div>

                <div
                  className="card"
                  onClick={() => setMessage("Create Node API")}
                >
                  🚀 Create Node API
                </div>

                <div
                  className="card"
                  onClick={() => setMessage("Summarize PDF")}
                >
                  📄 Summarize PDF
                </div>

                <div
                  className="card"
                  onClick={() => setMessage("Plan Today's Tasks")}
                >
                  📝 Plan Today's Tasks
                </div>

              </div>
            </>

          ) : (

            messages.map((msg, index) => (

              <div
                key={index}
                className={
                  msg.sender === "user"
                    ? "user-message"
                    : "ai-message"
                }
              >
                {msg.text}
              </div>

            ))

          )}

        </div>

        <div className="input-box">

          <button>📎</button>

          <button>🎤</button>

          <input
            type="text"
            placeholder="Ask Nova AI anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />

          <button
            className="send"
            onClick={sendMessage}
          >
            ➤
          </button>

        </div>

      </div>

    </div>
  );
}

export default Chat;