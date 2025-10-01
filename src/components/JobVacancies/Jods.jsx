// src/Jobs.js

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/components/firebase/firebase";
import Lodder from "../Authentication/components/Lodding/LodderFile";
import NavBarBlack from "../NavBar/NavToHomeBlack";
import Footer from "../Footer/Footer";
import JobCard from "./JobCard"; // <-- Import the new component

export default function Jobs() {
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // This is available if you need to protect the route
  const [vacancies, setVacancies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all jobs
  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const res = await fetch("http://localhost:8000/jobs/");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setVacancies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVacancies();
  }, []);

  const handleApply = (id) => {
    navigate(`/job?id=${id}`);
  };

  const filteredVacancies = vacancies.filter(
    (vac) =>
      vac.job_title.toLowerCase().includes(search.toLowerCase()) ||
      vac.company_name.toLowerCase().includes(search.toLowerCase()) ||
      vac.skills_required.toLowerCase().includes(search.toLowerCase())
  );

  // Conditionally render content
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[50vh]">
          <Lodder />
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center text-red-500 min-h-[50vh]">
          <h2 className="text-2xl font-semibold">Something went wrong</h2>
          <p>Error: {error}</p>
        </div>
      );
    }

    // "No results" message
    if (filteredVacancies.length === 0) {
      return (
        <div className="text-center text-gray-500 min-h-[50vh]">
          <h2 className="text-2xl font-semibold">No Jobs Found</h2>
          <p>Try adjusting your search terms.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVacancies.map((vac) => (
          <JobCard key={vac.job_id} job={vac} onApply={handleApply} />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBarBlack />
      <main className="container mx-auto px-4 py-12 lg:py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
            Find Your Next Opportunity
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Browse through our curated list of exciting job roles.
          </p>
        </div>

        {/* Search Bar Section */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-lg">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </span>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, company, or skill..."
              className="w-full border border-gray-300 rounded-full py-3 pl-12 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Job Listings */}
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}