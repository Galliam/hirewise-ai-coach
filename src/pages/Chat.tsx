
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BottomNavigation from "@/components/BottomNavigation";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Bonjour ! Je suis votre assistant IA Hirewise. Je peux vous aider avec :",
      timestamp: "16:07",
      features: [
        "✅ Préparation d'entretien",
        "✅ Conseils de carrière", 
        "✅ Analyse de CV",
        "✅ Négociation salariale"
      ]
    },
    {
      id: 2,
      type: "ai",
      content: "Comment puis-je vous aider aujourd'hui ?",
      timestamp: "16:07",
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: messages.length + 1,
        type: "user" as const,
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages(prev => [...prev, userMessage]);
      setNewMessage("");
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          type: "ai" as const,
          content: "Thanks for your message! I'm here to help you with your job search and career development.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto">
        <div className="bg-white px-4 py-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">💬</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Assistant IA Hirewise</h1>
                <p className="text-sm text-green-600">En ligne</p>
              </div>
            </div>
            <button className="text-gray-600">⋮</button>
          </div>
        </div>
        
        <div className="p-4 space-y-4 min-h-[calc(100vh-200px)]">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-900 shadow-sm border border-gray-100'
              }`}>
                {message.type === 'ai' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">🤖</span>
                    </div>
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
                {message.features && (
                  <div className="mt-3 space-y-1">
                    {message.features.map((feature, index) => (
                      <p key={index} className="text-sm text-gray-700">{feature}</p>
                    ))}
                  </div>
                )}
                <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-md mx-auto flex space-x-2">
            <Input
              placeholder="Tapez votre message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1"
            />
            <Button 
              onClick={sendMessage}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 w-10 h-10 rounded-full p-0"
            >
              ➤
            </Button>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Chat;
