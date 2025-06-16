
import { useState } from "react";
import RecruiterBottomNavigation from "@/components/RecruiterBottomNavigation";

const RecruiterChat = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  const chats = [
    { 
      id: 1, 
      name: "Sarah Chen", 
      role: "Software Engineer",
      lastMessage: "Thank you for considering my application. I'm very interested in this role.",
      time: "2 hours ago",
      unread: 2,
      avatar: "👩‍💻"
    },
    { 
      id: 2, 
      name: "Mike Johnson", 
      role: "Product Manager",
      lastMessage: "I'd love to schedule a call to discuss the position further.",
      time: "1 day ago",
      unread: 0,
      avatar: "👨‍💼"
    },
    { 
      id: 3, 
      name: "Emily Rodriguez", 
      role: "UX Designer",
      lastMessage: "I'm available for the interview next week.",
      time: "2 days ago",
      unread: 1,
      avatar: "🎨"
    },
  ];

  const messages = [
    { id: 1, sender: "candidate", message: "Hi! I just applied for the Senior Software Engineer position.", time: "10:30 AM" },
    { id: 2, sender: "recruiter", message: "Thank you for your application! I've reviewed your profile and I'm impressed with your background.", time: "2:15 PM" },
    { id: 3, sender: "candidate", message: "Thank you for considering my application. I'm very interested in this role.", time: "4:20 PM" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto">
        <div className="bg-white px-4 py-6 shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">Chat with candidates and manage conversations</p>
        </div>

        {!selectedChat ? (
          <div className="p-4 space-y-3">
            {chats.map((chat) => (
              <div 
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-lg">{chat.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{chat.time}</span>
                        {chat.unread > 0 && (
                          <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{chat.role}</p>
                    <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col h-[calc(100vh-140px)]">
            <div className="bg-white px-4 py-3 shadow-sm border-b">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setSelectedChat(null)}
                  className="text-blue-600"
                >
                  ← Back
                </button>
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm">👩‍💻</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Sarah Chen</h3>
                  <p className="text-xs text-gray-500">Software Engineer</p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'recruiter' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'recruiter' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white border border-gray-200'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'recruiter' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-4 border-t">
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  placeholder="Type a message..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <RecruiterBottomNavigation />
    </div>
  );
};

export default RecruiterChat;
