import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../Authentication/components/firebase/firebase";
import Lodder from "../Authentication/components/Lodding/LodderFile";
import NavBarBlack from "../NavBar/NavToHomeBlack";
import Footer from "../Footer/Footer";

// Import the new child components
import JobHeader from "./JobHeader";
import JobDescription from "./JobDescription";
import ApplicationForm from "./ApplicationForm";
import JobOverview from "./JobOverview";
import InterviewQuestionsModal from "./InterviewQuestionsModal";
import SkillGapsModal from "./SkillGapsModal";

export default function JobDetails() {
  const { currentUser } = useAuth();
  const userEmail = currentUser?.email || "";
  const location = useLocation();
  const jobId = new URLSearchParams(location.search).get("id");

  // State Management
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applied, setApplied] = useState(false);
  const [whyHired, setWhyHired] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedResumes, setSavedResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [showQuestionsModal, setShowQuestionsModal] = useState(false);
  const [skillGaps, setSkillGaps] = useState([]);
  const [loadingSkillGaps, setLoadingSkillGaps] = useState(false);
  const [showSkillGaps, setShowSkillGaps] = useState(false);

  // --- DATA FETCHING (useEffect hooks) ---
  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) {
        setError("Job ID is missing.");
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

  useEffect(() => {
    const fetchLatestResume = async () => {
      if (!userEmail) return;
      try {
        const usersRes = await fetch("http://localhost:8000/users");
        if (!usersRes.ok) return;
        const users = await usersRes.json();
        const user = users.find((u) => u.email_address?.toLowerCase() === userEmail.toLowerCase());
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

  // --- EVENT HANDLERS ---
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
      const res = await fetch(`http://localhost:8000/jobs/interview-questions/${jobId}`);
      if (!res.ok) throw new Error("Failed to fetch interview questions");
      const data = await res.json();
      setQuestions(data);
      setShowQuestionsModal(true);
    } catch (err) {
      alert("Could not generate interview questions.");
      console.error(err);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleSkillGaps = async () => {
    if (!jobId || !currentUser?.email) return;
    setLoadingSkillGaps(true);
    setSkillGaps([]);
    try {
      const email = encodeURIComponent(currentUser.email);
      const userRes = await fetch(`http://localhost:8000/users/email/${email}`);
      if (!userRes.ok) throw new Error("Failed to fetch user info by email");
      const userData = await userRes.json();
      const userId = userData.id;
      const res = await fetch(`http://localhost:8000/jobs/skill-gaps/${jobId}/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch skill gaps");
      const data = await res.json();
      setSkillGaps(Array.isArray(data) && data.length > 0 && data[0].skill_gap ? data : null);
      setShowSkillGaps(true);
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

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-white"><Lodder /></div>;
  if (error || !job) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 text-center">
      <div>
        <h2 className="text-2xl font-bold text-red-600">{error ? "An Error Occurred" : "Job Not Found"}</h2>
        <p className="text-gray-600 mt-2">{error || "We couldn't find the job you're looking for."}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBarBlack />
      <main className="container mx-auto px-4 py-12 lg:py-16">
        <JobHeader title={job.job_title} company={job.company_name} />
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-gray-200">
              <JobDescription description={job.job_description} />
              <ApplicationForm
                applied={applied}
                savedResumes={savedResumes}
                selectedResumeId={selectedResumeId}
                setSelectedResumeId={setSelectedResumeId}
                whyHired={whyHired}
                setWhyHired={setWhyHired}
                handleApply={handleApply}
                isSubmitting={isSubmitting}
              />
            </div>
            <JobOverview
              job={job}
              handleGenerateQuestions={handleGenerateQuestions}
              loadingQuestions={loadingQuestions}
              handleSkillGaps={handleSkillGaps}
              loadingSkillGaps={loadingSkillGaps}
            />
          </div>
        </div>
      </main>
      <Footer />
      <InterviewQuestionsModal
        isOpen={showQuestionsModal}
        onClose={() => setShowQuestionsModal(false)}
        questions={questions}
        loading={loadingQuestions}
        onDownload={handleDownloadQuestions}
        jobId={jobId}
      />
      <SkillGapsModal
        isOpen={showSkillGaps}
        onClose={() => setShowSkillGaps(false)}
        skillGaps={skillGaps}
        loading={loadingSkillGaps}
      />
    </div>
  );
}
