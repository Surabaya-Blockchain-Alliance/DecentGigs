import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Wallet, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { UserType } from '../App';

interface WalletConnectProps {
  onConnect: (userType: UserType) => void;
}

export function WalletConnect({ onConnect }: WalletConnectProps) {
  const [step, setStep] = useState<'wallet' | 'user-type'>('wallet');
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const wallets = [
    { id: 'nami', name: 'Nami Wallet', status: 'Detected' },
    { id: 'eternl', name: 'Eternl', status: 'Not Installed' },
    { id: 'flint', name: 'Flint Wallet', status: 'Not Installed' },
    { id: 'typhon', name: 'Typhon Wallet', status: 'Not Installed' },
  ];

  const handleWalletSelect = (walletId: string) => {
    setSelectedWallet(walletId);
    setTimeout(() => {
      setStep('user-type');
    }, 800);
  };

  const handleUserTypeSelect = (type: UserType) => {
    onConnect(type);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Space background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDcsIDE3NywgMTc5LCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
      
      <div className="relative z-10 p-4">
        <div className="max-w-2xl mx-auto pt-16">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/30">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-foreground">{step === 'wallet' ? 'Connect Your Wallet' : 'Select Your Role'}</h1>
            <p className="text-muted-foreground mt-2">
              {step === 'wallet' 
                ? 'Choose your Cardano wallet to continue'
                : 'Are you looking to hire or work?'
              }
            </p>
          </div>

          {step === 'wallet' ? (
            <div className="space-y-3">
              {wallets.map((wallet) => (
                <Card 
                  key={wallet.id}
                  className="p-4 cursor-pointer bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all"
                  onClick={() => wallet.status === 'Detected' && handleWalletSelect(wallet.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 rounded-lg flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-foreground">{wallet.name}</div>
                        <div className="text-muted-foreground">{wallet.status}</div>
                      </div>
                    </div>
                    {selectedWallet === wallet.id && (
                      <div className="px-3 py-1 bg-gradient-to-r from-primary to-secondary text-white rounded-lg flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        Connecting...
                      </div>
                    )}
                  </div>
                </Card>
              ))}

              <div className="text-center mt-8">
                <p className="text-muted-foreground">Don't have a wallet?</p>
                <Button variant="link" className="text-primary">Learn how to set up a Cardano wallet</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Card 
                className="p-8 cursor-pointer bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all"
                onClick={() => handleUserTypeSelect('employer')}
              >
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/40 rounded-xl mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-foreground">I'm an Employer</h3>
                  <p className="text-muted-foreground">Post jobs and hire talented freelancers</p>
                  <div className="pt-2">
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">Continue as Employer</Button>
                  </div>
                </div>
              </Card>

              <Card 
                className="p-8 cursor-pointer bg-card/50 backdrop-blur-sm border-secondary/30 hover:border-secondary/50 transition-all"
                onClick={() => handleUserTypeSelect('freelancer')}
              >
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-secondary/10 border-2 border-secondary/40 rounded-xl mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-foreground">I'm a Freelancer</h3>
                  <p className="text-muted-foreground">Find work and get paid securely</p>
                  <div className="pt-2">
                    <Button className="w-full bg-gradient-to-r from-secondary to-primary hover:opacity-90">Continue as Freelancer</Button>
                  </div>
                </div>
              </Card>

              <div className="text-center pt-4">
                <Button variant="ghost" onClick={() => setStep('wallet')}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to wallet selection
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}