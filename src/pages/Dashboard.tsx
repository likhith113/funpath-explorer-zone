
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useAuth } from '@/hooks/use-auth';
import { Trophy, Target, TrendingUp, BookOpen } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock data for demonstration
  const weeklyActivity = [
    { day: 'Mon', concepts: 5, memes: 2, flashcards: 8 },
    { day: 'Tue', concepts: 8, memes: 4, flashcards: 12 },
    { day: 'Wed', concepts: 6, memes: 3, flashcards: 10 },
    { day: 'Thu', concepts: 10, memes: 6, flashcards: 15 },
    { day: 'Fri', concepts: 7, memes: 5, flashcards: 11 },
    { day: 'Sat', concepts: 12, memes: 8, flashcards: 18 },
    { day: 'Sun', concepts: 9, memes: 7, flashcards: 14 }
  ];

  const skillProgress = [
    { skill: 'Statistics', progress: 85, color: '#8B5CF6' },
    { skill: 'Machine Learning', progress: 72, color: '#0EA5E9' },
    { skill: 'Data Visualization', progress: 68, color: '#10B981' },
    { skill: 'Python', progress: 90, color: '#F59E0B' }
  ];

  const activityDistribution = [
    { name: 'Concepts', value: 45, color: '#8B5CF6' },
    { name: 'Flashcards', value: 35, color: '#0EA5E9' },
    { name: 'Memes', value: 20, color: '#10B981' }
  ];

  const chartConfig = {
    concepts: {
      label: "Concepts",
      color: "#8B5CF6",
    },
    memes: {
      label: "Memes",
      color: "#10B981",
    },
    flashcards: {
      label: "Flashcards", 
      color: "#0EA5E9",
    },
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'Student'}!</h1>
          <p className="text-gray-600">Here's your learning progress overview</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Trophy className="h-4 w-4 text-yellow-500" />
          <span>Current Rank: Data Enthusiast</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Concepts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">57</div>
            <p className="text-xs text-muted-foreground">+12 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flashcards Completed</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">+45 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rank Score</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">Top 15% of learners</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Your learning activities over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="concepts" fill="var(--color-concepts)" />
                <Bar dataKey="memes" fill="var(--color-memes)" />
                <Bar dataKey="flashcards" fill="var(--color-flashcards)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Activity Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Distribution</CardTitle>
            <CardDescription>How you spend your learning time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activityDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {activityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skill Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Skill Progress</CardTitle>
          <CardDescription>Your mastery levels in different data science areas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skillProgress.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{skill.skill}</span>
                  <span className="text-sm text-gray-500">{skill.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${skill.progress}%`,
                      backgroundColor: skill.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Achievements</CardTitle>
          <CardDescription>Your latest learning milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <Trophy className="h-6 w-6 text-yellow-600" />
              <div>
                <p className="font-medium">Week Warrior</p>
                <p className="text-sm text-gray-600">Completed 7 days of continuous learning</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Target className="h-6 w-6 text-blue-600" />
              <div>
                <p className="font-medium">Flashcard Master</p>
                <p className="text-sm text-gray-600">Completed 200+ flashcards this month</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <BookOpen className="h-6 w-6 text-green-600" />
              <div>
                <p className="font-medium">Concept Explorer</p>
                <p className="text-sm text-gray-600">Learned 50+ new data science concepts</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
