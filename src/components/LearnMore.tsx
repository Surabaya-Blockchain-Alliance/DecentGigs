import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

interface LearnMoreProps {
    onBack: () => void;
    isDarkMode: boolean; // Added for theme consistency
}

export const LearnMore: React.FC<LearnMoreProps> = ({ onBack, isDarkMode }) => {
    const rootClass = isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-white text-gray-900';
    const textMutedClass = isDarkMode ? 'text-white/70' : 'text-gray-600';

    return (
        <div className={`min-h-screen ${rootClass} transition-colors`}>
            {/* Header (Simple back button) */}
            <header className={`backdrop-blur-sm border-b sticky top-0 z-10 transition-colors ${isDarkMode ? 'border-white/10 bg-[#0a0a0a]/80' : 'border-gray-200 bg-white/80'}`}>
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <Button variant="ghost" onClick={onBack} className={isDarkMode ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-200'}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Button>
                </div>
            </header>

            <div className="flex flex-col items-center justify-center p-8">
                <div className="max-w-3xl mx-auto text-center py-16">
                    <h1 className="text-5xl font-extrabold mb-6 text-primary">Decentralized Work. Defined.</h1>
                    <p className={`max-w-2xl text-xl mx-auto mb-12 ${textMutedClass}`}>
                        WorPlace Around is pioneering the future of freelance by utilizing the power and security of the Cardano blockchain.
                    </p>

                    <section className="space-y-10 text-left">
                        <div className={`p-6 rounded-xl transition-colors ${isDarkMode ? 'bg-white/5 border border-primary/30' : 'bg-gray-50 border border-gray-300'}`}>
                            <h2 className="text-3xl font-bold mb-3 text-secondary">The Problem We Solve</h2>
                            <p className={textMutedClass + ' leading-relaxed'}>
                                Traditional freelance platforms suffer from high fees, centralized control over funds, and opaque dispute resolution processes. We eliminate these risks by placing the entire transaction—from escrow to governance—on-chain.
                            </p>
                        </div>

                        <div className={`p-6 rounded-xl transition-colors ${isDarkMode ? 'bg-white/5 border border-primary/30' : 'bg-gray-50 border border-gray-300'}`}>
                            <h2 className="text-3xl font-bold mb-3 text-secondary">Why Cardano?</h2>
                            <p className={textMutedClass + ' leading-relaxed'}>
                                Cardano's eUTXO model provides superior security and predictability for smart contracts (Plutus/Aiken). This architecture makes our trustless escrow system robust and virtually tamper-proof, ensuring funds are always safe until conditions are met.
                            </p>
                        </div>

                        <div className={`p-6 rounded-xl transition-colors ${isDarkMode ? 'bg-white/5 border border-primary/30' : 'bg-gray-50 border border-gray-300'}`}>
                            <h2 className="text-3xl font-bold mb-3 text-secondary">Join the Movement</h2>
                            <p className={textMutedClass + ' leading-relaxed'}>
                                Whether you are a top-tier developer, a designer, or a technical writer, our platform offers the security and community you need to thrive in the decentralized world. Get started today and launch your first contract in ADA!
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};