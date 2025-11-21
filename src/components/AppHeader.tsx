import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

interface AppHeaderProps {
  onGetStarted: () => void;
  onShowProfile: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onGetStarted, onShowProfile }) => (
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
);
