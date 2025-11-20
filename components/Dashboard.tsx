import { TrendingUp, Briefcase, DollarSign, CheckCircle, Clock, Users } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { User } from '../App';

interface DashboardProps {
  user: User;
}

const earningsData = [
  { month: 'Jan', earnings: 4200 },
  { month: 'Feb', earnings: 5800 },
  { month: 'Mar', earnings: 6200 },
  { month: 'Apr', earnings: 7500 },
  { month: 'May', earnings: 8100 },
  { month: 'Jun', earnings: 9200 },
];

const jobCategoryData = [
  { name: 'Development', value: 45, color: '#3b82f6' },
  { name: 'Design', value: 25, color: '#8b5cf6' },
  { name: 'Security', value: 15, color: '#10b981' },
  { name: 'Marketing', value: 15, color: '#f59e0b' },
];

const recentJobs = [
  {
    id: '1',
    title: 'DeFi Dashboard Development',
    status: 'completed',
    amount: 5000,
    client: 'John Doe',
    completedDate: '2024-11-15',
    rating: 5,
  },
  {
    id: '2',
    title: 'Smart Contract Audit',
    status: 'in-progress',
    amount: 3500,
    client: 'Alice Chen',
    progress: 65,
  },
  {
    id: '3',
    title: 'UI/UX Design',
    status: 'completed',
    amount: 2800,
    client: 'Bob Smith',
    completedDate: '2024-11-10',
    rating: 4,
  },
];

export function Dashboard({ user }: DashboardProps) {
  const isProvider = user.role === 'provider';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Dashboard</h1>
        <p className="text-gray-600">
          {isProvider ? 'Track your job postings and performance' : 'Monitor your earnings and completed jobs'}
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Earnings</span>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="text-3xl mb-1">$41,000</div>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span>+12% from last month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">{isProvider ? 'Active Jobs' : 'Jobs Completed'}</span>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl mb-1">{isProvider ? '8' : '47'}</div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span>{isProvider ? '3 awaiting bids' : '5 this month'}</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Success Rate</span>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="text-3xl mb-1">98%</div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span>45 of 46 jobs</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Avg. Rating</span>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600">⭐</span>
            </div>
          </div>
          <div className="text-3xl mb-1">4.9</div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span>From 42 reviews</span>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h2 className="text-xl mb-4">Earnings Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Line type="monotone" dataKey="earnings" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl mb-4">Jobs by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={jobCategoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {jobCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Jobs */}
      <Card className="p-6">
        <h2 className="text-xl mb-4">Recent Jobs</h2>
        
        <div className="space-y-4">
          {recentJobs.map((job) => (
            <div key={job.id} className="border rounded-lg p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3>{job.title}</h3>
                    {job.status === 'completed' ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        <Clock className="w-3 h-3 mr-1" />
                        In Progress
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {job.client}
                    </div>
                    {job.status === 'completed' && job.rating && (
                      <div>⭐ {job.rating}.0</div>
                    )}
                    {job.completedDate && (
                      <div>Completed {new Date(job.completedDate).toLocaleDateString()}</div>
                    )}
                  </div>

                  {job.status === 'in-progress' && job.progress && (
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span>{job.progress}%</span>
                      </div>
                      <Progress value={job.progress} />
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-xl mb-1">
                    <DollarSign className="w-5 h-5" />
                    {job.amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">USDC</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* On-Chain Verification Status */}
      <Card className="p-6 mt-6">
        <h2 className="text-xl mb-4">On-Chain Verification Status</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h4 className="text-sm mb-1">Total Verified Completions</h4>
                <p className="text-xs text-gray-600">Jobs verified and recorded on blockchain</p>
              </div>
            </div>
            <div className="text-2xl">45</div>
          </div>

          <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-600" />
              <div>
                <h4 className="text-sm mb-1">Pending Verification</h4>
                <p className="text-xs text-gray-600">Awaiting on-chain confirmation</p>
              </div>
            </div>
            <div className="text-2xl">2</div>
          </div>

          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm">Connected to Ethereum Mainnet</span>
            </div>
            <p className="text-xs text-gray-600">
              All job completions are verified through smart contracts and permanently recorded on the blockchain for transparency and trust.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
