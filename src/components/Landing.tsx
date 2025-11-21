import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Wallet,
  Shield,
  FileText,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

interface LandingProps {
  onGetStarted: () => void;
  onLearnMore: () => void;
  onShowProfile: () => void;
  onSettingProfile: () => void;
}

export function Landing({ onGetStarted, onLearnMore, onShowProfile, onSettingProfile }: LandingProps) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Space background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDcsIDE3NywgMTc5LCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />

      <div className="relative z-10">
        {/* Header Animation */}
        <motion.header
          className="border-b border-border/50 backdrop-blur-sm"
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
                <span className="text-foreground">
                  WorPlace Around
                </span>
              </div>
              <Button variant="outline" onClick={onGetStarted}>
                Connect Wallet
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Hero Section Animation */}
        <motion.section
          className="max-w-7xl mx-auto px-4 py-16 md:py-24"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="text-center space-y-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.15 }
              }
            }}
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 border border-primary/30 bg-primary/5 rounded-full"
            >
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-primary">
                Decentralized FreeLance Jobs
              </span>
            </motion.div>
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-foreground"
            >
              Trustless Freelancing on Cardano Blockchain
            </motion.h1>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl mx-auto text-muted-foreground"
            >
              Connect your wallet, verify your identity with
              Atala PRISM, and start working with smart contract
              escrow protection
            </motion.p>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8 }}
              className="flex gap-4 justify-center flex-wrap"
            >
              <Button
                size="lg"
                onClick={onGetStarted}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                Get Started
              </Button>
              <Button size="lg" variant="outline" onClick={onLearnMore}>
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Flow Diagram Animation */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.2 }
              }
            }}
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}>
              <Card className="p-6 h-56 flex flex-col justify-between bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center border border-primary/30">
                  <Wallet className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-foreground">
                  1. Connect Wallet
                </h3>
                <p className="text-muted-foreground">
                  Your Wallet As Gateway
                </p>
              </Card>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}>
              <Card className="p-6 h-56 flex flex-col justify-between bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-full flex items-center justify-center border border-secondary/30">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-foreground">
                  2. Get Verified
                </h3>
                <p className="text-muted-foreground">
                  Optional KYC via Atala PRISM DID
                </p>
              </Card>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}>
              <Card className="p-6 h-56 flex flex-col justify-between bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center border border-primary/30">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-foreground">
                  3. Post or Bid
                </h3>
                <p className="text-muted-foreground">
                  Create jobs or submit proposals
                </p>
              </Card>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}>
              <Card className="p-6 h-56 flex flex-col justify-between bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-full flex items-center justify-center border border-secondary/30">
                  <CheckCircle className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-foreground">
                  4. Escrow & Pay
                </h3>
                <p className="text-muted-foreground">
                  Smart contract handles payments
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Features Section Animation */}
        <motion.section
          className="border-t border-border/50 py-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.2 }
                }
              }}
            >
              <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}>
                <div className="h-56 flex flex-col justify-between space-y-3">
                  <div className="w-full h-32 border border-dashed border-primary/30 rounded-lg flex items-center justify-center bg-primary/5">
                    <FileText className="w-12 h-12 text-primary/50" />
                  </div>
                  <h3 className="text-foreground">
                    On-Chain Jobs
                  </h3>
                  <p className="text-muted-foreground">
                    All job listings stored on Cardano blockchain
                    for transparency
                  </p>
                </div>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}>
                <div className="h-56 flex flex-col justify-between space-y-3">
                  <div className="w-full h-32 border border-dashed border-secondary/30 rounded-lg flex items-center justify-center bg-secondary/5">
                    <Shield className="w-12 h-12 text-secondary/50" />
                  </div>
                  <h3 className="text-foreground">
                    Aiken Smart Contracts
                  </h3>
                  <p className="text-muted-foreground">
                    Escrow automatically managed by validated
                    contracts
                  </p>
                </div>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}>
                <div className="h-56 flex flex-col justify-between space-y-3">
                  <div className="w-full h-32 border border-dashed border-primary/30 rounded-lg flex items-center justify-center bg-primary/5">
                    <Sparkles className="w-12 h-12 text-primary/50" />
                  </div>
                  <h3 className="text-foreground">
                    IPFS Storage
                  </h3>
                  <p className="text-muted-foreground">
                    Deliverables stored on IPFS with hash
                    verification
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
