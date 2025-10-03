import React from 'react';

const JobHeader = ({ title, company }) => (
    <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            {title}
        </h1>
        <p className="mt-3 text-xl text-gray-600">{company}</p>
    </div>
);

export default JobHeader;