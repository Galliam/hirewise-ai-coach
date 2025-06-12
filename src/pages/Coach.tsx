
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";

const Coach = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto">
        <div className="bg-white px-4 py-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🎓</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Coach Carrière</h1>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Développez vos compétences</p>
        </div>
        
        <div className="p-4">
          <div className="flex space-x-4 mb-6">
            <button className="text-blue-600 border-b-2 border-blue-600 pb-2 font-medium">
              Sessions
            </button>
            <button className="text-gray-500 pb-2">
              Préparation
            </button>
            <button className="text-gray-500 pb-2">
              Ressources
            </button>
          </div>
          
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">📅</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune session programmée</h3>
            <p className="text-gray-600 mb-6">Réservez votre première session de coaching</p>
            
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg mb-4">
              Réserver une session
            </Button>
          </div>
        </div>
        
        <div className="fixed bottom-20 right-4">
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-3 shadow-lg"
          >
            + Réserver
          </Button>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Coach;
