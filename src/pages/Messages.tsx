
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BottomNavigation from "@/components/BottomNavigation";
import { useMessages } from "@/hooks/useMessages";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Send } from "lucide-react";

const Messages = () => {
  const { toast } = useToast();
  const { conversations, messages, loading: messagesLoading, fetchMessages, sendMessage } = useMessages();
  
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      await sendMessage(selectedConversation, newMessage);
      setNewMessage("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSelectConversation = async (recipientId: string) => {
    setSelectedConversation(recipientId);
    await fetchMessages(recipientId);
  };

  const getOtherUserId = (conversation: any) => {
    return conversation.sender_id === conversation.recipient_id ? 
      conversation.sender_id : 
      (conversation.sender_id !== conversation.recipient_id ? 
        conversation.recipient_id : 
        conversation.sender_id);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white px-4 py-6 shadow-sm">
          <div className="flex items-center space-x-3">
            {selectedConversation && (
              <button 
                onClick={() => setSelectedConversation(null)}
                className="text-blue-600"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {selectedConversation ? 'Conversation' : 'Messages'}
              </h1>
              <p className="text-gray-600">
                {selectedConversation ? 
                  conversations.find(c => getOtherUserId(c) === selectedConversation)?.other_user?.first_name + ' ' + 
                  conversations.find(c => getOtherUserId(c) === selectedConversation)?.other_user?.last_name :
                  'Your conversations with recruiters'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Selected Conversation View */}
        {selectedConversation ? (
          <div className="flex flex-col h-[calc(100vh-200px)]">
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender_id === selectedConversation ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender_id === selectedConversation
                      ? 'bg-white border border-gray-200' 
                      : 'bg-blue-600 text-white'
                  }`}>
                    <p className="text-sm">{message.message_text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender_id === selectedConversation ? 'text-gray-500' : 'text-blue-100'
                    }`}>
                      {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white p-4 border-t">
              <div className="flex space-x-2">
                <Input 
                  type="text" 
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage} 
                  className="bg-blue-600 hover:bg-blue-700"
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* Conversations List */
          <div className="p-4">
            {messagesLoading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading conversations...</p>
              </div>
            ) : conversations.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations yet</h3>
                <p className="text-gray-600">Recruiters interested in your profile will message you here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {conversations.map((conversation) => {
                  const otherUserId = getOtherUserId(conversation);
                  
                  return (
                    <div 
                      key={conversation.conversation_id}
                      onClick={() => handleSelectConversation(otherUserId)}
                      className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:bg-gray-50 border border-gray-100"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium">
                            {conversation.other_user?.first_name?.[0]}{conversation.other_user?.last_name?.[0]}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-medium text-gray-900 truncate">
                              {conversation.other_user?.first_name} {conversation.other_user?.last_name}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500">
                                {new Date(conversation.last_message_at).toLocaleDateString()}
                              </span>
                              {conversation.unread_count > 0 && (
                                <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                                  {conversation.unread_count}
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 truncate">{conversation.last_message}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Messages;
