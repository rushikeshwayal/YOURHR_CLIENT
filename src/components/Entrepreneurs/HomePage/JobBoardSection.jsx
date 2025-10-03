import React from 'react';
import { FiChevronDown } from 'react-icons/fi';

const JobRow = ({ company, role, location, type, posted }) => (
    <tr className="group border-b border-slate-800 transition-colors duration-200 hover:bg-slate-800/50">
        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">{company}</td>
        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-400">{role}</td>
        <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-slate-400 md:table-cell">{location}</td>
        <td className="hidden whitespace-nowrap px-6 py-4 lg:table-cell">
            <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold leading-5 ${type === 'Full-time' ? 'bg-emerald-900/60 text-emerald-300' : 'bg-indigo-900/60 text-indigo-300'}`}>
                {type}
            </span>
        </td>
        <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-slate-400 sm:table-cell">{posted}</td>
        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
            <a className="text-indigo-400 font-semibold hover:text-indigo-300 transition" href="#">Apply</a>
        </td>
    </tr>
);

const JobBoardSection = () => {
    const jobs = [
        { company: 'TechGenius Solutions', role: 'Senior Software Engineer', location: 'Remote', type: 'Full-time', posted: '2d ago' },
        { company: 'EcoStyle Living', role: 'Marketing Manager', location: 'New York, NY', type: 'Full-time', posted: '5d ago' },
        { company: 'HealthFirst Innovations', role: 'Product Manager', location: 'San Francisco, CA', type: 'Full-time', posted: '1w ago' },
        { company: 'EduTech Dynamics', role: 'Sales Representative', location: 'Remote', type: 'Part-time', posted: '2w ago' },
    ];
    return (
        <section className="py-16 sm:py-24 bg-black">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Job Board</h2>
                    <p className="mt-4 text-lg text-slate-400">Find your next role at a fast-growing startup.</p>
                </div>
                <div className="mb-6 flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 rounded-lg bg-indigo-600/20 px-4 py-2 text-sm font-medium text-indigo-300 hover:bg-indigo-600/30 transition">
                        All <FiChevronDown className="text-base" />
                    </button>
                    <button className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-700 transition">
                        Engineering <FiChevronDown className="text-base" />
                    </button>
                </div>
                <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50">
                    <table className="min-w-full">
                        <thead className="border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500" scope="col">Company</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500" scope="col">Role</th>
                                <th className="hidden px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 md:table-cell" scope="col">Location</th>
                                <th className="hidden px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 lg:table-cell" scope="col">Type</th>
                                <th className="hidden px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 sm:table-cell" scope="col">Posted</th>
                                <th className="relative px-6 py-3" scope="col"><span className="sr-only">Apply</span></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {jobs.map(job => <JobRow key={job.company + job.role} {...job} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default JobBoardSection;
