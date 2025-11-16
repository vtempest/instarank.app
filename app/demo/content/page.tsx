"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { demoContent } from "@/lib/demo-data"
import { FileText, Sparkles } from 'lucide-react'

export default function DemoContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Content Generation</h1>
          <p className="text-muted-foreground">Optimized product listings powered by AI</p>
        </div>
        <Button disabled>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Content
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Generated</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Content pieces</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Ready to use</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.5h</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generated Content</CardTitle>
          <CardDescription>AI-optimized content for your products</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Generated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoContent.map((content) => (
                <TableRow key={content.id}>
                  <TableCell>
                    <Badge variant="outline">{content.type}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{content.product}</TableCell>
                  <TableCell>{content.generatedAt}</TableCell>
                  <TableCell>
                    <Badge variant={content.status === "approved" ? "default" : "secondary"}>
                      {content.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" disabled>
                      View
                    </Button>
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
