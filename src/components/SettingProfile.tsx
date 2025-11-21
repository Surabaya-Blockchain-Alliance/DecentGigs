import React from "react";
import { User, Mail, Upload, Lock, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface SettingProfileProps {
    isDarkMode: boolean; // Added for theme consistency
}

export const SettingProfile: React.FC<SettingProfileProps> = ({ isDarkMode }) => {
    const rootClass = isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-white text-gray-900';
    const cardClass = isDarkMode ? 'bg-white/5 border border-primary/30' : 'bg-gray-50 border border-gray-300';
    const inputClass = isDarkMode ? 'bg-white/10 border-white/30 text-white' : 'bg-gray-100 border-gray-300 text-gray-900';
    const textForegroundClass = isDarkMode ? 'text-white' : 'text-gray-900';

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 py-12 ${rootClass} transition-colors`}>
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
            <Settings className="w-7 h-7 text-primary" />
            Profile Settings
        </h1>
        <Card className={`w-full max-w-lg rounded-xl shadow-2xl p-8 ${cardClass} space-y-6`}>
            <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary border-4 border-primary/50 rounded-full mx-auto flex items-center justify-center mb-4">
                    <User className="w-10 h-10 text-white" />
                </div>
                <Button variant="outline" className={`flex items-center gap-2 mx-auto ${isDarkMode ? 'border-white/20 hover:bg-white/10' : 'border-gray-300 hover:bg-gray-200'}`}>
                    <Upload className="w-4 h-4" />
                    Change Photo
                </Button>
            </div>

          <form className="space-y-6">
            <div>
              <Label className={`block text-sm font-medium mb-2 ${textForegroundClass}`} htmlFor="name">
                <User className="w-4 h-4 inline mr-2 text-secondary" />
                Name
              </Label>
              <Input id="name" type="text" className={`w-full px-4 py-2 rounded-md ${inputClass}`} placeholder="Your Name" defaultValue="Ada Lovelace" />
            </div>
            
            <div>
              <Label className={`block text-sm font-medium mb-2 ${textForegroundClass}`} htmlFor="email">
                <Mail className="w-4 h-4 inline mr-2 text-secondary" />
                Email
              </Label>
              <Input id="email" type="email" className={`w-full px-4 py-2 rounded-md ${inputClass}`} placeholder="Your Email" defaultValue="ada@cardano.io" />
            </div>

            <div>
              <Label className={`block text-sm font-medium mb-2 ${textForegroundClass}`} htmlFor="did">
                <Lock className="w-4 h-4 inline mr-2 text-secondary" />
                Decentralized Identifier (DID)
              </Label>
              <Input id="did" type="text" readOnly className={`w-full px-4 py-2 rounded-md ${inputClass}`} value="did:peer:123456789abcdefghij" />
            </div>
            
            <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              Save Changes
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};