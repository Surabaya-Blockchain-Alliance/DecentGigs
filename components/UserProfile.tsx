import { Shield, Wallet, Star, Briefcase, TrendingUp, Award } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import type { User } from '../pages/index';

interface UserProfileProps {
  user: User;
}

const completedJobs = [
  {
    id: '1',
    title: 'DeFi Dashboard Development',
    client: 'John Doe',
    rating: 5,
    review: 'Outstanding work! Delivered ahead of schedule with excellent code quality.',
    date: '2024-11-15',
    amount: 5000,
  },
  {
    id: '2',
    title: 'UI/UX Design for NFT Platform',
    client: 'Alice Chen',
    rating: 5,
    review: 'Amazing design work. Very professional and responsive to feedback.',
    date: '2024-11-10',
    amount: 2800,
  },
  {
    id: '3',
    title: 'Smart Contract Security Review',
    client: 'Bob Smith',
    rating: 4,
    review: 'Great attention to detail. Found several important issues.',
    date: '2024-11-05',
    amount: 3200,
  },
];

const skills = [
  { name: 'React/TypeScript', level: 95 },
  { name: 'Solidity', level: 90 },
  { name: 'Web3.js', level: 88 },
  { name: 'UI/UX Design', level: 85 },
  { name: 'Smart Contracts', level: 92 },
];

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <Card className="p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="text-2xl">
                {user.name?.split(' ').map(n => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl mb-2">{user.name || 'User'}</h1>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">
                      {user.role === 'provider' ? 'Job Provider' : 'Bidder'}
                    </Badge>
                    {user.kycVerified && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <Shield className="w-3 h-3 mr-1" />
                        KYC Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Wallet className="w-4 h-4" />
                      <span className="font-mono">{user.address.slice(0, 12)}...{user.address.slice(-8)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-lg border border-orange-200">
                  <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
                  <div>
                    <div className="text-2xl">{user.rating}</div>
                    <div className="text-xs text-gray-600">42 reviews</div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700">
                Experienced blockchain developer specializing in DeFi applications, smart contract development, and Web3 integrations. Passionate about building secure and scalable decentralized solutions.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <Card className="p-6">
              <h2 className="text-xl mb-4">Performance Stats</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl mb-1">47</div>
                  <div className="text-sm text-gray-600">Jobs Completed</div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl mb-1">98%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-2xl mb-1">$41K</div>
                  <div className="text-sm text-gray-600">Total Earned</div>
                </div>
              </div>
            </Card>

            {/* Skills */}
            <Card className="p-6">
              <h2 className="text-xl mb-4">Skills & Expertise</h2>
              
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{skill.name}</span>
                      <span className="text-gray-600">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} />
                  </div>
                ))}
              </div>
            </Card>

            {/* Reviews */}
            <Card className="p-6">
              <h2 className="text-xl mb-4">Recent Reviews</h2>
              
              <div className="space-y-6">
                {completedJobs.map((job, index) => (
                  <div key={job.id}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="mb-1">{job.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <span>{job.client}</span>
                          <span>•</span>
                          <span>{new Date(job.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(job.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-orange-500 fill-orange-500" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">"{job.review}"</p>
                    <div className="text-sm text-gray-500">Job value: ${job.amount.toLocaleString()} USDC</div>
                    {index < completedJobs.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Verification */}
            <Card className="p-6">
              <h2 className="text-xl mb-4">Verification</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-sm">KYC Status</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Verified
                  </Badge>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">Wallet</span>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Connected
                  </Badge>
                </div>

                <Separator />

                <div>
                  <div className="text-sm text-gray-600 mb-2">Member Since</div>
                  <div>January 2024</div>
                </div>

                <Separator />

                <div>
                  <div className="text-sm text-gray-600 mb-2">Response Time</div>
                  <div>Within 2 hours</div>
                </div>
              </div>
            </Card>

            {/* On-Chain Activity */}
            <Card className="p-6">
              <h2 className="text-xl mb-4">On-Chain Activity</h2>
              
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Total Transactions</div>
                  <div className="text-2xl">127</div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Verified Completions</div>
                  <div className="text-2xl">45</div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Contract Interactions</div>
                  <div className="text-2xl">89</div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mt-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>All activity verified on Ethereum</span>
                </div>
              </div>
            </Card>

            {/* Badges */}
            <Card className="p-6">
              <h2 className="text-xl mb-4">Achievements</h2>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                  <div className="text-2xl mb-1">🏆</div>
                  <div className="text-xs">Top Rated</div>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-center">
                  <div className="text-2xl mb-1">⚡</div>
                  <div className="text-xs">Fast Delivery</div>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                  <div className="text-2xl mb-1">💯</div>
                  <div className="text-xs">100% Complete</div>
                </div>
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
                  <div className="text-2xl mb-1">🎯</div>
                  <div className="text-xs">Expert Level</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
