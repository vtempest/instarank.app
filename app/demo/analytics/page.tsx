"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { demoAnalytics } from "@/lib/demo-data"
import { TrendingUp, Clock, Target, FileText } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

export default function DemoAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Insights</h1>
        <p className="text-muted-foreground">Track your optimization performance and ROI</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales Increase</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{demoAnalytics.salesIncrease}%</div>
            <p className="text-xs text-muted-foreground">Since optimization started</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{demoAnalytics.timeSaved}h</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Keywords Ranked</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{demoAnalytics.keywordsRanked}</div>
            <p className="text-xs text-muted-foreground">In top 10 positions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Generated</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{demoAnalytics.contentGenerated}</div>
            <p className="text-xs text-muted-foreground">Optimized listings</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Performance</CardTitle>
            <CardDescription>Weekly sales growth since using InstaRank</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={demoAnalytics.weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Keyword Rankings</CardTitle>
            <CardDescription>Keywords ranking in top 10 by week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={demoAnalytics.weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="keywords" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Key metrics from your optimization journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <div className="font-medium">Average Product Rank Improvement</div>
              <div className="text-sm text-muted-foreground">Across all tracked products</div>
            </div>
            <Badge className="text-lg">+8 positions</Badge>
          </div>
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <div className="font-medium">Content Optimization Rate</div>
              <div className="text-sm text-muted-foreground">Listings with AI-generated content</div>
            </div>
            <Badge className="text-lg">87%</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Customer Engagement</div>
              <div className="text-sm text-muted-foreground">Click-through rate improvement</div>
            </div>
            <Badge className="text-lg">+34%</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
