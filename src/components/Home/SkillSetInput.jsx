import  { useState } from 'react';

function SkillsInput() {
  const [skills, setSkills] = useState([]);  // State to store selected skills
  const [inputValue, setInputValue] = useState('');  // State to manage input value
  const allSkills = ['JavaScript', 'Python', 'React', 'Node.js', 'CSS', 'HTML', 'SQL', 'Java', 'C++'];  // List of all available skills

  // Function to handle adding a skill
  const addSkill = (skill) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);  // Add skill to skills array if not already present
      setInputValue('');  // Reset input value
    }
  };

  // Function to handle removing a skill
  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));  // Remove skill from skills array
  };

  return (
    <div className=" mb-5 flex flex-col items-start">
      {/* Input Field */}
      <label className='mb-5 block text-base font-semibold text-[#07074D] sm:text-xl'>Your Skills</label>
      <input
        type="text"
        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        placeholder="Type a skill and press enter..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}  // Update input value
        onKeyDown={(e) => {
          if (e.key === 'Enter') {  // Add skill when 'Enter' key is pressed
            addSkill(inputValue.trim());
            e.preventDefault();
          }
        }}
      />

      {/* Dropdown for skills suggestions */}
      {inputValue && (
        <div className="border rounded bg-white shadow-md mt-1 max-h-40 overflow-y-auto">
          {allSkills
            .filter(skill => skill.toLowerCase().includes(inputValue.toLowerCase()) && !skills.includes(skill))
            .map(skill => (
              <div
                key={skill}
                className="px-2 py-1 cursor-pointer hover:bg-gray-200"
                onClick={() => addSkill(skill)}  // Add skill when clicked from dropdown
              >
                {skill}
              </div>
            ))}
        </div>
      )}

      {/* Display Selected Skills */}
      <div className="flex flex-wrap mt-2">
        {skills.map(skill => (
          <div key={skill} className="flex items-center bg-[#e0e0e0] text-black px-3 py-1 m-1 rounded">
            {skill}
            <button
              className="ml-2 cursor-pointer"
              onClick={() => removeSkill(skill)}  // Remove skill when 'x' button is clicked
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsInput;
