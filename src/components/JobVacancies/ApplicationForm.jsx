import React from 'react';

const ApplicationForm = ({
    applied,
    savedResumes,
    selectedResumeId,
    setSelectedResumeId,
    whyHired,
    setWhyHired,
    handleApply,
    isSubmitting
}) => {
    if (applied) {
        return (
            <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Apply for this role
                </h2>
                <div className="p-6 bg-green-50 text-green-800 border-l-4 border-green-500 rounded-r-lg text-center">
                    <p className="font-bold text-lg">Application Sent!</p>
                    <p>You have successfully applied for this position.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Apply for this role
            </h2>
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
                    <label htmlFor="whyHired" className="block mb-2 text-lg font-semibold text-gray-700">
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
        </div>
    );
};

export default ApplicationForm;
