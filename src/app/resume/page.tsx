import React from "react";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink, Mail, Phone, MapPin, Globe } from "lucide-react";
import { SiGithub, SiLinkedin, SiLeetcode } from "react-icons/si";
import { config } from "@/data/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Dharani Kumar J",
  description: "Official resume of Dharani Kumar J - Artificial Intelligence & Data Science Student.",
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
          <div className="flex items-center gap-3">
            <a
              href="/assets/dharani-kumar-j-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
            >
              <ExternalLink size={14} />
              Open PDF
            </a>
            <a
              href="/assets/dharani-kumar-j-resume.pdf"
              download="Dharani_Kumar_J_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 transition-all"
            >
              <Download size={14} />
              Download Resume
            </a>
          </div>
        </div>

        {/* Paper Document Container */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
          {/* Header */}
          <div className="border-b border-zinc-800 pb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase mb-1">
              DHARANI KUMAR J
            </h1>
            <p className="text-base sm:text-lg font-semibold text-primary tracking-wide uppercase mb-3">
              ARTIFICIAL INTELLIGENCE & DATA SCIENCE STUDENT
            </p>
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-zinc-400">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-primary" />
                Villupuram, Tamil Nadu, India 605402
              </span>
              <span>•</span>
              <a
                href="tel:+917695992514"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Phone size={14} className="text-primary" />
                +91 7695992514
              </a>
              <span>•</span>
              <a
                href="mailto:dharanikumarj16@gmail.com"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail size={14} className="text-primary" />
                dharanikumarj16@gmail.com
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-zinc-400 mt-2">
              <a
                href="https://github.com/dharanikumarj16-code"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <SiGithub size={14} className="text-primary" />
                github.com/dharanikumarj16-code
              </a>
              <span>•</span>
              <a
                href="https://leetcode.com/u/dharanikumarj"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <SiLeetcode size={14} className="text-[#FFA116]" />
                leetcode.com/u/dharanikumarj
              </a>
              <span>•</span>
              <a
                href="https://linkedin.com/in/dharani-kumar-j-25ad036"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <SiLinkedin size={14} className="text-primary" />
                linkedin.com/in/dharani-kumar-j-25ad036
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-sm font-bold tracking-wider uppercase text-primary mb-2">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-sm leading-relaxed text-zinc-300">
              Results-oriented Artificial Intelligence and Data Science student skilled in Python, Machine Learning, Data Structures, and Natural Language Processing. Experienced in developing end-to-end predictive pipelines, voice-controlled automated systems, and web-deployed ML engines to address real-world challenges.
            </p>
          </div>

          {/* Technical Profile */}
          <div>
            <h2 className="text-sm font-bold tracking-wider uppercase text-primary mb-3">
              TECHNICAL PROFILE
            </h2>
            <div className="space-y-2 text-sm text-zinc-300">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-1">
                <span className="font-semibold text-white">Languages & Frameworks:</span>
                <span className="sm:col-span-3 text-zinc-300">Python, C++, Java, SQL, Data Structures & Algorithms (DSA), OOP</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-1">
                <span className="font-semibold text-white">AI, ML & Data Science:</span>
                <span className="sm:col-span-3 text-zinc-300">Scikit-Learn, Pandas, NumPy, Matplotlib, Natural Language Processing (NLP), Linear Algebra, Prompt Engineering</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-1">
                <span className="font-semibold text-white">Tools & Platforms:</span>
                <span className="sm:col-span-3 text-zinc-300">Google Colab, Android Studio, Git, GitHub, Linux (Bash/CLI), LeetCode</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-1">
                <span className="font-semibold text-white">DevOps & Cloud:</span>
                <span className="sm:col-span-3 text-zinc-300">CI/CD Basics, AWS, Cloud Shell, Render Deployment Pipeline</span>
              </div>
            </div>
          </div>

          {/* Projects & Experience */}
          <div>
            <h2 className="text-sm font-bold tracking-wider uppercase text-primary mb-4">
              PROJECTS & EXPERIENCE
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                  <h3 className="text-base font-bold text-white">
                    Software Engineering Student / Project Lead
                  </h3>
                  <span className="text-xs font-mono text-zinc-400">
                    Coimbatore, India | 10/2025 – 04/2026
                  </span>
                </div>
                <p className="text-xs font-medium text-primary mb-3">
                  Sri Krishna College of Engineering and Technology (SKCET)
                </p>

                <div className="space-y-4 text-sm text-zinc-300">
                  <div>
                    <h4 className="font-semibold text-zinc-100 flex items-center gap-2">
                      SmartFarm AI: KNN Climate Similarity & Scheduler Engine
                      <a
                        href="https://project-coagri.onrender.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-primary underline"
                      >
                        [Live Demo: project-coagri.onrender.com]
                      </a>
                    </h4>
                    <ul className="list-disc list-outside ml-5 space-y-1 mt-1 text-xs sm:text-sm text-zinc-300">
                      <li>Engineered a climate-matching crop planning system utilizing Scikit-Learn (KNN), Pandas, NumPy, and Matplotlib to evaluate weather parameters and optimize 30-day crop scheduling.</li>
                      <li>Developed complete data processing, model evaluation, and visualization pipelines within Google Colab.</li>
                      <li>Deployed model to production using Render with continuous deployment (CI/CD) and cloud environment configuration.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-zinc-100">Automated Silent Mode System</h4>
                    <ul className="list-disc list-outside ml-5 space-y-1 mt-1 text-xs sm:text-sm text-zinc-300">
                      <li>Built a location-aware automated classroom scheduling application designed to transition device profile states dynamically.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-zinc-100">Voice-Controlled Agent</h4>
                    <ul className="list-disc list-outside ml-5 space-y-1 mt-1 text-xs sm:text-sm text-zinc-300">
                      <li>Architected a hands-free voice AI solution with optimized execution logic and low-latency system response pathways to achieve high reliability.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-sm font-bold tracking-wider uppercase text-primary mb-3">
              EDUCATION
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
              <h3 className="text-base font-bold text-white">
                B.Tech in Artificial Intelligence and Data Science
              </h3>
              <span className="text-xs font-mono text-zinc-400">
                Expected 08/2029
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300">
              Sri Krishna College of Engineering and Technology (SKCET), Coimbatore, India
            </p>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-sm font-bold tracking-wider uppercase text-primary mb-3">
              CERTIFICATIONS
            </h2>
            <ul className="list-disc list-outside ml-5 space-y-1.5 text-xs sm:text-sm text-zinc-300">
              <li>Python for Data Science – NPTEL / Swayam <span className="text-emerald-400 font-semibold">(Elite Certificate)</span></li>
              <li>Python Skill Up – GeeksforGeeks</li>
              <li>Linear Algebra for Machine Learning and Data Science – DeepLearning.AI / Coursera</li>
              <li>Object-Oriented Programming Using C++ – byteXL</li>
              <li>Prompt Engineering for Everyone</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
