
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RecruiterBottomNavigation from "@/components/RecruiterBottomNavigation";
import CandidateProfile from "@/components/CandidateProfile";
import { useApplications } from "@/hooks/useApplications";
import { useMessages } from "@/hooks/useMessages";
import { useToast } from "@/hooks/use-toast";

const RecruiterChat = () => {
  const { toast } = useToast();
  const { applications, loading: applicationsLoading, updateApplicationStatus } = useApplications();
  const { conversations, messages, loading: messagesLoading, fetchMessages, sendMessage } = useMessages();
  
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState<'conversations' | 'applications'>('applications');

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

  const handleMessageCandidate = (candidateId: string) => {
    setSelectedApplication(null);
    setSelectedConversation(candidateId);
    setActiveTab('conversations');
    fetchMessages(candidateId);
  };

  const handleUpdateStatus = async (applicationId: string, status: string) => {
    try {
      await updateApplicationStatus(applicationId, status);
      toast({
        title: "Application Updated",
        description: `Application status changed to ${status}.`,
      });
      setSelectedApplication(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update application status.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto">
        <div className="bg-white px-4 py-6 shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">Candidate Management</h1>
          <p className="text-gray-600">Manage applications and chat with candidates</p>
          
          {/* Tab Navigation */}
          <div className="flex mt-4 border-b">
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'applications'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500'
              }`}
            >
              Recent Applications ({applications.length})
            </button>
            <button
              onClick={() => setActiveTab('conversations')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'conversations'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500'
              }`}
            >
              Messages ({conversations.length})
            </button>
          </div>
        </div>

        {/* Selected Application Profile View */}
        {selectedApplication && (
          <div className="p-4">
            <CandidateProfile
              application={selectedApplication}
              onMessage={handleMessageCandidate}
              onUpdateStatus={handleUpdateStatus}
              onClose={() => setSelectedApplication(null)}
            />
          </div>
        )}

        {/* Selected Conversation View */}
        {selectedConversation && !selectedApplication && (
          <div className="flex flex-col h-[calc(100vh-200px)]">
            <div className="bg-white px-4 py-3 shadow-sm border-b">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setSelectedConversation(null)}
                  className="text-blue-600"
                >
                  ← Back
                </button>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {conversations.find(c => 
                      c.sender_id === selectedConversation || c.recipient_id === selectedConversation
                    )?.other_user?.first_name} {conversations.find(c => 
                      c.sender_id === selectedConversation || c.recipient_id === selectedConversation
                    )?.other_user?.last_name}
                  </h3>
                  <p className="text-xs text-gray-500">Candidate</p>
                </div>
              </div>
            </div>

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
                <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                  Send
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {!selectedConversation && !selectedApplication && (
          <div className="p-4">
            {activeTab === 'applications' && (
              <div className="space-y-3">
                {applicationsLoading ? (
                  <div className="text-center py-8">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading applications...</p>
                  </div>
                ) : applications.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📋</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                    <p className="text-gray-600">New applications will appear here.</p>
                  </div>
                ) : (
                  applications.map((application) => (
                    <div 
                      key={application.id}
                      onClick={() => setSelectedApplication(application)}
                      className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:bg-gray-50 border border-gray-100"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium text-sm">
                              {application.applicant.first_name?.[0]}{application.applicant.last_name?.[0]}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 truncate">
                              {application.applicant.first_name} {application.applicant.last_name}
                            </h3>
                            <p className="text-sm text-gray-600 truncate">{application.job.title}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {application.application_insights?.matchScore && (
                            <span className="text-lg font-bold text-blue-600">
                              {application.application_insights.matchScore}%
                            </span>
                          )}
                          <p className="text-xs text-gray-500">
                            {new Date(application.applied_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          application.status === 'applied' ? 'bg-yellow-100 text-yellow-800' :
                          application.status === 'approved' ? 'bg-green-100 text-green-800' :
                          application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {application.status || 'New'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {application.job_seeker_profile?.years_experience || 0} years exp
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'conversations' && (
              <div className="space-y-3">
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
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations</h3>
                    <p className="text-gray-600">Start messaging candidates from their profiles.</p>
                  </div>
                ) : (
                  conversations.map((conversation) => {
                    const otherUserId = conversation.sender_id !== conversation.recipient_id ? 
                      (conversation.sender_id === conversation.recipient_id ? conversation.sender_id : conversation.recipient_id) : 
                      conversation.recipient_id;
                    
                    return (
                      <div 
                        key={conversation.conversation_id}
                        onClick={() => handleSelectConversation(otherUserId)}
                        className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:bg-gray-50 border border-gray-100"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-lg">👤</span>
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
                  })
                )}
              </div>
            )}
          </div>
        )}
      </div>
      
      <RecruiterBottomNavigation />
    </div>
  );
};

export default RecruiterChat;
