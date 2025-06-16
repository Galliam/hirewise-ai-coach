
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
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
        
        <div className="text-center space-y-6">
          <div className="space-y-3">
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
          
          <div className="space-y-4">
            <Link to="/auth">
              <Button 
                size="lg" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg"
              >
                Get Started
              </Button>
            </Link>
            
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/auth" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
