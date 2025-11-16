"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { demoCompetitors } from "@/lib/demo-data"
import { Star, TrendingUp } from 'lucide-react'

export default function DemoCompetitorsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Competitor Intelligence</h1>
        <p className="text-muted-foreground">AI-powered competitor analysis and tracking</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tracked Competitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{demoCompetitors.length}</div>
            <p className="text-xs text-muted-foreground">Across all products</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.75</div>
            <p className="text-xs text-muted-foreground">Top competitor avg</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Areas to improve</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Competitor Analysis</CardTitle>
          <CardDescription>Top competitors for your products</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Your Product</TableHead>
                <TableHead>Competitor</TableHead>
                <TableHead>Rank</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Reviews</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoCompetitors.map((competitor) => (
                <TableRow key={competitor.id}>
                  <TableCell className="font-medium">{competitor.productTitle}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{competitor.competitorTitle}</div>
                      <div className="text-sm text-muted-foreground">{competitor.competitorAsin}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">#{competitor.rank}</Badge>
                  </TableCell>
                  <TableCell>${competitor.price}</TableCell>
                  <TableCell>{competitor.reviews.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {competitor.rating}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
