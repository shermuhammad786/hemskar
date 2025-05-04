'use client'
import React from 'react'

export default function Page() {
    const [isDark, setIsDark] = React.useState(false);

    return (
        <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-gray-50 to-white text-gray-800'}`}>
            {/* Theme Toggle Button */}
            <button
                onClick={() => setIsDark(!isDark)}
                className={`fixed top-4 right-4 p-2 rounded-full ${isDark ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'
                    }`}
            >
                {isDark ? '🌞' : '🌙'}
            </button>

            {/* Hero Section */}
            <main className="relative">
                <div className="px-4 sm:px-10">
                    <div className="mt-16 max-w-4xl mx-auto text-center relative z-10">
                        {/* Animated Text Container */}
                        <div className="h-[180px] md:h-[200px]">
                            <h1 className={`md:text-6xl text-4xl font-extrabold mb-6 md:!leading-[75px] ${isDark ? 'text-white' : 'text-gray-800'
                                }`}>
                                <div className="typewriter-container">
                                    <span className="typewriter-text first">Sher Muhammad</span>
                                    <span className="typewriter-text second">I am a Web Developer</span>
                                    <span className="typewriter-text third">I am a Full Stack Engineer</span>
                                    <span className="typewriter-text fourth">I am a UI/UX Enthusiast</span>
                                </div>
                            </h1>
                        </div>

                        {/* Description */}
                        <p className="text-base mt-6 fade-in-animation delay-4 max-w-2xl mx-auto">
                            Passionate full-stack developer with expertise in React, Node.js, and modern web technologies.
                            Focused on creating efficient, scalable, and user-friendly applications.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-10 space-x-4 fade-in-animation delay-5">
                            <button className="px-6 py-3 rounded-xl text-white bg-blue-600 transition-all hover:bg-blue-700 hover:scale-105">
                                View Projects
                            </button>
                            <button className="px-6 py-3 rounded-xl text-blue-600 border-2 border-blue-600 transition-all hover:bg-blue-50">
                                Contact Me
                            </button>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-6 mt-12 fade-in-animation delay-6">
                        <a href="https://github.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-blue-600 transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                            </svg>
                        </a>
                        <a href="https://linkedin.com/in/yourusername"
                            className="text-gray-600 hover:text-blue-600 transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </main>

            {/* Skills Section */}
            <section className={`py-20 px-4 sm:px-10 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="max-w-6xl mx-auto">
                    <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-800'}`}>Technical Skills</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        <SkillCard isDark={isDark} title="Frontend" skills={["React", "Next.js", "TypeScript", "Tailwind CSS"]} />
                        <SkillCard isDark={isDark} title="Backend" skills={["Node.js", "Express", "MongoDB", "PostgreSQL"]} />
                        <SkillCard isDark={isDark} title="Tools" skills={["Git", "Docker", "AWS", "Vercel"]} />
                        <SkillCard isDark={isDark} title="Other" skills={["REST APIs", "GraphQL", "Testing", "CI/CD"]} />
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className={`py-20 px-4 sm:px-10 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="max-w-6xl mx-auto">
                    <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-800'}`}>Featured Projects</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <ProjectCard
                            isDark={isDark}
                            title="E-Commerce Platform"
                            description="Full-stack e-commerce solution with React, Node.js, and MongoDB"
                            tech={["React", "Node.js", "MongoDB"]}
                            image="/path-to-image.jpg"
                            link="https://project-url.com"
                        />
                        <ProjectCard
                            isDark={isDark}
                            title="Task Management App"
                            description="Real-time task management application with authentication"
                            tech={["Next.js", "Firebase", "Tailwind"]}
                            image="/path-to-image.jpg"
                            link="https://project-url.com"
                        />
                        <ProjectCard
                            isDark={isDark}
                            title="Portfolio Website"
                            description="Modern portfolio website with animations and responsive design"
                            tech={["React", "Tailwind CSS", "Framer Motion"]}
                            image="/path-to-image.jpg"
                            link="https://project-url.com"
                        />
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className={`py-20 px-4 sm:px-10 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className={`text-3xl font-bold mb-12 ${isDark ? 'text-white' : 'text-gray-800'}`}>Let's Work Together</h2>
                    <p className={`mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        I'm currently available for freelance projects or full-time opportunities.
                    </p>
                    <form className="max-w-md mx-auto space-y-4">
                        <input
                            type="text"
                            placeholder="Name"
                            className={`w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border border-gray-300'
                                }`}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className={`w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border border-gray-300'
                                }`}
                        />
                        <textarea
                            placeholder="Message"
                            rows={4}
                            className={`w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border border-gray-300'
                                }`}
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className={`py-8 px-4 text-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>© 2024 Sher Muhammad. All rights reserved.</p>
            </footer>

            {/* Component Styles */}
            <style jsx global>{`
                .typewriter-container {
                    position: relative;
                    min-height: 80px;
                }

                .typewriter-text {
                    display: block;
                    position: absolute;
                    left: 0;
                    right: 0;
                    opacity: 0;
                    white-space: nowrap;
                    overflow: hidden;
                    border-right: 3px solid;
                    margin: 0 auto;
                    letter-spacing: 0.15em;
                    animation-fill-mode: forwards;
                }

                .typewriter-text.first {
                    animation: 
                        typing 1.5s steps(40, end),
                        blink-caret 0.75s step-end infinite,
                        eraseText 1.5s steps(40, end) 2.5s forwards,
                        hideText 0s 4s forwards;
                    animation-iteration-count: infinite;
                    animation-delay: 0s;
                    animation-duration: 16s;
                }

                .typewriter-text.second {
                    animation: 
                        typing 1.5s steps(40, end),
                        blink-caret 0.75s step-end infinite,
                        eraseText 1.5s steps(40, end) 2.5s forwards,
                        hideText 0s 4s forwards;
                    animation-iteration-count: infinite;
                    animation-delay: 4s;
                    animation-duration: 16s;
                }

                .typewriter-text.third {
                    animation: 
                        typing 1.5s steps(40, end),
                        blink-caret 0.75s step-end infinite,
                        eraseText 1.5s steps(40, end) 2.5s forwards,
                        hideText 0s 4s forwards;
                    animation-iteration-count: infinite;
                    animation-delay: 8s;
                    animation-duration: 16s;
                }

                .typewriter-text.fourth {
                    animation: 
                        typing 1.5s steps(40, end),
                        blink-caret 0.75s step-end infinite,
                        eraseText 1.5s steps(40, end) 2.5s forwards,
                        hideText 0s 4s forwards;
                    animation-iteration-count: infinite;
                    animation-delay: 12s;
                    animation-duration: 16s;
                }

                @keyframes typing {
                    0% {
                        width: 0;
                        opacity: 1;
                    }
                    100% {
                        width: 100%;
                        opacity: 1;
                    }
                }

                @keyframes eraseText {
                    0% {
                        width: 100%;
                        opacity: 1;
                    }
                    100% {
                        width: 0;
                        opacity: 1;
                    }
                }

                @keyframes hideText {
                    to {
                        opacity: 0;
                    }
                }

                @keyframes blink-caret {
                    from, to { border-color: transparent }
                    50% { border-color: ${isDark ? '#fff' : '#000'} }
                }

                .sequential-roles {
                    margin-top: 1rem;
                }

                .sequential-roles .text-block {
                    position: absolute;
                    left: 0;
                    right: 0;
                    opacity: 0;
                    animation: sequentialFade 12s infinite;
                    animation-delay: 2.5s; /* Start after name typing animation */
                }

                .sequential-roles .text-block:nth-child(1) {
                    animation-delay: 2.5s;
                }

                .sequential-roles .text-block:nth-child(2) {
                    animation-delay: 6.5s;
                }

                .sequential-roles .text-block:nth-child(3) {
                    animation-delay: 10.5s;
                }

                @keyframes sequentialFade {
                    0%, 20% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    25%, 45% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    50%, 100% {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                }

                .role-animation {
                    opacity: 0;
                    transform: translateY(20px);
                    animation: slideUp 0.5s ease forwards;
                }

                .delay-1 { animation-delay: 1s; }
                .delay-2 { animation-delay: 1.5s; }
                .delay-3 { animation-delay: 2s; }
                .delay-4 { animation-delay: 2.5s; }
                .delay-5 { animation-delay: 3s; }
                .delay-6 { animation-delay: 3.5s; }

                @keyframes slideUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .fade-in-animation {
                    opacity: 0;
                    animation: fadeIn 1s ease forwards;
                }

                @keyframes fadeIn {
                    to {
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    )
}

// Skill Card Component
const SkillCard = ({ title, skills, isDark }: { title: string, skills: string[], isDark: boolean }) => (
    <div className={`p-6 rounded-lg hover:shadow-md transition-shadow ${isDark ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
        <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
        <ul className="space-y-2">
            {skills.map((skill, index) => (
                <li key={index} className={isDark ? 'text-gray-300' : 'text-gray-600'}>{skill}</li>
            ))}
        </ul>
    </div>
)

// Project Card Component
const ProjectCard = ({ title, description, tech, image, link, isDark }: {
    title: string,
    description: string,
    tech: string[],
    image: string,
    link: string,
    isDark: boolean
}) => (
    <div className={`rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${isDark ? 'bg-gray-700' : 'bg-white'
        }`}>
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-6">
            <h3 className={`font-semibold text-xl mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {tech.map((item, index) => (
                    <span key={index} className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-600'
                        }`}>
                        {item}
                    </span>
                ))}
            </div>
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 font-medium"
            >
                View Project →
            </a>
        </div>
    </div>
)
