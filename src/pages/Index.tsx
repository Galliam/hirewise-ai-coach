
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">✓</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hirewise</h1>
          <p className="text-gray-600">Your AI recruiting agent and personal job search coach</p>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm">🎯</span>
            </div>
            <p className="text-gray-700 text-sm">AI-powered job matching</p>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm">⚡</span>
            </div>
            <p className="text-gray-700 text-sm">One-click applications</p>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm">🎓</span>
            </div>
            <p className="text-gray-700 text-sm">Personal coaching support</p>
          </div>
        </div>
        
        <Button 
          onClick={() => navigate("/onboarding")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-medium"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Index;
