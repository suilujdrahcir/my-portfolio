import { useEffect, useState, useRef } from "react";
import bannerImg from "./assets/banner.jpg";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
// 👇 Define your theme color once (Tailwind will use it everywhere)
const THEME_COLOR = "emerald"; // change to "rose", "emerald", "violet", etc.

function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const sections = [
        { id: "home", label: "HOME" },
        { id: "projects", label: "PROJECTS" },
        { id: "resume", label: "RESUME" },
        { id: "about", label: "ABOUT" },
        { id: "contact", label: "CONTACT" },
    ];


    /* Tabs */
    const ProjectsTabs = [
        { id: "all", label: "All" },
        { id: "web", label: "Web" },
        { id: "mobile", label: "Mobile" },
        { id: "desktop", label: "Desktop" },
        { id: "systems", label: "Systems" },
    ];

    /* Example projects — each must have a stable, unique `id` */
    type Project = { id: string; title: string; category: string };
    const PROJECTS: Project[] = [
        {
            id: "p1",
            title: "SaaS Property Management System",
            category: "web",
        },
        {
            id: "p2",
            title: "Reel Streaming Mobile App",
            category: "mobile",
        },
        {
            id: "p3",
            title: "Multi-Tenanted Business Management System",
            category: "web",
        },
        {
            id: "p4",
            title: "Laravel Barangay Information System",
            category: "web",
        },
        {
            id: "p5",
            title: "Social Media Website",
            category: "web",
        },
    ];

    type Experience = { id: string; title: string; date: string, content: string };
    const EXPERIENCES: Experience[] = [
        {
            id: "e1",
            title: "Software Developer — Quadcube Technologies",
            date: "April 2024 ~ Current",
            content: "Managed complex enterprise systems with five branches, integrating inventory, employee management, data processing, and POS operations. Developed and maintained an in-house PHP framework, integrated AI with Ollama LLMs for automation, and independently built a SaaS-based PMS website with payment gateway integration.",
        },
        {
            id: "e2",
            title: "Software Developer — Freelancer",
            date: "Nov 2023 ~ April 2024",
            content: "Developed websites and mobile applications directly for clients. Implemented new features for a React Native mobile app (Expo), integrated backend APIs, and ensured seamless functionality across Android and iOS platforms.",
        },
        {
            id: "e3",
            title: "Software Developer — Intechsive Software Development",
            date: "Feb 2023 ~ Nov 2023",
            content: "Led development of two simultaneous projects: a Laravel Barangay Information System and a Multi-Tenanted Business Management web application using Laravel and Angular. Mentored junior developers and conducted code reviews.",
        },
        {
            id: "e4",
            title: "Junior Software Developer — Intechsive Software Development",
            date: "Nov 2021 ~ Feb 2023",
            content: "Gained hands-on experience in full-stack development, deployed websites on AWS (EC2, S3, SSL), developed social media and internal recruitment platforms, integrated UX/UI designs, and maintained live websites with hundreds of users.",
        },
    ];

    const services = [
        {
            title: "Web Development",
            desc: "Build modern, scalable, and responsive websites using React, Laravel, Tailwind, and Angular. Focused on performance, maintainability, and a seamless user experience across platforms.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9M12 4h9M12 12h9M3 6h.01M3 12h.01M3 18h.01" />
                </svg>
            ),
        },
        {
            title: "Mobile App Development",
            desc: "Develop cross-platform mobile applications using React Native and Expo. Deliver smooth, intuitive user experiences optimized for both Android and iOS platforms.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16h10M7 8h10M5 12h14M12 20v-8" />
                </svg>
            ),
        },
        {
            title: "API Development & Integration",
            desc: "Design and implement RESTful APIs for web and mobile applications. Integrate third-party services and payment gateways like PayPal and Maya efficiently and securely.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" />
                </svg>
            ),
        },
        {
            title: "System Solutions",
            desc: "Develop enterprise-level systems including PMS platforms, business management solutions, and inventory systems. Optimize system architecture, routing, caching, and database performance for scalable operations.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9M12 4h9M12 12h9M3 6h.01M3 12h.01M3 18h.01" />
                </svg>
            ),
        },
    ];

    const testimonials = [
        {
            name: "Maria Santos",
            feedback:
                "Working with Julius was a great experience. He delivered high-quality work ahead of schedule!",
        },
        {
            name: "John Reyes",
            feedback:
                "Professional and detail-oriented. My website turned out better than I expected.",
        },
        {
            name: "Angela Cruz",
            feedback:
                "Highly recommend Julius! Great communication and amazing results.",
        },
    ];


    const [testimonialPaused, setTestimonialPaused] = useState(false);
    const controls = useAnimation();
    // Start the animation when not paused
    const loopTestimonials = [...testimonials, ...testimonials, ...testimonials];

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        let currentIndex = 0;
        const totalItems = loopTestimonials.length;

        const moveNext = async () => {
            if (!testimonialPaused) {
                if (currentIndex == totalItems - 2) {
                    currentIndex = 0
                }
                currentIndex++;
                const currentMargin = ((currentIndex / loopTestimonials.length) * 100) + .3
                await controls.start({
                    x: `-${currentMargin}%`, // adjust per item width
                    transition: { duration: 1, ease: "easeInOut" },
                });
            }
            timeoutId = setTimeout(moveNext, 2000); // wait 3s before next move
        };

        timeoutId = setTimeout(moveNext, 2000);

        return () => clearTimeout(timeoutId);
    }, [testimonialPaused, controls, testimonials.length]);

    const cardVariants = {
        hover: { rotate: -4 },
        initial: { rotate: 0 },
    };

    const backVariants = {
        hover: { rotate: 4 },
        initial: { rotate: 0 },
    };

    const [activeTab, setActiveTab] = useState<string>("all");
    const [displayedProjects, setDisplayedProjects] = useState<Project[]>(
        () => PROJECTS
    ); // what's currently rendered
    const [pendingTab, setPendingTab] = useState<string | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
    if (pendingTab === null) return;

    if (displayedProjects.length === 0) {
        // If current displayed projects are empty, directly set next tab
        const next = computeProjects(pendingTab);
        setDisplayedProjects(next);
        setActiveTab(pendingTab);
        setPendingTab(null);
        setIsTransitioning(false);
    }
}, [pendingTab, displayedProjects]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const computeProjects = (tabId: string) =>{
        return tabId === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === tabId);
}

    const handleTabClick = (tabId: string) => {
        // Clear current items to trigger exit animation
        if(tabId === "all") {
            setDisplayedProjects(PROJECTS);
            setActiveTab(tabId);
        } else {
            if (tabId === activeTab || isTransitioning) return;
            setPendingTab(tabId);
            setIsTransitioning(true);
            setDisplayedProjects(computeProjects(tabId));
        }
    };

    const itemVariants = {
        initial: { opacity: 0, scale: 0.1 },
        enter: (i: number) => ({
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { delay: i * 0.06, duration: 0.22, ease: "easeOut" }, // staggered enter
        }),
        exit: { opacity: 0, scale: 0.1, transition: { duration: 0.22 } }, // quick exit, no delay
    };

    return (
        <div className={`${darkMode ? "dark" : ""}`}>
            <div className="font-sans text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-neutral-800 transition-colors duration-300">
                {/* Navbar */}
                <header
                    className={`fixed w-full transition-colors duration-300 z-50 ${scrolled ? "bg-white text-black shadow-md" : "bg-transparent text-white"
                        }`}
                >
                    <div className="max-w-6xl mx-auto flex justify-between md:justify-center items-center px-6 py-6">
                        {/* Desktop nav */}
                        <nav className="hidden md:flex gap-10 text-md font-normal">
                            {sections.map((s) => (
                                <a
                                    key={s.id}
                                    href={`#${s.id}`}
                                    className={`hover:text-${THEME_COLOR}-500 transition-colors`}
                                >
                                    {s.label}
                                </a>
                            ))}
                        </nav>

                        {/* Mobile hamburger */}
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            onClick={() => setMenuOpen((prev) => !prev)}
                        >
                            {menuOpen ? "✕" : "☰"}
                        </button>
                    </div>

                    {/* Mobile menu */}
                    {menuOpen && (
                        <nav className="md:hidden bg-white dark:bg-neutral-800 shadow-md">
                            <ul className="flex flex-col gap-6 p-4">
                                {sections.map((s) => (
                                    <li key={s.id}>
                                        <a
                                            href={`#${s.id}`}
                                            className={`block text-neutral-800 dark:text-neutral-100 hover:text-emerald dark:hover:text-emerald transition-colors`}
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            {s.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}
                </header>


                {/* Sections */}
                <main className="scroll-smooth">
                    {/* Home */}
                    <section
                        id="home"
                        className="relative min-h-screen flex items-center justify-center text-center px-6 bg-cover bg-center"
                        style={{ backgroundImage: `url(${bannerImg})` }}
                    >
                        <div className="absolute inset-0 bg-black/50"></div>
                        <div className="relative z-10 text-white">
                            <h2
                                className={`text-5xl md:text-7xl font-normal mb-6 bg-gradient-to-r from-${THEME_COLOR}-500 to-${THEME_COLOR}-700 text-white bg-clip-text`}
                            >
                                Hi, I'm
                            </h2>
                            <h2
                                className={`text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-${THEME_COLOR}-500 to-${THEME_COLOR}-700 text-white bg-clip-text`}
                            >
                                Julius Avorque Acidre
                            </h2>
                            <p className="text-lg font-medium md:text-xl text-neutral-800 dark:text-neutral-800 mb-8">
                                AND THIS IS ME.
                            </p>
                        </div>
                    </section>

                    {/* Projects */}

                    <section
                        id="Projects"
                        className="min-h-screen flex items-start pt-20 px-6 bg-gray-50 dark:bg-neutral-900"
                    >
                        <div className="max-w-6xl mx-auto w-full text-center">
                            <h2 className="text-3xl font-normal mb-10">
                                Featured <b className="font-extrabold">Projects</b>
                            </h2>

                            {/* Tabs */}
                            <div className="flex flex-wrap justify-center gap-3 mb-10">
                                {ProjectsTabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => handleTabClick(tab.id)}
                                        disabled={isTransitioning}
                                        aria-pressed={activeTab === tab.id}
                                        className={`px-4 py-2 text-md font-light transition rounded-full ${activeTab === tab.id
                                            ? "text-emerald-500 bg-emerald-50 dark:bg-neutral-800"
                                            : "text-gray-500 hover:text-emerald-500 dark:text-gray-300 dark:hover:text-emerald-500"
                                            } ${isTransitioning ? "opacity-60 pointer-events-none" : ""}`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Projects Grid (parent layout animates position changes) */}
                            <motion.div
                                layout
                                transition={{ layout: { duration: 0.22 } }}
                                className="grid gap-8 md:grid-cols-3"
                            >
                                <AnimatePresence
                                    initial={false}
                                    onExitComplete={() => {
                                        // When all existing items finished exiting, load next tab's items
                                        if (pendingTab !== null) {
                                            const next = computeProjects(pendingTab);
                                            setActiveTab(pendingTab);
                                            setDisplayedProjects(next.length > 0 ? next : []); // even if empty, set [] to trigger AnimatePresence
                                            setPendingTab(null);
                                        }

                                        // small timeout to ensure enters have begun before allowing new clicks
                                        setTimeout(() => setIsTransitioning(false), 50);
                                    }}
                                >
                                    {displayedProjects.length > 0 ? (
                                        displayedProjects.map((project, idx) => (
                                            <motion.article
                                                key={project.id}
                                                custom={idx}
                                                variants={itemVariants}
                                                initial="initial"
                                                animate="enter"
                                                exit="exit"
                                                className="p-6 transition"
                                            >
                                                <div className="w-full h-60 mb-4 rounded-sm bg-gradient-to-br from-emerald-400 to-emerald-600" />
                                                <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                                                <p className="text-gray-600 dark:text-gray-300">
                                                    Short description of {project.title.toLowerCase()}.
                                                </p>
                                            </motion.article>
                                        ))
                                    ) : (
                                        // Placeholder to keep AnimatePresence from getting stuck
                                        <motion.div
                                            key="empty"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="col-span-full text-center text-gray-400 dark:text-gray-500 py-12"
                                        >
                                            No projects in this category
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </section>


                    {/* Resume */}
                    <section id="resume" className="min-h-screen flex items-center px-6  bg-gray-50 dark:bg-neutral-900">
                        <div className="max-w-3xl mx-auto w-full text-center">
                            <h2 className="text-3xl font-normal mb-10">My <b className="font-extrabold">Resume</b></h2>
                            <div className="space-y-6 text-left">
                                {EXPERIENCES.map((experience, id) => (
                                    <div className="p-6 border-l-4 border-gray-300 dark:border-neutral-600 hover:border-emerald-500 dark:hover:border-emerald-500 transition">
                                        <h3 className="font-semibold text-lg">
                                            {experience.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {experience.date}
                                        </p>
                                        <p className="mt-2 text-gray-700 dark:text-gray-300">
                                            {experience.content}
                                        </p>
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    </section>

                    {/* About */}
                    <section
                        id="about"
                        className="w-full flex flex-col"
                    >
                        <div className="min-h-screen flex py-25 items-center px-6">
                            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center  py-16 ">
                                {/* Left: Image */}
                                <div className="flex justify-center">
                                    <img
                                        src={bannerImg}
                                        alt="Profile"
                                        className="w-150 h-90 object-cover "
                                    />
                                </div>

                                {/* Right: Content */}
                                <div className="text-center md:text-left">
                                    <h2 className="text-3xl mb-6">About <b className="font-extrabold">Me</b></h2>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                                        I’m a developer passionate about creating impactful experiences on the
                                        web. I believe in simplicity, performance, and beautiful design. This
                                        portfolio reflects today’s minimalist design trends with light/dark
                                        themes and fluid user interactions.
                                    </p>

                                    {/* Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                        <a
                                            href="#contact"
                                            className={`px-6 py-3 text-white text-white hover:text-emerald-500 dark:hover:text-emerald-500 transition`}
                                        >
                                            Hire Me
                                        </a>
                                        <a
                                            href="/cv.pdf" // 👈 place your CV in /public/cv.pdf
                                            download
                                            className={`px-6 py-3 border border-neutral-300 dark:border-neutral-600 rounded-full text-white hover:text-emerald-500 dark:hover:text-emerald-500 hover:border-emerald-500 dark:hover:border-emerald-500 transition`}
                                        >
                                            Download CV
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Services */}
                        <div className="min-h-screen flex flex-col py-25 items-center px-6 bg-gray-50 dark:bg-neutral-900">
                            <div className="max-w-6xl mx-auto">
                                <h2 className="text-3xl md:text-4xl font-normal mb-12 text-center">
                                    My <b className="font-extrabold">Services</b>
                                </h2>
                                <div className="grid gap-8 md:grid-cols-2">
                                    {services.map((service, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ scale: 1.03 }}
                                            className="relative p-8 bg-white dark:bg-neutral-800 rounded-lg shadow hover:shadow-lg transition-all"
                                        >
                                            <div className="mb-4">{service.icon}</div>
                                            <h4 className="text-xl font-semibold text-emerald-500 mb-2">{service.title}</h4>
                                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{service.desc}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>



                        {/* Testimonials */}
                        <div className="overflow-hidden min-h-screen flex flex-col py-20 items-center w-full bg-gray-50 dark:bg-neutral-900"

                        >
                            <div className="max-w-6xl mx-auto py-20 w-full text-center"
                                onMouseEnter={() => setTestimonialPaused(true)}
                                onMouseLeave={() => setTestimonialPaused(false)}
                            >
                                <h2 className="text-3xl mb-20 text-center">
                                    Client <b className="font-extrabold">Testimonials</b>
                                </h2>

                                <div className=" w-full">
                                    <motion.div
                                        className="flex gap-20 w-max"
                                        animate={controls} // controlled animation
                                    >
                                        { }
                                        {loopTestimonials.map((t, idx) => (
                                            <motion.div
                                                key={idx}
                                                className="relative flex-1 max-w-md"
                                                initial="initial"
                                                whileHover="hover"
                                            >
                                                {/* Back white box */}
                                                <motion.div
                                                    className="absolute inset-[-2px] h-31 bg-white dark:bg-neutral-80 rounded-sm"
                                                    style={{ zIndex: 0 }}
                                                    variants={backVariants}
                                                    transition={{ duration: 0.3 }}
                                                />

                                                {/* Front card */}
                                                <motion.div
                                                    className="relative p-6 bg-white h-30 dark:bg-neutral-800 rounded-sm flex-1 transform"
                                                    style={{ zIndex: 10 }}
                                                    variants={cardVariants}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <p className="italic text-gray-700 dark:text-gray-300">
                                                        “{t.feedback}”
                                                    </p>
                                                    <p className="mt-3 font-semibold text-emerald-600">
                                                        — {t.name}
                                                    </p>
                                                </motion.div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                    </section>



                    {/* Contact */}
                    <section
                        id="contact"
                        className="min-h-screen flex items-center justify-center px-6 bg-gray-50 dark:bg-neutral-900"
                    >
                        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center">

                            {/* Left Side - Contact Details & Socials */}
                            <div className="space-y-6">
                                <h2 className="text-3xl font-normal mb-4">Get <b className="font-extrabold">in Touch</b></h2>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Interested in working together? Drop me a message or connect through
                                    social media. I’d love to hear from you!
                                </p>

                                {/* Contact Details */}
                                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                                    <p><strong>Email:</strong> your@email.com</p>
                                    <p><strong>Phone:</strong> +63 900 123 4567</p>
                                    <p><strong>Location:</strong> Manila, Philippines</p>
                                </div>

                                {/* Social Links */}
                                <div className="flex space-x-4 mt-4">
                                    <a href="https://github.com" target="_blank" className="text-gray-600 dark:text-gray-300 hover:text-emerald-500">
                                        <i className="fab fa-github text-2xl"></i>
                                    </a>
                                    <a href="https://linkedin.com" target="_blank" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600">
                                        <i className="fab fa-linkedin text-2xl"></i>
                                    </a>
                                    <a href="https://twitter.com" target="_blank" className="text-gray-600 dark:text-gray-300 hover:text-emerald-400">
                                        <i className="fab fa-twitter text-2xl"></i>
                                    </a>
                                </div>
                            </div>

                            {/* Right Side - Contact Form */}
                            <form className="bg-white dark:bg-neutral-800 p-7 space-y-7">
                                <div>
                                    <label className="block text-left text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border rounded-sm focus:ring-2 focus:ring-emerald-500 dark:bg-neutral-700 dark:text-white"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-left text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-2 border rounded-sm focus:ring-2 focus:ring-emerald-500 dark:bg-neutral-700 dark:text-white"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-left text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                                        Message
                                    </label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-4 py-2 border rounded-sm focus:ring-2 focus:ring-emerald-500 dark:bg-neutral-700 dark:text-white"
                                        placeholder="Write your message..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full px-6 py-3 bg-neutral-300 text-neutral-800 font-medium rounded-sm shadow-md hover:bg-emerald-300  hover:text-black transition"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </section>

                </main>
            </div>
        </div>
    );
}

export default App;
