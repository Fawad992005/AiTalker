import React, { useState, useEffect, useRef } from "react";
import { generateResponse } from "./Apiservice";
import { Send, Loader2, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [streamingResponse, setStreamingResponse] = useState("");
  const [copiedCode, setCopiedCode] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Add welcome message when component mounts
    const welcomeMessage = {
      type: "bot",
      text:
        "👋 Hi! I'm your AI assistant. I can help you with:\n\n" +
        "- Writing and explaining code\n" +
        "- Answering technical questions\n" +
        "- Solving programming problems\n" +
        "- Providing coding tips and best practices\n\n" +
        "What would you like to know?",
    };
    setChatHistory([welcomeMessage]);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, streamingResponse]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const copyToClipboard = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const simulateStreaming = async (response) => {
    const characters = response.split("");
    for (let i = 0; i < characters.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 20));
      setStreamingResponse((prevResponse) => prevResponse + characters[i]);
    }
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { type: "bot", text: response },
    ]);
    setStreamingResponse("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userInput.trim()) {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { type: "user", text: userInput },
      ]);
      setUserInput("");
      setLoading(true);

      try {
        const response = await generateResponse(userInput);
        setLoading(false);
        await simulateStreaming(response);
      } catch (error) {
        console.error("Error generating response:", error);
        setLoading(false);
      }
    }
  };

  const renderMessage = (message) => {
    if (message.type === "user") {
      return <p className="text-sm break-words">{message.text}</p>;
    } else {
      return (
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const code = String(children).replace(/\n$/, "");

              return !inline && match ? (
                <div className="relative">
                  <button
                    onClick={() => copyToClipboard(code)}
                    className="absolute top-2 right-2 p-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
                    aria-label="Copy code"
                  >
                    {copiedCode === code ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-300" />
                    )}
                  </button>
                  <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {code}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            h1: ({ node, ...props }) => (
              <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-xl font-bold mt-3 mb-2" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-lg font-bold mt-2 mb-1" {...props} />
            ),
            p: ({ node, ...props }) => <p className="mb-2" {...props} />,
          }}
        >
          {message.text}
        </ReactMarkdown>
      );
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl h-full md:h-[85vh] flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Chat Header */}
        <div className="bg-indigo-600 px-4 sm:px-6 py-3 sm:py-4">
          <h2 className="text-lg sm:text-xl font-semibold text-white">
            AI Assistant
          </h2>
        </div>

        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] px-3 py-2 rounded-lg ${
                  message.type === "user"
                    ? "bg-indigo-600 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {renderMessage(message)}
              </div>
            </div>
          ))}
          {streamingResponse && (
            <div className="flex justify-start">
              <div className="max-w-[85%] px-3 py-2 rounded-lg bg-gray-100 text-gray-800 rounded-bl-none">
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      const code = String(children).replace(/\n$/, "");

                      return !inline && match ? (
                        <div className="relative">
                          <button
                            onClick={() => copyToClipboard(code)}
                            className="absolute top-2 right-2 p-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
                            aria-label="Copy code"
                          >
                            {copiedCode === code ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-300" />
                            )}
                          </button>
                          <SyntaxHighlighter
                            style={atomDark}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {code}
                          </SyntaxHighlighter>
                        </div>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                    h1: ({ node, ...props }) => (
                      <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="text-xl font-bold mt-3 mb-2" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="text-lg font-bold mt-2 mb-1" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="mb-2" {...props} />
                    ),
                  }}
                >
                  {streamingResponse}
                </ReactMarkdown>
              </div>
            </div>
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-3 py-2 flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
                <span className="text-sm text-gray-600">Thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              aria-label="Type your message"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              aria-label="Send message"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
