import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
    Wallet,
    Shield,
    FileText,
    CheckCircle,
    Sparkles,
    Code,
    Globe,
    Lock,
    Star,
    User,
    Zap,
    Briefcase,
    Users,
    Award,
    DollarSign,
    Layers, // New Icon for Built With section
} from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useRef } from "react";

interface LandingProps {
    onGetStarted: () => void;
    onLearnMore: () => void;
    onShowProfile: () => void;
    onSettingProfile: () => void;
}

// Reusable flow card component (No major change needed here)
const FlowStepCard = ({ icon: Icon, title, description, delay = 0 }: {
    icon: any;
    title: string;
    description: string;
    delay?: number;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay }}
    >
        <Card className="p-6 h-full flex flex-col justify-start bg-black/30 backdrop-blur-sm border-white/20 hover:border-primary/50 transition-all shadow-lg hover:shadow-primary/30">
            <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-primary/50 bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-foreground font-semibold text-lg">
                    {title}
                </h3>
            </div>
            <p className="text-muted-foreground text-sm">
                {description}
            </p>
        </Card>
    </motion.div>
);

// Reusable feature card component (No major change needed here)
const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: {
    icon: any;
    title: string;
    description: string;
    delay?: number;
}) => (
    <motion.div 
        variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.5, delay }}
    >
        <Card className="p-6 h-56 flex flex-col justify-start bg-black/40 border border-white/10 hover:border-primary/50 transition-all">
            <div className="w-full h-32 flex items-center justify-center mb-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center border border-primary/30 bg-primary/10">
                    <Icon className="w-7 h-7 text-primary/80" />
                </div>
            </div>
            <h3 className="text-foreground font-semibold">
                {title}
            </h3>
            <p className="text-muted-foreground text-sm">
                {description}
            </p>
        </Card>
    </motion.div>
);

