import { useState } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import ProfileStrengthCard from "@/components/ProfileStrengthCard";
import SkillDetail from "@/components/SkillDetail";

const Profile = () => {
  const [selectedSkill, setSelectedSkill] = useState<any>(null);

  const skills = [
    {
      name: "JavaScript",
      level: 8,
      relatedTo: ["Frontend Development", "Backend Development", "Web Applications"],
      achievements: [
        "Build interactive user interfaces",
        "Develop full-stack applications", 
        "Create dynamic web experiences",
        "Implement complex business logic"
      ]
    },
    {
      name: "React",
      level: 7,
      relatedTo: ["Frontend Development", "Component Architecture", "State Management"],
      achievements: [
        "Build modern SPAs",
        "Create reusable UI components",
        "Manage application state effectively",
        "Optimize performance and user experience"
      ]
    },
    {
      name: "Node.js",
      level: 6,
      relatedTo: ["Backend Development", "API Development", "Server-side Programming"],
      achievements: [
        "Build scalable server applications",
        "Create RESTful APIs",
        "Handle real-time communications",
        "Implement microservices architecture"
      ]
    },
    {
      name: "Python",
      level: 5,
      relatedTo: ["Data Analysis", "Backend Development", "Machine Learning"],
      achievements: [
        "Automate repetitive tasks",
        "Build data processing pipelines",
        "Develop ML models",
        "Create backend services"
      ]
    },
    {
      name: "Communication",
      level: 8,
      relatedTo: ["Team Collaboration", "Client Relations", "Leadership"],
      achievements: [
        "Lead cross-functional teams",
        "Present to stakeholders",
        "Mentor team members",
        "Facilitate effective meetings"
      ]
    },
    {
      name: "Problem Solving",
      level: 9,
      relatedTo: ["Analytical Thinking", "Debugging", "System Design"],
      achievements: [
        "Solve complex technical challenges",
        "Design scalable solutions",
        "Debug production issues",
        "Optimize system performance"
      ]
    }
  ];

  const getGridPosition = (index: number) => {
    const positions = [
      "row-start-1 col-start-1", "row-start-1 col-start-2", "row-start-1 col-start-3",
      "row-start-2 col-start-1", "row-start-2 col-start-2", "row-start-2 col-start-3",
      "row-start-3 col-start-1", "row-start-3 col-start-2", "row-start-3 col-start-3"
    ];
    return positions[index] || "";
  };

  const getSkillColor = (level: number) => {
    if (level <= 3) return "bg-red-100 border-red-200 text-red-700";
    if (level <= 6) return "bg-yellow-100 border-yellow-200 text-yellow-700";
    return "bg-green-100 border-green-200 text-green-700";
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto">
        <div className="bg-white px-4 py-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Hirewise</h1>
            </div>
            <div className="flex space-x-2">
              <button className="text-gray-600">🔔</button>
              <button className="text-gray-600">👤</button>
            </div>
          </div>
        </div>
        
        <div className="p-4 space-y-6">
          <ProfileStrengthCard score={75} label="Good" />
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">9-Box Skills Grid</h2>
            <p className="text-sm text-gray-600 mb-4">Tap on any skill to see details and achievements</p>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              {skills.map((skill, index) => (
                <button
                  key={skill.name}
                  onClick={() => setSelectedSkill(skill)}
                  className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${getSkillColor(skill.level)} ${getGridPosition(index)}`}
                >
                  <div className="text-xs font-medium mb-1">{skill.name}</div>
                  <div className="text-lg font-bold">{skill.level}/9</div>
                </button>
              ))}
            </div>
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>Beginner (1-3)</span>
              <span>Intermediate (4-6)</span>
              <span>Advanced (7-9)</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Skill Categories</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="font-medium text-blue-900">Technical Skills</span>
                <span className="text-blue-600 font-bold">6.5/9</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="font-medium text-green-900">Soft Skills</span>
                <span className="text-green-600 font-bold">8.5/9</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {selectedSkill && (
        <SkillDetail
          skill={selectedSkill.name}
          level={selectedSkill.level}
          relatedTo={selectedSkill.relatedTo}
          achievements={selectedSkill.achievements}
          onClose={() => setSelectedSkill(null)}
        />
      )}
      
      <BottomNavigation />
    </div>
  );
};

export default Profile;
