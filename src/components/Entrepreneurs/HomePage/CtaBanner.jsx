import React from 'react';

const CtaBanner = () => (
    <section className="py-16 sm:py-24 bg-background-dark bg-black min-h-screen">
        <div className=" flex justify-center items-center">
            <div className="overflow-hidden rounded-2xl bg-black  p-8 sm:p-12 border border-slate-800 shadow-2xl">
                <div className="lg:self-center text-center  ">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        <span className="block">100+ Entrepreneurs already</span>
                        <span className="block text-primary">sharing their journey.</span>
                    </h2>
                    <p className="mt-4 text-lg leading-6 max-w-2xl mx-auto text-slate-400">
                        Join our thriving community to connect with like-minded individuals, gain valuable knowledge, and grow your network.
                    </p>
                    <a className="mt-8 inline-flex items-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-white shadow-lg shadow-primary/20 transition-transform duration-300 hover:scale-105" href="#">
                        Join the Network
                    </a>
                </div>
            </div>
        </div>
    </section>
);

export default CtaBanner;
