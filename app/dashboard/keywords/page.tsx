import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function KeywordsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Keywords</h1>
          <p className="mt-2 text-muted-foreground">Discover and track high-value keywords</p>
        </div>
        <Button>
          <Search className="mr-2 h-4 w-4" />
          Discover Keywords
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Keyword Research</CardTitle>
          <CardDescription>Find high-volume, low-competition keywords for your products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
            <div className="text-center">
              <p className="mb-4">Start discovering keywords for your products</p>
              <Button>
                <Search className="mr-2 h-4 w-4" />
                Start Keyword Research
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
