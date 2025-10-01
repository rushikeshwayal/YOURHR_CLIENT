import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Lodder from "../Authentication/components/Lodding/LodderFile";
import { useAuth } from "../Authentication/components/firebase/firebase";
import NavBarBlack from "../NavBar/NavToHomeBlack";
import Footer from "../Footer/Footer";

// Displays a single detail item (e.g., Location, Salary)
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start text-gray-600 mb-4">
    <div className="flex-shrink-0 w-6 h-6 mr-3 text-gray-400">{icon}</div>
    <div>
      <p className="font-semibold text-gray-800">{label}</p>
      <p className="text-gray-600">{value}</p>
    </div>
  </div>
);

// Renders the list of skills as styled tags
const SkillsTags = ({ skills }) => {
  const skillList = skills.split(",").map((skill) => skill.trim());
  return (
    <div className="flex flex-wrap gap-2">
      {skillList.map((skill, index) => (
        <span
          key={index}
          className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
        >
          {skill}
        </span>
      ))}
    </div>
  );
};

export default function JobDetails() {
  const { currentUser } = useAuth();
  const userEmail = currentUser?.email || "";
  const location = useLocation();
  const jobId = new URLSearchParams(location.search).get("id");

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applied, setApplied] = useState(false);
  const [whyHired, setWhyHired] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [savedResumes, setSavedResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState("");

  // Interview questions state
  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [showQuestionsModal, setShowQuestionsModal] = useState(false);

  // Skill gaps state
  const [skillGaps, setSkillGaps] = useState([]);
  const [loadingSkillGaps, setLoadingSkillGaps] = useState(false);
  const [showSkillGaps, setShowSkillGaps] = useState(false);

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) {
        setError("Job ID is missing from the URL.");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`http://localhost:8000/jobs/${jobId}`);
        if (!res.ok) throw new Error("Could not fetch job details.");
        const data = await res.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  // Check if already applied
  useEffect(() => {
    const checkApplied = async () => {
      if (!userEmail || !jobId) return;
      try {
        const res = await fetch("http://localhost:8000/applications");
        if (!res.ok) return;
        const data = await res.json();
        const found = data.some(
          (app) => app.email === userEmail && String(app.job_id) === String(jobId)
        );
        setApplied(found);
      } catch (err) {
        console.error("Failed to check application status:", err);
      }
    };
    checkApplied();
  }, [userEmail, jobId]);

  // Fetch latest resume for the user
  useEffect(() => {
    const fetchLatestResume = async () => {
      if (!userEmail) return;
      try {
        const usersRes = await fetch("http://localhost:8000/users");
        if (!usersRes.ok) return;
        const users = await usersRes.json();
        const user = users.find(
          (u) => u.email_address?.toLowerCase() === userEmail.toLowerCase()
        );
        if (!user) return;
        const resumesRes = await fetch(`http://localhost:8000/resumes/user/${user.id}`);
        if (!resumesRes.ok) return;
        const resumes = await resumesRes.json();
        if (resumes.length > 0) {
          setSavedResumes([resumes[resumes.length - 1]]);
        } else {
          setSavedResumes([]);
        }
      } catch (err) {
        console.error("Failed to load resumes:", err);
      }
    };
    fetchLatestResume();
  }, [userEmail]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!selectedResumeId) {
      alert("Please select your resume.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:8000/applications/post/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          resume_link: selectedResumeId,
          why_hired: whyHired,
          job_id: Number(jobId),
        }),
      });
      if (res.ok) {
        setApplied(true);
      } else {
        const errorData = await res.json();
        alert(`Error applying for job: ${errorData.detail || "Unknown error"}`);
      }
    } catch (err) {
      alert("An unexpected error occurred while applying.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateQuestions = async () => {
    if (!jobId) return;
    setLoadingQuestions(true);
    setQuestions([]);
    try {
      const res = await fetch(
        `http://localhost:8000/jobs/interview-questions/${jobId}`
      );
      if (!res.ok) throw new Error("Failed to fetch interview questions");
      const data = await res.json();
      setQuestions(data);
      setShowQuestionsModal(true); // open modal
    } catch (err) {
      alert("Could not generate interview questions.");
      console.error(err);
    } finally {
      setLoadingQuestions(false);
    }
  };
  // handle skill gaps
  const handleSkillGaps = async () => {
    if (!jobId || !currentUser?.email) return;

    setLoadingSkillGaps(true);
    setSkillGaps([]);

    try {
      // 1️⃣ Fetch user info by email to get numeric ID
      const email = encodeURIComponent(currentUser.email);
      const userRes = await fetch(`http://localhost:8000/users/email/${email}`);
      if (!userRes.ok) throw new Error("Failed to fetch user info by email");
      const userData = await userRes.json();
      const userId = userData.id; // numeric ID required for skill-gap API

      // 2️⃣ Fetch skill gaps using the numeric user ID
      const res = await fetch(`http://localhost:8000/jobs/skill-gaps/${jobId}/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch skill gaps");
      const data = await res.json();

      // Check if API returned the expected format
      if (Array.isArray(data) && data.length > 0 && data[0].skill_gap) {
        setSkillGaps(data);
      } else {
        setSkillGaps(null); // indicate "no skill gap"
      }

      setShowSkillGaps(true); // open modal
    } catch (err) {
      console.error(err);
      setSkillGaps(null);
      setShowSkillGaps(true);
    } finally {
      setLoadingSkillGaps(false);
    }
  };


  const handleDownloadQuestions = () => {
    const blob = new Blob([JSON.stringify(questions, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `interview_questions_job_${jobId}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <Lodder />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-center">
        <div>
          <h2 className="text-2xl font-bold text-red-600">
            {error ? "An Error Occurred" : "Job Not Found"}
          </h2>
          <p className="text-gray-600 mt-2">
            {error || "We couldn't find the job you're looking for."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBarBlack />
      <main className="container mx-auto px-4 py-12 lg:py-16">
        {/* Job Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            {job.job_title}
          </h1>
          <p className="mt-3 text-xl text-gray-600">{job.company_name}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left Column: Job Description & Apply Form */}
            <div className="lg:col-span-2 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Job Description
              </h2>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p>{job.job_description}</p>
              </div>

              {/* Application Form */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Apply for this role
                </h2>
                {applied ? (
                  <div className="p-6 bg-green-50 text-green-800 border-l-4 border-green-500 rounded-r-lg text-center">
                    <p className="font-bold text-lg">Application Sent!</p>
                    <p>You have successfully applied for this position.</p>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="space-y-6">
                    <div>
                      <label className="block mb-2 text-lg font-semibold text-gray-700">
                        Select Your Latest Resume
                      </label>
                      {savedResumes.length > 0 ? (
                        <select
                          value={selectedResumeId}
                          onChange={(e) => setSelectedResumeId(e.target.value)}
                          required
                          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="">-- Select Resume --</option>
                          <option value={savedResumes[0].id}>
                            {savedResumes[0].resume_data?.personal?.name} –{" "}
                            {savedResumes[0].resume_data?.personal?.headline || "Resume"}
                          </option>
                        </select>
                      ) : (
                        <p className="text-gray-500">
                          No resume found. Please create one in the Resume section.
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="whyHired"
                        className="block mb-2 text-lg font-semibold text-gray-700"
                      >
                        Why should you be hired for this role?
                      </label>
                      <textarea
                        id="whyHired"
                        value={whyHired}
                        onChange={(e) => setWhyHired(e.target.value)}
                        required
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        rows={6}
                        placeholder="Share your qualifications, experience, and passion..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting || !selectedResumeId}
                      className="w-full px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Job Overview */}
            <div className="lg:col-span-1 p-8 lg:p-12 bg-gray-50">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Job Overview
              </h3>
              <DetailItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                }
                label="Location"
                value={job.location}
              />
              <DetailItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
                label="Salary"
                value={job.salary_range}
              />
              <DetailItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
                label="Employment Type"
                value={job.employment_type}
              />
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Skills Required
                </h3>
                <SkillsTags skills={job.skills_required} />
              </div>

              {/* Interview Questions Button */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Interview Questions
                </h3>
                <button
                  onClick={handleGenerateQuestions}
                  className="w-full px-4 py-2 mb-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  disabled={loadingQuestions}
                >
                  {loadingQuestions ? "Generating..." : "Generate Questions"}
                </button>
              </div>
              {/* Skill Gaps Button */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Skill Gaps</h3>
                <button
                  onClick={handleSkillGaps}
                  className="w-full px-4 py-2 mb-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  disabled={loadingSkillGaps}
                >
                  {loadingSkillGaps ? "Analyzing..." : "Generate Skill Gaps"}
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Interview Questions Modal */}
      {showQuestionsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-3xl p-6 relative">
            <button
              onClick={() => setShowQuestionsModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
            >
              &times;
            </button>

            <h3 className="text-xl font-bold mb-4 text-gray-800">Interview Questions</h3>

            {loadingQuestions ? (
              <p className="text-gray-600">Loading questions...</p>
            ) : questions.length > 0 ? (
              <>
                <ul className="list-disc list-inside mb-4 text-gray-700 max-h-96 overflow-y-auto">
                  {questions.map((q, idx) => (
                    <li key={idx} className="mb-2">
                      <strong>Q:</strong> {q.question}
                      {q.answer && (
                        <div className="ml-4 mt-1">
                          <strong>A:</strong> {q.answer}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleDownloadQuestions}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Download Questions
                </button>
              </>
            ) : (
              <p className="text-gray-600">No questions available.</p>
            )}
          </div>
        </div>
      )}

      {/* Skill Gaps Modal */}
      {showSkillGaps && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-3xl p-6 relative">
            <button
              onClick={() => setShowSkillGaps(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
            >
              &times;
            </button>

            <h3 className="text-xl font-bold mb-4 text-gray-800">Skill Gaps Analysis</h3>

            {loadingSkillGaps ? (
              <p className="text-gray-600">Loading skill gaps...</p>
            ) : skillGaps === null ? (
              <p className="text-gray-600 font-semibold">
                No skill gaps found. Great match! 🎉
              </p>
            ) : (
              <ul className="list-disc list-inside mb-4 text-gray-700 max-h-96 overflow-y-auto">
                {skillGaps.map((gap, idx) => (
                  <li key={idx} className="mb-2">
                    <strong>Skill Gap:</strong> {gap.skill_gap}
                    <div className="ml-4 mt-1">
                      <strong>Explanation:</strong> {gap.explanation}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
