import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Shield, CheckCircle, Upload } from 'lucide-react';

interface KYCVerificationProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function KYCVerification({ onComplete, onSkip }: KYCVerificationProps) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Space background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/5 via-background to-background" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDY3LCAyMjAsIDE4MywgMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
      
      <div className="relative z-10 p-4">
        <div className="max-w-2xl mx-auto pt-16">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4 border border-secondary/30">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-foreground">Identity Verification</h1>
            <p className="text-muted-foreground mt-2">
              Optional KYC via Atala PRISM - Enhance trust and unlock premium features
            </p>
          </div>

          <Card className="p-8 mb-6 bg-card/50 backdrop-blur-sm border-secondary/30">
            <div className="space-y-6">
              <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-secondary/30 to-secondary/20 border border-secondary/40 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center">
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-foreground">What is Atala PRISM?</h3>
                    <p className="text-muted-foreground mt-1">
                      Atala PRISM is a decentralized identity solution. Your credentials are stored securely on-chain and you control who sees them.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-foreground">Create Your DID</h3>
                
                <div className="space-y-2">
                  <Label className="text-foreground">Full Name</Label>
                  <Input placeholder="Enter your full name" className="bg-input/30" />
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Email Address</Label>
                  <Input type="email" placeholder="your@email.com" className="bg-input/30" />
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Professional Title</Label>
                  <Input placeholder="e.g. Full Stack Developer" className="bg-input/30" />
                </div>

                <div className="border-2 border-dashed border-secondary/30 rounded-lg p-8 text-center bg-secondary/5">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-secondary/10 border border-secondary/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-8 h-8 text-secondary" />
                  </div>
                  <p className="text-foreground">Upload Identity Document</p>
                  <p className="text-muted-foreground">Passport, Driver's License, or National ID</p>
                  <Button variant="outline" className="mt-4">
                    Choose File
                  </Button>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                    <p className="text-foreground">Your credentials will be stored as a Verifiable Credential</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                    <p className="text-foreground">You'll receive a unique DID (Decentralized Identifier)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                    <p className="text-foreground">Boost your reputation and get access to premium jobs</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={onComplete} className="flex-1 bg-gradient-to-r from-secondary to-primary hover:opacity-90">
                  Complete Verification
                </Button>
                <Button onClick={onSkip} variant="outline" className="flex-1">
                  Skip for Now
                </Button>
              </div>

              <p className="text-center text-muted-foreground">
                You can complete this later from your profile settings
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}