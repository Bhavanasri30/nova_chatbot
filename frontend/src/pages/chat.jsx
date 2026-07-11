import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./chat.css";

const suggestedPrompts = [
  "Summarize this project in simple terms",
  "Help me write a polished email",
  "Explain React hooks in an easy way",
  "Give me a productivity plan for today",
];

function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("nova-theme");
    return savedTheme === "dark";
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const fetchChatHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/history");
      setChatHistory(res.data.chats || []);
    } catch (err) {
      console.log(err);
    }
  };

  const createChat = async (title = "New Chat") => {
    try {
      const res = await axios.post("http://localhost:5000/api/history", {
        title,
      });

      setCurrentChatId(res.data.chat._id);
      await fetchChatHistory();

      return res.data.chat._id;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const deleteChat = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/history/${id}`);

      if (currentChatId === id) {
        setMessages([]);
        setCurrentChatId(null);
      }

      fetchChatHistory();
    } catch (err) {
      console.log(err);
    }
  };

  const loadChat = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/history/${id}`);

      setCurrentChatId(id);

      const msgs = res.data.chat.messages.map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
        timestamp: new Date().toISOString(),
      }));

      setMessages(msgs);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("nova-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    fetchChatHistory();
  }, []);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const distanceFromBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight;
      setIsNearBottom(distanceFromBottom < 120);
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!chatContainerRef.current || !isNearBottom) return;
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading, isNearBottom]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const sendMessage = async (prompt) => {
    const messageText = (prompt || input).trim();
    if (!messageText || loading) return;

    let chatId = currentChatId;

    if (!chatId) {
      chatId = await createChat(messageText);
    }

    if (!chatId) {
      setLoading(false);
      return;
    }

    const userMessage = {
      role: "user",
      content: messageText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    await axios.post(`http://localhost:5000/api/history/${chatId}/message`, {
      sender: "user",
      text: messageText,
    });
    setInput("");
    setLoading(true);
    setSidebarOpen(false);

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        message: messageText,
      });

      const aiMessage = {
        role: "assistant",
        content:
          response.data.reply ||
          response.data.message ||
          "Sorry, I couldn't understand.",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      await axios.post(`http://localhost:5000/api/history/${chatId}/message`, {
        sender: "assistant",
        text: aiMessage.content,
      });
      fetchChatHistory();
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Server error. Please check your backend connection.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setInput("");
    setLoading(false);
  };

  const handleNewChat = () => {
    clearChat();
    setCurrentChatId(null);
  };

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={`chat-page ${darkMode ? "dark" : "light"}`}>
      <div
        className={`sidebar-backdrop ${sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="brand">
            <div className="brand-icon">✦</div>
            <div>
              <h3>Nova AI</h3>
              <p>Smart assistant</p>
            </div>
          </div>
          <button
            className="icon-btn mobile-only"
            onClick={() => setSidebarOpen(false)}
            type="button"
          >
            ✕
          </button>
        </div>

        <button className="new-chat-btn" onClick={handleNewChat} type="button">
          + New Chat
        </button>

        <div className="sidebar-search">
          <span>🔎</span>
          <input placeholder="Search chats" />
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">Recent Chats</div>
          {chatHistory.length > 0 ? (
            chatHistory.map((chat) => (
              <div key={chat._id} className="history-row">
                <button
                  className="nav-item"
                  type="button"
                  onClick={() => loadChat(chat._id)}
                >
                  💬 {chat.title}
                </button>

                <button
                  className="delete-chat"
                  onClick={() => deleteChat(chat._id)}
                  type="button"
                >
                  🗑
                </button>
              </div>
            ))
          ) : (
            <button className="nav-item" type="button">
              💬 No chats yet
            </button>
          )}
        </nav>

        <div className="sidebar-section">
          <h4>Settings</h4>
          <button className="settings-btn" onClick={toggleTheme} type="button">
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <button className="settings-btn" onClick={clearChat} type="button">
            🧹 Clear chat
          </button>
        </div>

        <div className="sidebar-footer">
          <button
            className="settings-btn logout-btn"
            onClick={() => navigate("/login")}
            type="button"
          >
            ↩ Logout
          </button>
        </div>
      </aside>

      <main className="chat-section">
        <header className="chat-header">
          <div className="header-left">
            <button
              className="icon-btn mobile-only"
              onClick={() => setSidebarOpen(true)}
              type="button"
            >
              ☰
            </button>
            <div>
              <p className="eyebrow">Nova AI Assistant</p>
              <h2>Ask anything</h2>
            </div>
          </div>

          <div className="header-actions">
            <button className="theme-toggle" onClick={toggleTheme} type="button">
              {darkMode ? "☀️" : "🌙"}
            </button>
            <div className="profile-pill">
              <div className="avatar profile-avatar">U</div>
              <div>
                <strong>User</strong>
                <span>Online</span>
              </div>
            </div>
          </div>
        </header>

        <div className="messages" ref={chatContainerRef}>
          {messages.length === 0 ? (
            <div className="welcome-screen">
              <div className="welcome-card">
                <div className="welcome-icon">✨</div>
                <h3>Welcome to Nova AI</h3>
                <p>Start a conversation, ask for help, or try one of these prompts.</p>
                <div className="suggestions">
                  {suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      className="prompt-card"
                      onClick={() => sendMessage(prompt)}
                      type="button"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={`${msg.timestamp || index}-${index}`}
                className={`message ${msg.role === "user" ? "user-message" : "ai-message"}`}
              >
                <div className="avatar">
                  {msg.role === "user" ? "U" : "N"}
                </div>
                <div className="bubble-wrap">
                  <div className="bubble">{msg.content}</div>
                  <span className="timestamp">{formatTimestamp(msg.timestamp)}</span>
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="message ai-message">
              <div className="avatar">N</div>
              <div className="bubble-wrap">
                <div className="bubble typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="timestamp">Generating</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <form
          className="input-area"
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage();
          }}
        >
          <button className="icon-btn" type="button">
            📎
          </button>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            rows="1"
          />
          
            
          
          <button className="send-btn" type="submit" disabled={loading}>
            {loading ? "..." : "➤"}
          </button>
        </form>
      </main>
    </div>
  );
}

export default Chat;