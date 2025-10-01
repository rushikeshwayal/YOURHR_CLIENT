import { useState, useEffect } from "react";
import { useAuth } from "../Authentication/components/firebase/firebase";
import Footer from "../Footer/Footer";
import NavBarBlack from "../NavBar/NavToHomeBlack";

const ResumePreview = ({ resumeData, onBack }) => {
    const { currentUser } = useAuth();
    const [userResumes, setUserResumes] = useState([]);

    useEffect(() => {
        const fetchUserResumes = async () => {
            try {
                const response = await fetch("http://localhost:8000/users");
                if (response.ok) {
                    const users = await response.json();
                    const currentUserData = users.find(
                        (user) =>
                            user.email_address?.toLowerCase() ===
                            currentUser?.email?.toLowerCase()
                    );
                    if (currentUserData) {
                        const resumesResponse = await fetch(
                            `http://localhost:8000/resumes/user/${currentUserData.id}`
                        );
                        if (resumesResponse.ok) {
                            const resumes = await resumesResponse.json();
                            setUserResumes(resumes);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching resumes:", error);
            }
        };
        if (currentUser) {
            fetchUserResumes();
        }
    }, [currentUser]);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
    };

    const formatYear = (year) => (year ? year : "");

    const printResume = () => window.print();

    const downloadResume = () => {
        alert("PDF download feature requires html2pdf library. For now, use Print to PDF.");
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 min-h-screen text-gray-800">
            <NavBarBlack />
            <div className="max-w-5xl mx-auto py-10 px-4">
                {/* Header Card */}
                <div className="bg-white rounded-2xl shadow-xl mb-6 p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center border border-gray-100">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        Resume Preview
                    </h1>
                    <div className="mt-4 sm:mt-0 flex space-x-3">
                        <button
                            onClick={onBack}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                        >
                            Back to Edit
                        </button>
                        <button
                            onClick={printResume}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        >
                            Print Resume
                        </button>
                        <button
                            onClick={downloadResume}
                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                        >
                            Download PDF
                        </button>
                    </div>
                </div>

                {/* Resume Content */}
                <div
                    id="resume-content"
                    className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                >
                    <div className="p-8">
                        {/* Personal Header */}
                        <div className="text-center border-b border-gray-200 pb-6 mb-6">
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-1">
                                {resumeData.personal.name || "Your Name"}
                            </h1>
                            <p className="text-lg text-gray-600">
                                {resumeData.personal.headline || "Professional Headline"}
                            </p>
                            <div className="mt-4 flex justify-center flex-wrap gap-4 text-sm text-gray-600">
                                {resumeData.personal.email && (
                                    <span>{resumeData.personal.email}</span>
                                )}
                                {resumeData.personal.phone && (
                                    <span>{resumeData.personal.phone}</span>
                                )}
                                {resumeData.personal.location && (
                                    <span>{resumeData.personal.location}</span>
                                )}
                            </div>
                            {resumeData.personal.linkedin && (
                                <div className="mt-3">
                                    <a
                                        href={resumeData.personal.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-600 hover:text-indigo-800 text-sm underline"
                                    >
                                        LinkedIn Profile
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Summary */}
                        {resumeData.summary && (
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-3 border-l-4 border-indigo-500 pl-3">
                                    Professional Summary
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    {resumeData.summary}
                                </p>
                            </section>
                        )}

                        {/* Work Experience */}
                        {resumeData.work_experience?.length > 0 && (
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-emerald-500 pl-3">
                                    Work Experience
                                </h2>
                                <div className="space-y-6">
                                    {resumeData.work_experience.map((exp, idx) => (
                                        <div key={idx} className="p-5 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {exp.title} — {exp.company}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">{exp.location}</p>
                                                </div>
                                                <span className="text-sm text-gray-500">
                                                    {exp.start_date && formatDate(exp.start_date)}{" "}
                                                    {exp.start_date && exp.end_date && "– "}
                                                    {exp.end_date ? formatDate(exp.end_date) : "Present"}
                                                </span>
                                            </div>
                                            {exp.description?.length > 0 && (
                                                <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">
                                                    {exp.description.map((item, i) => (
                                                        <li key={i}>{item}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Education */}
                        {resumeData.education?.length > 0 && (
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-yellow-500 pl-3">
                                    Education
                                </h2>
                                <div className="space-y-6">
                                    {resumeData.education.map((edu, idx) => (
                                        <div key={idx} className="p-5 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {edu.degree} — {edu.institution}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">{edu.location}</p>
                                                </div>
                                                <span className="text-sm text-gray-500">
                                                    {edu.start_year && formatYear(edu.start_year)}{" "}
                                                    {edu.start_year && edu.end_year && "– "}
                                                    {edu.end_year
                                                        ? formatYear(edu.end_year)
                                                        : edu.status === "ongoing"
                                                            ? "Present"
                                                            : ""}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Skills */}
                        {resumeData.skills?.length > 0 && (
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-3 border-l-4 border-purple-500 pl-3">
                                    Skills
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {resumeData.skills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Projects */}
                        {resumeData.projects?.length > 0 && (
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-pink-500 pl-3">
                                    Projects
                                </h2>
                                <div className="space-y-6">
                                    {resumeData.projects.map((project, idx) => (
                                        <div key={idx} className="p-5 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {project.name}
                                                </h3>
                                                {project.link && (
                                                    <a
                                                        href={project.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-indigo-600 hover:text-indigo-800 text-sm underline"
                                                    >
                                                        View Project
                                                    </a>
                                                )}
                                            </div>
                                            <p className="mt-1 text-gray-700">{project.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Certifications */}
                        {resumeData.certifications?.length > 0 && (
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-cyan-500 pl-3">
                                    Certifications
                                </h2>
                                <div className="space-y-3">
                                    {resumeData.certifications.map((cert, idx) => (
                                        <div
                                            key={idx}
                                            className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                                        >
                                            <div>
                                                <h3 className="text-md font-semibold text-gray-900">
                                                    {cert.name}
                                                </h3>
                                                <p className="text-sm text-gray-600">{cert.issuer}</p>
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                {cert.date && formatDate(cert.date)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Languages */}
                        {resumeData.languages?.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-3 border-l-4 border-rose-500 pl-3">
                                    Languages
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {resumeData.languages.map((lang, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-sm font-medium"
                                        >
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default ResumePreview;
