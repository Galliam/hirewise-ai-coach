
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <span className="text-blue-600 text-4xl">✓</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Hirewise</h1>
        <p className="text-blue-100 text-lg">Your AI recruiting agent</p>
        <div className="mt-8">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
