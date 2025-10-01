function Testo() {
  return (
    <div>
      <section className="flex flex-wrap justify-center items-center">
        <div className="mx-auto max-w-screen-xl px-0   py-5">
          <div className=" grid  md:grid-cols-3 space-x-5">
            <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-4">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <div className="flex justify-center gap-0.5 text-green-500">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-0.5 text-lg font-medium text-gray-900">
                    Paul Starr
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-700">
                The job listings are top-notch and highly relevant. I was tired of sifting through irrelevant roles on other platforms. Within two weeks, I had three interviews and landed my dream job. The process was incredibly smooth.
              </p>
            </blockquote>
            <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-4">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <div className="flex justify-center gap-0.5 text-green-500">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="mt-0.5 text-lg font-medium text-gray-900">
                    John Doe
                  </p>
                </div>
              </div>

              <p className="mt-4 text-gray-700">
                Switching careers felt daunting, but the resume analysis feature showed me exactly which skills to highlight. I found an amazing entry-level data analyst position that I wouldn't have discovered otherwise. Truly a lifesaver! </p>
            </blockquote>
            <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-4">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>
                  <div className="flex justify-center gap-0.5 text-green-500">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="mt-0.5 text-lg font-medium text-gray-900">
                    John Doe
                  </p>
                </div>
              </div>

              <p className="mt-4 text-gray-700">
                The AI-powered cover letter assistant was a game-changer! It helped me tailor my applications quickly and effectively. I landed a fantastic role at a leading tech company. I highly recommend this to any professional.
              </p>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Testo;
