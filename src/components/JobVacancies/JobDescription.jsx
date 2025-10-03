import React from 'react';

const JobDescription = ({ description }) => (
    <>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Job Description
        </h2>
        <div className="prose prose-lg text-gray-600 max-w-none">
            <p>{description}</p>
        </div>
    </>
);

export default JobDescription;
