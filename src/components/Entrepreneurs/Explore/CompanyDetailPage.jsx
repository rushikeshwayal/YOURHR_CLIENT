import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams

/* ---------- Reusable Section Component ---------- */
const DetailSection = ({ title, children }) => {
  if (!children) return null;
  return (
    <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
      <h2 className="text-2xl font-bold text-white mb-3 border-b-2 border-primary/30 pb-2">
        {title}
      </h2>
      <p className="text-slate-300 leading-relaxed whitespace-pre-line">{children}</p>
    </div>
  );
};

/* ---------- Reusable Info Item ---------- */
const InfoItem = ({ label, value, href }) => {
  if (!value) return null;
  return (
    <li className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-slate-800">
      <span className="font-semibold text-slate-400">{label}</span>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate sm:ml-4">
          {value}
        </a>
      ) : (
        <span className="text-white truncate sm:ml-4">{value}</span>
      )}
    </li>
  );
};

/* ---------- Job Card (for use in CompanyJobsSection) ---------- */
const JobCard = ({ job }) => {
  // Navigate to the specific job detail page
  const handleApplyClick = () => {
    window.location.href = `/company-job/${job.job_id}`;
  };

  const postedDate = new Date(job.posted_date).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex-grow">
        <h4 className="text-xl font-bold text-white">{job.title}</h4>
        <p className="text-primary mt-1">{job.role}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-400 mt-3">
          <span className="flex items-center gap-1.5">📍 {job.location}</span>
          <span className="flex items-center gap-1.5">💼 {job.job_type}</span>
          <span className="flex items-center gap-1.5">⏱️ {job.experience_required}</span>
        </div>
      </div>
      <div className="flex-shrink-0 flex flex-col md:items-end gap-2">
        <button
          onClick={handleApplyClick}
          className="w-full md:w-auto rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-transform duration-300 hover:scale-105 hover:bg-primary/90"
        >
          Apply Now
        </button>
        <span className="text-xs text-slate-500 text-center md:text-right">Posted on {postedDate}</span>
      </div>
    </div>
  );
};

