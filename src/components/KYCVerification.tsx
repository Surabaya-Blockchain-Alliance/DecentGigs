import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Shield, CheckCircle, Upload } from 'lucide-react';

interface KYCVerificationProps {
  onComplete: () => void;
  onSkip: () => void;
  isDarkMode: boolean; // Added for theme consistency
}

export function KYCVerification({ onComplete, onSkip, isDarkMode }: KYCVerificationProps) {
  const rootClass = isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-white text-gray-900';
  const cardClass = isDarkMode ? 'bg-white/5 border border-primary/30' : 'bg-gray-50 border border-gray-300';
  const inputClass = isDarkMode ? 'bg-white/10 border-white/30 text-white' : 'bg-gray-100 border-gray-300 text-gray-900';
  const textForegroundClass = isDarkMode ? 'text-white' : 'text-gray-900';

  return (
    <div className={`min-h-screen relative overflow-hidden flex items-center justify-center p-4 ${rootClass} transition-colors`}>
      {/* Space background effect (conditional) */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${isDarkMode ? 'opacity-100' : 'opacity-20'}`}
        style={{ backgroundImage: `radial-gradient(ellipse at center, ${isDarkMode ? 'var(--tw-colors-secondary/5)' : 'var(--tw-colors-primary/5)'} 0%, transparent 70%)` }}
      />
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isDarkMode ? 'opacity-20' : 'opacity-0'}`}
        style={{ backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDY3LCAyMTAgLCAyMDAsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc>')` }} 
      />
      
      <div className="relative z-10 w-full max-w-lg">
        <Card className={`p-8 rounded-xl shadow-2xl space-y-6 ${cardClass} backdrop-blur-md`}>
          <div className="text-center space-y-3">
            <Shield className="w-12 h-12 text-primary mx-auto" />
            <h1 className="text-3xl font-bold">Decentralized KYC Verification</h1>
            <p className={isDarkMode ? 'text-white/70' : 'text-gray-600'}>Secure your identity and build trust on the platform.</p>
          </div>

          <form className="space-y-4">
            <div>
              <Label htmlFor="document-type" className={textForegroundClass}>Document Type</Label>
              <Input id="document-type" placeholder="e.g., Passport, National ID" className={`mt-1 ${inputClass}`} />
            </div>
            <div>
              <Label htmlFor="document-id" className={textForegroundClass}>Document ID Number</Label>
              <Input id="document-id" placeholder="Enter ID number" className={`mt-1 ${inputClass}`} />
            </div>
            <div>
              <Label htmlFor="document-upload" className={textForegroundClass}>Upload Document Image</Label>
              <div className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer mt-1 ${isDarkMode ? 'border-primary/50 hover:bg-primary/10 bg-white/5' : 'border-primary/30 hover:bg-primary/10 bg-white'}`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-primary" />
                  <p className={isDarkMode ? 'text-white/70 text-sm' : 'text-gray-500 text-sm'}>Click to upload or drag and drop</p>
                </div>
                <Input id="document-upload" type="file" className="hidden" />
              </div>
            </div>
          </form>

          <div className={`p-4 rounded-lg space-y-3 ${isDarkMode ? 'bg-primary/10 border border-primary/30' : 'bg-primary/5 border border-primary/20'}`}>
            <h3 className="font-semibold text-lg flex items-center gap-2">Benefits of Verification</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                <p className={textForegroundClass}>Your credentials will be stored as a Verifiable Credential</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                <p className={textForegroundClass}>You'll receive a unique DID (Decentralized Identifier)</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                <p className={textForegroundClass}>Boost your reputation and get access to premium jobs</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={onComplete} className="flex-1 bg-gradient-to-r from-secondary to-primary hover:opacity-90">
              Complete Verification
            </Button>
            <Button 
              onClick={onSkip} 
              variant="outline" 
              className={`flex-1 ${isDarkMode ? 'border-white/20 hover:bg-white/10' : 'border-gray-300 hover:bg-gray-200'}`}
            >
              Skip for Now
            </Button>
          </div>

          <p className="text-center text-muted-foreground">
            You can complete this later from your profile settings
          </p>
        </Card>
      </div>
    </div>
  );
}