// Apple-style animated showcase project card with Mouse Follow Tilt and Inner Glow
const ShowcaseProjectCard = ({ title, description, tags, icon: Icon, design = 'default' }: {
    title: string;
    description: string;
    tags: string[];
    icon: any;
    design?: 'default' | 'inverted' | 'border';
}) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);

    // Define rotation transformations for a 3D effect (Increased tilt intensity)
    const rotateX = useTransform(y, [0, 1], [15, -15]);
    const rotateY = useTransform(x, [0, 1], [-15, 15]);

    // Inner light position (0% to 100%)
    const lightX = useTransform(x, [0, 1], ["0%", "100%"]);
    const lightY = useTransform(y, [0, 1], ["0%", "100%"]);

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!cardRef.current) return;

        const card = cardRef.current as HTMLElement;
        const rect = card.getBoundingClientRect();

        // Calculate normalized X and Y coordinates (0 to 1) relative to the card
        const newX = (event.clientX - rect.left) / rect.width;
        const newY = (event.clientY - rect.top) / rect.height;

        x.set(newX);
        y.set(newY);
    };

    const handleMouseLeave = () => {
        // Reset rotations gently back to center (0.5)
        x.set(0.5);
        y.set(0.5);
    };

    // Card styling based on the 'design' prop
    let cardClasses = "relative p-6 h-full rounded-xl overflow-hidden shadow-2xl cursor-pointer transition-shadow duration-300";
    let lightClasses = "absolute inset-0 transition-opacity duration-300 pointer-events-none";

    switch (design) {
        case 'inverted':
            // Dark text on a brighter, more distinct background
            cardClasses += " bg-white/5 border border-white/20 hover:shadow-primary/50 text-black";
            lightClasses += " bg-[radial-gradient(circle_at_var(--light-x)_var(--light-y),rgba(150,200,255,0.4)_0%,transparent_50%)] opacity-10";
            break;
        case 'border':
            // Clear background with a strong border hover effect
            cardClasses += " bg-transparent border-2 border-white/10 hover:border-primary/50";
            lightClasses += " bg-[radial-gradient(circle_at_var(--light-x)_var(--light-y),rgba(150,200,255,0.2)_0%,transparent_50%)] opacity-5";
            break;
        case 'default':
        default:
            // Original dark background with blue glow
            cardClasses += " bg-black/40 border border-white/10 hover:shadow-primary/30";
            lightClasses += " bg-[radial-gradient(circle_at_var(--light-x)_var(--light-y),rgba(139,92,246,0.3)_0%,transparent_50%)] opacity-10";
            break;
    }

    return (
        <motion.div
            ref={cardRef}
            className={cardClasses + " min-w-[300px] md:min-w-0"} // Added min-w for carousel
            style={{ 
                perspective: 1000, 
                rotateX, 
                rotateY,
                // Pass light position to CSS variable for inner light
                '--light-x': lightX, 
                '--light-y': lightY,
            } as React.CSSProperties}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(139, 92, 246, 0.2)' }}
        >
            {/* Inner Light Effect (Now uses CSS variables for position) */}
            <motion.div
                className={lightClasses}
                style={{ 
                    opacity: useTransform([x, y], ([xVal, yVal]) => 
                        // Increase opacity slightly when mouse is near center (0.5, 0.5)
                        0.1 + (0.5 - Math.abs(xVal - 0.5)) * 0.2 + (0.5 - Math.abs(yVal - 0.5)) * 0.2
                    ),
                }}
            />

            <div className="relative z-10 space-y-4">
                <div className="flex items-center space-x-3">
                    <Icon className={`w-8 h-8 ${design === 'inverted' ? 'text-primary/70' : 'text-primary'}`} />
                    <h3 className={`text-xl font-bold ${design === 'inverted' ? 'text-foreground' : 'text-white'}`}>{title}</h3>
                </div>
                <p className={design === 'inverted' ? 'text-gray-600 text-sm' : 'text-white/70 text-sm'}>{description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                    {tags.map((tag) => (
                        <span key={tag} className={`px-3 py-1 text-xs font-medium rounded-full ${design === 'inverted' ? 'bg-gray-200 text-primary' : 'bg-white/10 text-primary/80 border border-primary/20'}`}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};


// NEW COMPONENT: Metric Card for the Success Metrics Section (Moved outside Landing)
const MetricCard = ({ icon: Icon, metric, description, delay = 0 }: {
    icon: any;
    metric: string;
    description: string;
    delay?: number;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay }}
        className="p-6 bg-black/40 border border-primary/20 rounded-xl"
    >
        <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
        <h3 className="text-3xl font-bold text-white mb-1">{metric}</h3>
        <p className="text-sm text-white/70">{description}</p>
    </motion.div>
);


export function Landing({ onGetStarted, onLearnMore, onShowProfile, onSettingProfile }: LandingProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            }
        }
    };

    const heroRef = useRef(null);
    const mouseX = useMotionValue(0.5); // Start at 0.5 (center)
    const mouseY = useMotionValue(0.5); // Start at 0.5 (center)

    // Parallax Transform for Hero Text Container (Slightly increased tilt)
    const heroRotateX = useTransform(mouseY, [0, 1], [-3, 3]);
    const heroRotateY = useTransform(mouseX, [0, 1], [3, -3]);

    // Transform for the Hero section's background light (The moving light)
    const heroBgLightX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
    const heroBgLightY = useTransform(mouseY, [0, 1], ["0%", "100%"]);


    const handleHeroMouseMove = (event: React.MouseEvent) => {
        if (!heroRef.current) return;

        const hero = heroRef.current as HTMLElement;
        const rect = hero.getBoundingClientRect();

        // Normalized position (0 to 1)
        const newX = (event.clientX - rect.left) / rect.width;
        const newY = (event.clientY - rect.top) / rect.height;

        mouseX.set(newX);
        mouseY.set(newY);
    };


    return (
        <div className="min-h-screen bg-black relative overflow-hidden text-white">

            {/* --- BEGIN Enhanced Galaxy Background Effect (Fixed) --- */}
            {/* 1. Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-cover opacity-50" style={{
                backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzA0MDQxMCIvPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCBMIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXRoPjwvc3Zn>')",
                zIndex: 0,
            }} />
            {/* 2. Central Pulsing Radial Gradient (Boosted light) */}
            <div className="absolute inset-0" style={{
                backgroundImage: "radial-gradient(circle 800px at 50% 10%, rgba(10,180,200,0.4) 0%, transparent 60%)",
                animation: "pulse 15s infinite alternate",
                opacity: 0.9,
                zIndex: 1,
            }} />
            {/* 3. Simulated Moving Stars/Dust (Denser starfield) */}
            <div className="galaxy-stars absolute inset-0 z-[1]" />
            {/* --- END Enhanced Galaxy Background Effect --- */}

            <div className="relative z-10">

                {/* Header (Sticky) */}
                <motion.header
                    className="bg-black/40 border-b border-white/10 backdrop-blur-sm sticky top-0 z-50"
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <button
                                    className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center focus:outline-none"
                                    onClick={onShowProfile}
                                    title="View Profile"
                                    type="button"
                                >
                                    <Sparkles className="w-5 h-5 text-white" />
                                </button>
                                <span className="text-white font-semibold">
                                    WorPlace Around
                                </span>
                            </div>
                            <Button variant="outline" onClick={onGetStarted} className="border-white/20 hover:bg-white/10 text-white">
                                Connect Wallet
                            </Button>
                        </div>
                    </div>
                </motion.header>

                {/* Hero Section with Mouse Parallax Animation (Now with full section glow) */}
                <motion.section
                    ref={heroRef}
                    className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative overflow-hidden" // Added relative and overflow-hidden for glow
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    onMouseMove={handleHeroMouseMove}
                    onMouseLeave={() => { mouseX.set(0.5); mouseY.set(0.5); }}
                    style={{ 
                        perspective: 1000, 
                        // Pass light position to CSS variable for the full section glow
                        '--hero-light-x': heroBgLightX, 
                        '--hero-light-y': heroBgLightY,
                    } as React.CSSProperties}
                >
                    {/* Full Section Mouse Follow Glow Effect */}
                    <motion.div
                        className="absolute inset-0 z-0 pointer-events-none"
                        style={{
                            background: `radial-gradient(circle 300px at var(--hero-light-x, 50%) var(--hero-light-y, 50%), rgba(139, 92, 246, 0.2) 0%, transparent 70%)`,
                            opacity: useTransform([mouseX, mouseY], ([xVal, yVal]) => 
                                // Increase opacity slightly when mouse is near center (0.5, 0.5)
                                0.5 + (0.5 - Math.abs(xVal - 0.5)) * 0.5 + (0.5 - Math.abs(yVal - 0.5)) * 0.5
                            ),
                            transition: "opacity 0.1s linear, background-position 0.1s linear"
                        }}
                    />

                    <motion.div
                        className="text-center space-y-6 relative z-10" // Ensure content is above the glow
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        style={{ 
                            rotateX: heroRotateX, 
                            rotateY: heroRotateY, 
                            transition: "transform 0.1s ease-out" 
                        }}
                    >
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 border border-primary/30 bg-primary/10 rounded-full text-sm"
                        >
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="text-primary/90">
                                Decentralized FreeLance Jobs
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl mx-auto text-4xl md:text-6xl font-extrabold text-white leading-tight" // Removed hero-text-glow
                        >
                            TRUSTLESS FREELANCING ON
                            <br />
                            <span className="text-primary">CARDANO BLOCKCHAIN</span>
                        </motion.h1>

                        <motion.p
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            transition={{ duration: 0.7 }}
                            className="max-w-3xl mx-auto text-white/70 text-base"
                        >
                            CONNECT YOUR WALLET, VERIFY YOUR IDENTITY WITH ATALA PRISM, AND START WORKING WITH SMART CONTRACT ESCROW PROTECTION
                        </motion.p>

                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            transition={{ duration: 0.8 }}
                            className="flex gap-4 justify-center flex-wrap pt-4"
                        >
                            <Button
                                size="lg"
                                onClick={onGetStarted}
                                className="size-lg bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] hover:opacity-90 shadow-lg shadow-primary/20 text-white"
                            >
                                Get Started
                            </Button>
                            <Button 
                                size="lg" 
                                variant="outline" 
                                onClick={onLearnMore} 
                                className="size-lg border-white/30 bg-transparent text-white hover:bg-white/10"
                            >
                                Learn More
                            </Button>
                        </motion.div>
                    </motion.div>
                    

                    {/* Flow Diagram Animation (4-Step Process) */}
                    <motion.div
                        className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10" // Ensure these cards are above the glow
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={containerVariants}
                    >
                        <FlowStepCard icon={Wallet} title="1. Connect Wallet" description="Your Wallet As Gateway" delay={0.1} />
                        <FlowStepCard icon={Shield} title="2. Get Verified" description="Optional KYC via Atala PRISM DID" delay={0.2} />
                        <FlowStepCard icon={FileText} title="3. Post or Bid" description="Create jobs or submit proposals" delay={0.3} />
                        <FlowStepCard icon={CheckCircle} title="4. Escrow & Pay" description="Smart contract handles payments" delay={0.4} />
                    </motion.div>

                                    {/* Features Section (Original Content) */}
                <motion.section
                    className="py-16 border-t border-white/10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-white mb-8">
                            Core Decentralization Features
                        </h2>
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={containerVariants}
                        >
                            <FeatureCard
                                icon={FileText}
                                title="On-Chain Jobs"
                                description="All job listings stored on Cardano blockchain for transparency"
                                delay={0.1}
                            />
                            <FeatureCard
                                icon={Shield}
                                title="Aiken Smart Contracts"
                                description="Escrow automatically managed by validated contracts"
                                delay={0.2}
                            />
                            <FeatureCard
                                icon={Sparkles}
                                title="IPFS Storage"
                                description="Deliverables stored on IPFS with hash verification"
                                delay={0.3}
                            />
                        </motion.div>
                    </div>
                </motion.section>

                </motion.section>
                {/* --- Showcase Projects Section (CAROUSEL IMPLEMENTATION) --- */}
                <motion.section
                    className="py-16 border-t border-white/10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-white mb-8 text-center">
                            Project Showcase
                        </h2>
                        {/* Horizontal Scroll / Carousel Container */}
                        <div className="flex overflow-x-auto gap-6 pb-4 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory scroll-smooth">
                            {/* Items with fixed width to create the carousel effect on small screens */}
                            <div className="snap-start min-w-[300px] md:min-w-[calc(33.333%-16px)]">
                                <ShowcaseProjectCard
                                    icon={Code}
                                    title="Decentralized Swap Interface"
                                    description="Building a secure, non-custodial token swap interface powered by Cardano smart contracts."
                                    tags={["Plutus", "Haskell", "React", "DEX"]}
                                    design="default" // Dark card, blue glow
                                />
                            </div>
                            <div className="snap-start min-w-[300px] md:min-w-[calc(33.333%-16px)]">
                                <ShowcaseProjectCard
                                    icon={Globe}
                                    title="DID Identity Management"
                                    description="Developing a front-end portal for managing verifiable credentials using Atala PRISM IDs."
                                    tags={["Atala PRISM", "Next.js", "DID"]}
                                    design="inverted" // Inverted color scheme
                                />
                            </div>
                            <div className="snap-start min-w-[300px] md:min-w-[calc(33.333%-16px)]">
                                <ShowcaseProjectCard
                                    icon={Lock}
                                    title="NFT Royalty Enforcer"
                                    description="A unique smart contract solution to automatically distribute secondary market NFT royalties."
                                    tags={["NFTs", "Aiken", "Rust"]}
                                    design="border" // Border-only style
                                />
                            </div>
                            {/* Add more cards for a better carousel effect */}
                            <div className="snap-start min-w-[300px] md:min-w-[calc(33.333%-16px)]">
                                <ShowcaseProjectCard
                                    icon={Wallet}
                                    title="Multi-Sig Treasury"
                                    description="A custom multi-signature smart contract to manage DAO funds transparently."
                                    tags={["Plutus", "DAO", "Security"]}
                                    design="default"
                                />
                            </div>
                            <div className="snap-start min-w-[300px] md:min-w-[calc(33.333%-16px)]">
                                <ShowcaseProjectCard
                                    icon={Briefcase}
                                    title="P2P Escrow DApp"
                                    description="The core dApp logic for trustless, peer-to-peer job escrow services."
                                    tags={["Aiken", "React", "Escrow"]}
                                    design="inverted"
                                />
                            </div>
                        </div>
                        <div className="text-center mt-10">
                            <Button size="lg" variant="default" onClick={onLearnMore} className="bg-primary/90 hover:bg-primary">
                                View All Projects
                            </Button>
                        </div>
                    </div>
                </motion.section>
                
                {/* --- NEW SECTION: Success Metrics (Refactored to use MetricCard) --- */}
                <motion.section
                    className="py-16 border-t border-white/10 bg-black/50"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-white mb-10 text-center">
                            Our Impact on the Decentralized Ecosystem
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <MetricCard icon={Users} metric="15K+" description="Verified Users" delay={0.1} />
                            <MetricCard icon={Briefcase} metric="4,200+" description="Jobs Delivered" delay={0.2} />
                            <MetricCard icon={DollarSign} metric="$5M+" description="Paid to Freelancers" delay={0.3} />
                            <MetricCard icon={Award} metric="100%" description="Escrow Success Rate" delay={0.4} />
                        </div>
                    </div>
                </motion.section>


                {/* Top Freelancers Section (CAROUSEL IMPLEMENTATION) */}
                <motion.section
                    className="py-16 border-t border-white/10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-white mb-8 text-center">
                            Top Freelancers of the Month
                        </h2>
                        {/* Horizontal Scroll / Carousel Container */}
                        <div className="flex overflow-x-auto gap-6 pb-4 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory scroll-smooth">
                            {[
                                { name: "Ada Lovelace", skill: "Plutus/Aiken Developer", rating: 4.9, icon: Star },
                                { name: "Charles Hoskinson", skill: "Blockchain Architect", rating: 4.8, icon: Zap },
                                { name: "Gavin Wood", skill: "Full Stack Cardano DApp", rating: 4.7, icon: Code },
                                { name: "Satoshi Nakamoto", skill: "Cryptographer / Security", rating: 4.6, icon: Lock },
                                { name: "Vitalik Buterin", skill: "Web3 UI/UX Designer", rating: 4.5, icon: Sparkles },
                                { name: "Jeremy Clarkson", skill: "Haskell Smart Contract Auditor", rating: 4.9, icon: Shield },
                            ].map((freelancer, index) => (
                                <motion.div
                                    key={index}
                                    className="snap-start min-w-[280px] md:min-w-[calc(25%-18px)]" // Fixed width for carousel items
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card className="p-4 flex items-center space-x-4 bg-black/30 border border-primary/20 hover:border-primary/50 transition-all">
                                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                            <User className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">{freelancer.name}</p>
                                            <p className="text-xs text-white/60">{freelancer.skill}</p>
                                        </div>
                                        <div className="ml-auto flex items-center text-sm font-medium text-yellow-400">
                                            <Star className="w-4 h-4 mr-1 fill-yellow-400" />
                                            {freelancer.rating}
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>
                <motion.section
                    className="py-16 border-t border-b border-white/10 bg-black/50"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-white mb-8 text-center">
                            🛠️ Built With Cardano's Best
                        </h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {[
                                "Aiken (Smart Contracts)", 
                                "Blockfrost (API)", 
                                "Mesh SDK (DApp Connector)", 
                                "Lucid-Cardano (Wallet Lib)",
                                "Lucid-Evolution (Next-Gen Lib)", 
                                "Eternl (Wallet Integration)", 
                                "Atala Prism (DID KYC)",
                            ].map((tech, index) => (
                                <motion.span
                                    key={tech}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.8 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="px-4 py-2 bg-primary/10 text-primary/80 border border-primary/30 rounded-full text-sm font-medium flex items-center gap-2"
                                >
                                    <Layers className="w-4 h-4" />
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Footer Section */}
                <motion.footer
                    className="border-t border-white/10 py-8 bg-black/40"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-center justify-between text-white/50 text-sm">
                            <p>&copy; {new Date().getFullYear()} WorPlace Around. Built on Cardano.</p>
                            <div className="flex space-x-4 mt-4 md:mt-0">
                                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                                <a href="#" className="hover:text-primary transition-colors">Contact</a>
                            </div>
                        </div>
                    </div>
                </motion.footer>

            </div>

            {/* Custom Styles for Animation and Typography (Fixed and Enhanced) */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes pulse {
                        0% {
                            opacity: 0.9;
                            transform: scale(1);
                        }
                        100% {
                            opacity: 0.7;
                            transform: scale(1.05);
                        }
                    }
                    /* Custom style for the large hero button */
                    .size-lg {
                        font-size: 1.125rem;
                        padding: 0.75rem 1.75rem;
                    }

                    /* --- FIX 2: Enhanced Galaxy Stars Animation (Denser) --- */
                    .galaxy-stars::before {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        /* Increased density and brightness of stars */
                        background: radial-gradient(circle at 10% 20%, rgba(255,255,255,0.3) 1px, transparent 1.5px),
                                        radial-gradient(circle at 80% 90%, rgba(255,255,255,0.2) 1px, transparent 1.5px),
                                        radial-gradient(circle at 40% 50%, rgba(255,255,255,0.15) 1px, transparent 1.5px),
                                        radial-gradient(circle at 50% 10%, rgba(255,255,255,0.1) 1px, transparent 1.5px);
                        background-size: 150px 150px; 
                        animation: moveStars 180s linear infinite;
                    }

                    @keyframes moveStars {
                        from {
                            background-position: 0 0;
                        }
                        to {
                            background-position: 2000px 2000px;
                        }
                    }
                    
                    /* Showcase Card Inner Light CSS Variable Fallback for Tailwind Utility */
                    .bg-\[radial-gradient\(...\)\] {
                        background-image: radial-gradient(circle at var(--light-x, 50%) var(--light-y, 50%), var(--tw-light-color, rgba(139, 92, 246, 0.3)) 0%, transparent 50%);
                    }
                `
            }} />
        </div>
    );
}
