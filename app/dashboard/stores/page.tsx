import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function StoresPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Stores</h1>
          <p className="mt-2 text-muted-foreground">Manage your connected Amazon stores</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Store
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Stores</CardTitle>
          <CardDescription>Connect your Amazon seller accounts to start optimizing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
            <div className="text-center">
              <p className="mb-4">No stores connected yet</p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Connect Your First Store
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
