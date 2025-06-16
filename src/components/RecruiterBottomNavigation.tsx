
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const RecruiterBottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/recruiter-dashboard", label: "Home", icon: "🏠" },
    { path: "/recruiter-activity", label: "Activity", icon: "📊" },
    { path: "/recruiter-chat", label: "Chat", icon: "💬" },
    { path: "/recruiter-stats", label: "Stats", icon: "📈" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-[60px]",
              location.pathname === item.path
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecruiterBottomNavigation;
