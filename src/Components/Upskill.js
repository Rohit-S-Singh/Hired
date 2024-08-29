import React, { useState } from 'react';

const currentSkillsData = [
  { skill: 'React Js', proficiency: 'Advanced', testCleared: true, interviewLeft: false },
  { skill: 'Node Js', proficiency: 'Intermediate', testCleared: false, interviewLeft: true },
  { skill: 'Java', proficiency: 'Beginner', testCleared: false, interviewLeft: true },
  // Add more skills as needed
];

const upskillChoices = [
  'LLD', 'HLD', 'React Js', 'Node Js', 'Java', '.NET', 'SpringBoot', 'Next JS', 'Testing'
];

const Upskill = () => {
  const [selectedSkill, setSelectedSkill] = useState('');

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
  };

  const renderSkillStatus = (skillData) => {
    return (
      <div className="flex justify-between items-center border-b py-2 px-4">
        <div className="font-semibold">{skillData.skill} ({skillData.proficiency})</div>
        <div className="flex items-center space-x-2">
          {skillData.testCleared ? (
            <span className="text-green-600">✔ Test Cleared</span>
          ) : (
            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              Take Test
            </button>
          )}
          {skillData.interviewLeft ? (
            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              Take Interview
            </button>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 space-y-8">
      {/* Current Skills Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Current Skills & Proficiency</h2>
        <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
          {currentSkillsData.map((skillData) => (
            <div key={skillData.skill}>
              {renderSkillStatus(skillData)}
            </div>
          ))}
        </div>
      </div>

      {/* Skills to Upskill Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Skills to Upskill</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {upskillChoices.map((choice) => (
            <div
              key={choice}
              className={`bg-white border border-gray-300 rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg ${
                selectedSkill === choice ? 'bg-blue-100 border-blue-500' : ''
              }`}
              onClick={() => handleSkillSelect(choice)}
            >
              <h3 className="text-lg font-semibold">{choice}</h3>
              {selectedSkill === choice && (
                <div className="mt-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">
                    Give Tests
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Go Through Notes/Articles
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upskill;
