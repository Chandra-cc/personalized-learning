import React from "react";

const CompanyPage = ({ onStart }) => {
  return (
    <div className="h-screen overflow-y-auto bg-black text-gray-300 font-sans">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full py-6 px-8 border-b border-gray-900 flex items-center justify-between bg-black bg-opacity-95 z-30">
        <h1
          className="text-4xl font-bold tracking-wide cursor-pointer hover:text-gray-500 transition"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          E-learning.ai
        </h1>
        <button
          onClick={onStart}
          className="px-5 py-2 rounded-md border border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800 text-gray-200 hover:from-gray-800 hover:to-gray-700 transition"
        >
          Get Started
        </button>
      </header>

      {/* Hero Section with video background */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center text-center overflow-hidden mt-20">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        >
          Sorry, your browser does not support the video tag.
        </video>

        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-10"></div>

        <div className="relative z-20 max-w-4xl px-6 fade-in">
          <h2 className="text-5xl font-extrabold leading-tight mb-6 text-gray-300">
            Empowering Your Learning Journey with AI
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            E-learning.ai uses AI to curate personalized learning paths tailored
            to your goals, background, and interests. Accelerate your skill-building
            journey today.
          </p>
          <button
            onClick={onStart}
            className="px-8 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-gray-200 rounded-md text-lg font-semibold hover:from-gray-800 hover:to-gray-700 transition"
          >
            Explore Paths
          </button>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="max-w-7xl mx-auto px-8 py-16 space-y-20">
        {/* About Us */}
        <section className="text-center">
          <h3 className="text-3xl font-semibold mb-6 text-gray-300">About Us</h3>
          <p className="text-gray-400 max-w-3xl mx-auto mb-4">
            At E-learning.ai, we tailor learning paths using AI to match your unique goals and pace.
          </p>
          <p className="text-gray-500 italic max-w-3xl mx-auto">
            Founded out of a passion for empowering learners worldwide, our platform adapts to you.
          </p>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
          {[
            {
              title: "Personalized Learning Paths",
              desc: "AI-generated paths matching your pace and interests.",
            },
            {
              title: "Progress Tracking",
              desc: "Visualize your milestones and stay motivated.",
            },
            {
              title: "Real-time Suggestions",
              desc: "Get AI-powered recommendations as you learn.",
            },
            {
              title: "AI-Powered Resources",
              desc: "Access curated materials tailored to you.",
            },
            {
              title: "Gamification & Motivation",
              desc: "Earn rewards and badges to keep your learning fun.",
            },
          ].map(({ title, desc }, idx) => (
            <div
              key={idx}
              className="bg-gray-900 rounded-xl p-8 shadow-[0_0_10px_2px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_4px_rgba(255,255,255,0.1)] transition-shadow duration-300 cursor-default"
            >
              <h4 className="text-2xl font-semibold mb-3 text-gray-300">{title}</h4>
              <p className="text-gray-400">{desc}</p>
            </div>
          ))}
        </section>

        {/* How It Works */}
        <section className="px-4">
          <h3 className="text-3xl font-semibold mb-10 text-center text-gray-300">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
            {[
              {
                step: "1",
                title: "Sign Up",
                desc: "Create your free account quickly and securely.",
              },
              {
                step: "2",
                title: "Share Goals",
                desc: "Tell us about your learning objectives and interests.",
              },
              {
                step: "3",
                title: "Get Roadmap",
                desc: "Receive a personalized AI-powered learning roadmap.",
              },
              {
                step: "4",
                title: "Track & Adapt",
                desc: "Monitor your progress and update your goals anytime.",
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="bg-gray-900 rounded-xl p-8 shadow-[0_0_10px_2px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_4px_rgba(255,255,255,0.1)] transition-shadow duration-300"
              >
                <div className="text-gray-400 mb-4 text-5xl font-extrabold">{step}</div>
                <h4 className="text-xl font-semibold mb-3 text-gray-300">{title}</h4>
                <p className="text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <button
            onClick={onStart}
            className="px-12 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-gray-200 rounded-xl text-xl font-bold shadow-lg hover:from-gray-800 hover:to-gray-700 transition"
          >
            Start Your Learning Journey Today — It’s Free.
          </button>
        </section>

        {/* Contact & Footer */}
        <footer className="border-t border-gray-900 py-8 px-4 text-center text-gray-500 text-sm">
          <p>Contact us: support@e-learning.ai | +1 (555) 123-4567</p>
          <p className="mt-2">
            Follow us on{" "}
            <a
              href="https://github.com/e-learning-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-400"
            >
              GitHub
            </a>
            ,{" "}
            <a
              href="https://twitter.com/e_learning_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-400"
            >
              Twitter
            </a>
            , and{" "}
            <a
              href="https://linkedin.com/company/e-learning-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-400"
            >
              LinkedIn
            </a>
          </p>
          <p className="mt-2">© 2025 E-learning.ai. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default CompanyPage;
