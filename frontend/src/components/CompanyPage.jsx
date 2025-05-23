import React from "react";
import { FaRobot, FaChartLine, FaBrain, FaUserGraduate, FaLaptopCode, FaDatabase, FaAward, FaClock } from "react-icons/fa";

const CompanyPage = ({ onStart }) => {
  const features = [
    {
      icon: <FaRobot className="text-4xl text-gray-300 mb-4" />,
      title: "AI-Powered Learning Paths",
      desc: "Our advanced AI analyzes your goals, experience, and learning style to create personalized curriculum that adapts as you progress.",
    },
    {
      icon: <FaChartLine className="text-4xl text-gray-300 mb-4" />,
      title: "Real-time Progress Analytics",
      desc: "Track your learning velocity, identify knowledge gaps, and receive AI-driven recommendations to optimize your journey.",
    },
    {
      icon: <FaBrain className="text-4xl text-gray-300 mb-4" />,
      title: "Smart Content Curation",
      desc: "Access hand-picked resources from top educational platforms, automatically organized to match your skill level.",
    },
    {
      icon: <FaUserGraduate className="text-4xl text-gray-300 mb-4" />,
      title: "Personalized Mentorship",
      desc: "Get matched with industry experts and receive guidance tailored to your career aspirations.",
    },
    {
      icon: <FaLaptopCode className="text-4xl text-gray-300 mb-4" />,
      title: "Interactive Learning",
      desc: "Engage with hands-on projects, coding challenges, and real-world scenarios designed for your skill level.",
    },
    {
      icon: <FaAward className="text-4xl text-gray-300 mb-4" />,
      title: "Industry Certifications",
      desc: "Earn recognized credentials as you progress, with AI-guided prep for professional certifications.",
    },
  ];

  const pathways = [
    {
      title: "Software Development",
      skills: ["Full-Stack Development", "Mobile Apps", "Cloud Computing"],
      duration: "4-6 months",
    },
    {
      title: "Data Science",
      skills: ["Machine Learning", "Data Analytics", "Statistical Analysis"],
      duration: "6-8 months",
    },
    {
      title: "AI/ML Engineering",
      skills: ["Deep Learning", "NLP", "Computer Vision"],
      duration: "8-12 months",
    },
    {
      title: "Cloud Architecture",
      skills: ["AWS", "Azure", "DevOps"],
      duration: "5-7 months",
    },
  ];

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
          className="px-5 py-2 rounded-md border border-gray-700 bg-gradient-to-r from-gray-800 to-gray-700 text-gray-200 hover:from-gray-700 hover:to-gray-600 transition"
        >
          Get Started
        </button>
      </header>

      {/* Hero Section with video background */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center text-center overflow-hidden mt-20">
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
          <h2 className="text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-gray-200 to-gray-400 text-transparent bg-clip-text">
            Transform Your Career with AI-Powered Learning
          </h2>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            E-learning.ai combines cutting-edge artificial intelligence with expert-curated content 
            to deliver personalized learning experiences. Master in-demand skills, track your progress, 
            and achieve your career goals faster than ever before.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={onStart}
              className="px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-700 text-gray-200 rounded-xl text-lg font-semibold hover:from-gray-700 hover:to-gray-600 transition transform hover:scale-105"
            >
              Start Learning Now
            </button>
            <a
              href="#features"
              className="px-8 py-4 border border-gray-700 text-gray-300 rounded-xl text-lg font-semibold hover:bg-gray-900 transition transform hover:scale-105"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#features').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="max-w-7xl mx-auto px-8 py-16 space-y-32">
        {/* About Us */}
        <section className="text-center">
          <h3 className="text-4xl font-bold mb-6 text-gray-200">Why Choose E-learning.ai?</h3>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            We're revolutionizing online education by combining artificial intelligence with 
            expert-curated content. Our platform adapts to your learning style, pace, and goals, 
            ensuring the most efficient path to mastery.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <FaRobot className="text-3xl text-gray-300 mb-4" />
              <h4 className="text-xl font-semibold mb-2 text-gray-200">AI-Driven Personalization</h4>
              <p className="text-gray-400">Our AI engine analyzes your learning patterns and adjusts content delivery in real-time.</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <FaDatabase className="text-3xl text-gray-300 mb-4" />
              <h4 className="text-xl font-semibold mb-2 text-gray-200">Comprehensive Resources</h4>
              <p className="text-gray-400">Access a vast library of courses, projects, and assessments from industry leaders.</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <FaClock className="text-3xl text-gray-300 mb-4" />
              <h4 className="text-xl font-semibold mb-2 text-gray-200">Learn at Your Pace</h4>
              <p className="text-gray-400">Flexible learning schedules that adapt to your availability and learning speed.</p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="scroll-mt-20">
          <h3 className="text-4xl font-bold mb-12 text-center text-gray-200">Platform Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ icon, title, desc }, idx) => (
              <div
                key={idx}
                className="bg-gray-900 rounded-xl p-8 border border-gray-800 
                          shadow-[0_0_15px_3px_rgba(255,255,255,0.05)] 
                          hover:shadow-[0_0_25px_5px_rgba(255,255,255,0.1)] 
                          transition-all duration-300 transform hover:scale-[1.02]"
              >
                {icon}
                <h4 className="text-2xl font-semibold mb-3 text-gray-200">{title}</h4>
                <p className="text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Learning Pathways */}
        <section className="text-center">
          <h3 className="text-4xl font-bold mb-12 text-gray-200">Popular Learning Pathways</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pathways.map(({ title, skills, duration }, idx) => (
              <div
                key={idx}
                className="bg-gray-900 rounded-xl p-6 border border-gray-800 
                          shadow-[0_0_15px_3px_rgba(255,255,255,0.05)]
                          hover:shadow-[0_0_25px_5px_rgba(255,255,255,0.1)]
                          transition-all duration-300"
              >
                <h4 className="text-xl font-semibold mb-4 text-gray-200">{title}</h4>
                <ul className="text-gray-400 mb-4 space-y-2">
                  {skills.map((skill, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-gray-700 rounded-full"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500 mt-4 flex items-center justify-center gap-2">
                  <FaClock />
                  {duration}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gray-900 rounded-2xl p-12 border border-gray-800">
          <h3 className="text-3xl font-bold mb-6 text-gray-200">Ready to Transform Your Career?</h3>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are accelerating their careers with AI-powered personalized learning.
            Start your journey today.
          </p>
          <button
            onClick={onStart}
            className="px-12 py-4 bg-gradient-to-r from-gray-800 to-gray-700 text-gray-200 rounded-xl 
                     text-xl font-bold shadow-lg hover:from-gray-700 hover:to-gray-600 
                     transition transform hover:scale-105"
          >
            Begin Your Learning Journey — It's Free
          </button>
        </section>

        {/* Contact & Footer */}
        <footer className="border-t border-gray-900 py-12 px-4 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-left">
            <div>
              <h4 className="text-xl font-semibold mb-4 text-gray-200">Contact Us</h4>
              <p className="text-gray-400">Email: support@e-learning.ai</p>
              <p className="text-gray-400">Phone: +1 (555) 123-4567</p>
              <p className="text-gray-400">Hours: 24/7 Support</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4 text-gray-200">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => window.open('/docs', '_blank')}
                    className="text-gray-400 hover:text-gray-300 text-left"
                  >
                    Documentation
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => window.open('/api', '_blank')}
                    className="text-gray-400 hover:text-gray-300 text-left"
                  >
                    API Reference
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => window.open('/success-stories', '_blank')}
                    className="text-gray-400 hover:text-gray-300 text-left"
                  >
                    Success Stories
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4 text-gray-200">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => window.open('/privacy', '_blank')}
                    className="text-gray-400 hover:text-gray-300 text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => window.open('/terms', '_blank')}
                    className="text-gray-400 hover:text-gray-300 text-left"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => window.open('/cookies', '_blank')}
                    className="text-gray-400 hover:text-gray-300 text-left"
                  >
                    Cookie Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-900 pt-8">
            <div className="flex justify-center space-x-6 mb-4">
              <a
                href="https://github.com/e-learning-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition"
              >
                GitHub
              </a>
              <a
                href="https://twitter.com/e_learning_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com/company/e-learning-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition"
              >
                LinkedIn
              </a>
            </div>
            <p className="text-gray-500">© 2025 E-learning.ai. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default CompanyPage;
