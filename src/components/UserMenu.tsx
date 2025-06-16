
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, User } from "lucide-react";

const UserMenu = () => {
  const { user, userProfile, signOut } = useAuth();

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-2 text-sm">
        <User className="w-4 h-4" />
        <span className="hidden sm:inline">
          {userProfile?.first_name} {userProfile?.last_name}
        </span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSignOut}
        className="text-gray-600 hover:text-gray-900"
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden sm:inline ml-1">Sign out</span>
      </Button>
    </div>
  );
};

export default UserMenu;