/* ---------- Jobs Section (Fetches Company Jobs) ---------- */
const CompanyJobsSection = ({ companyId, companyName }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!companyId) {
      setLoading(false); return;
    }
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/company-jobs/get/company/${companyId}`);
        if (!response.ok) throw new Error(`Failed jobs fetch. Status: ${response.status}`);
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        console.error("Fetch error (jobs):", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [companyId]);

  if (loading) return <div className="py-16 text-center text-slate-400 animate-pulse">Loading job openings...</div>;
  if (error) return <div className="py-16 text-center text-red-500">Error loading jobs.</div>;

  // Show message if no jobs found
  if (jobs.length === 0) {
    return (
      <section className="py-16 sm:py-24 border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8">Job Openings</h2>
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-8 text-center">
            <h3 className="text-xl font-semibold text-white">No Open Positions</h3>
            <p className="text-slate-400 mt-2">There are currently no open positions listed for {companyName || 'this company'}.</p>
          </div>
        </div>
      </section>
    );
  }

  // Render jobs list
  return (
    <section className="py-16 sm:py-24 border-t border-slate-800">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8">Job Openings</h2>
        <div className="space-y-6">
          {jobs.map(job => (
            <JobCard key={job.job_id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- Main Company Detail Page ---------- */
const CompanyDetailPage = () => {
  // Use useParams to get the company ID from the route '/company/:companyId'
  const { id: companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      setLoading(true);
      setError(null); // Reset error on new fetch
      try {
        if (!companyId) throw new Error("Company ID not found in URL.");

        const response = await fetch(`http://localhost:8000/companies/get/companies/${companyId}`);
        if (!response.ok) throw new Error(`Fetch failed. Status: ${response.status}`);

        const data = await response.json();
        setCompany(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyData();
  }, [companyId]); // Refetch if companyId changes

  if (loading) return (
    <main className="py-16 sm:py-24 bg-black text-white min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold animate-pulse">Loading Company Details...</h2>
    </main>
  );

  if (error) return (
    <main className="py-16 sm:py-24 bg-black text-white min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-red-500">Error Loading Company</h2>
      <p className="text-slate-400 mt-2">{error}</p>
      <a href="/explore" className="mt-6 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white">Back to Explore</a>
    </main>
  );

  if (!company) return null; // Should not happen if loading/error handled

  const {
    name, logo_url, industry, company_type, description, mission, vision, goals,
    ceo_name, ceo_image_url, user_email, founded_year, employee_count, address,
    city, state, country, phone_number, website, linkedin_url,
  } = company;

  const location = [city, state, country].filter(Boolean).join(', ');
  const hasHeroImage = ceo_image_url && ceo_image_url !== 'https://example.com/';

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full flex items-center justify-center text-center overflow-hidden"
        style={hasHeroImage ? { backgroundImage: `url(${ceo_image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      >
        <div className={`absolute inset-0 ${hasHeroImage ? 'bg-black/60 backdrop-brightness-50' : 'bg-gradient-to-br from-[#0a052e] via-[#0a052e] to-[#120b4a]'} z-10`}></div>
        <div className="relative z-20 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <img src={logo_url || 'https://placehold.co/150x150/1e293b/94a3b8?text=Logo'} alt={`${name} Logo`} className="h-28 w-28 rounded-xl object-cover border-4 border-slate-400 shadow-xl mb-4" />
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-lg">{name}</h1>
          <p className="mt-4 text-lg md:text-xl text-slate-200 max-w-3xl drop-shadow">{description}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {industry && <span className="inline-flex rounded-full bg-cyan-900/70 px-4 py-1.5 text-sm font-semibold text-cyan-300 shadow">{industry}</span>}
            {company_type && <span className="inline-flex rounded-full bg-indigo-900/70 px-4 py-1.5 text-sm font-semibold text-indigo-300 shadow">{company_type}</span>}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {website && <a href={website} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-transform duration-300 hover:scale-105 hover:bg-primary/90">Visit Website</a>}
            {linkedin_url && <a href={linkedin_url} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-slate-800/70 px-6 py-3 text-base font-semibold text-slate-200 shadow-md transition-colors duration-300 hover:bg-slate-700">LinkedIn Profile</a>}
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <DetailSection title="Mission">{mission}</DetailSection>
              <DetailSection title="Vision">{vision}</DetailSection>
              <DetailSection title="Goals">{goals}</DetailSection>
            </div>
            {/* Right Column (Sidebar) */}
            <div className="lg:col-span-1 space-y-8">
              {ceo_name && (
                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                  <h3 className="text-xl font-bold text-white mb-4">CEO</h3>
                  <div className="flex items-center gap-4">
                    {!hasHeroImage && ceo_image_url && (
                      <img src={ceo_image_url || 'https://placehold.co/100x100/1e293b/94a3b8?text=CEO'} alt={ceo_name} className="h-16 w-16 rounded-full object-cover border-2 border-slate-700" />
                    )}
                    <div>
                      <div className="text-lg font-semibold text-white">{ceo_name}</div>
                      {user_email && <div className="text-sm text-slate-400 truncate">{user_email}</div>}
                    </div>
                  </div>
                </div>
              )}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                <h3 className="text-xl font-bold text-white mb-4">Company Details</h3>
                <ul className="divide-y divide-slate-800">
                  <InfoItem label="Founded" value={founded_year} />
                  <InfoItem label="Employees" value={employee_count} />
                  <InfoItem label="Location" value={location} />
                  <InfoItem label="Address" value={address} />
                  <InfoItem label="Phone" value={phone_number} href={`tel:${phone_number}`} />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      {/* Pass companyId and name to the jobs section */}
      <CompanyJobsSection companyId={companyId} companyName={name} />
    </main>
  );
};

export default CompanyDetailPage;