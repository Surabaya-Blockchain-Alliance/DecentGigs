import { Shield, Lock, CheckCircle, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface LandingPageProps {
  onConnect: () => void;
}

export function LandingPage({ onConnect }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl mb-6">
              Decentralized Job Marketplace
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Connect job providers and bidders with blockchain-powered escrow, KYC verification, and transparent on-chain job completion tracking
            </p>
            <Button
              size="lg"
              onClick={onConnect}
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              Connect Wallet to Get Started
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-center text-3xl mb-12">
          Why Choose DecentraWork?
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="mb-2">KYC Verification</h3>
            <p className="text-sm text-gray-600">
              Verified identities ensure trust between job providers and bidders
            </p>
          </Card>
          
          <Card className="p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="mb-2">Smart Escrow</h3>
            <p className="text-sm text-gray-600">
              Funds locked in smart contracts until job completion is verified
            </p>
          </Card>
          
          <Card className="p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="mb-2">On-Chain Verification</h3>
            <p className="text-sm text-gray-600">
              Transparent job completion verification recorded on blockchain
            </p>
          </Card>
          
          <Card className="p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="mb-2">Analytics Dashboard</h3>
            <p className="text-sm text-gray-600">
              Track your performance, earnings, and job metrics in real-time
            </p>
          </Card>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl mb-12">
            How It Works
          </h2>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                1
              </div>
              <h3 className="mb-2">Complete KYC</h3>
              <p className="text-sm text-gray-600">
                Verify your identity to build trust in the marketplace
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                2
              </div>
              <h3 className="mb-2">Post or Bid</h3>
              <p className="text-sm text-gray-600">
                Providers post jobs, bidders submit proposals with competitive rates
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                3
              </div>
              <h3 className="mb-2">Complete & Verify</h3>
              <p className="text-sm text-gray-600">
                Work is completed, verified on-chain, and payment released from escrow
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
