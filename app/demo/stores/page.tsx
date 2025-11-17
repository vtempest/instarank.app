"use client"
import { demoStores, demoProducts } from "@/lib/demo-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Store, Package, TrendingUp, DollarSign, Plus } from 'lucide-react'
import Link from "next/link"

export default function DemoStoresPage() {
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

      {/* Stores Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {demoStores.map((store) => {
          const storeProducts = demoProducts.filter((p) => p.storeName === store.name)
          const totalSales = storeProducts.reduce((sum, p) => sum + (p.sales || 0), 0)
          const avgRank = Math.round(storeProducts.reduce((sum, p) => sum + p.currentRank, 0) / storeProducts.length)

          return (
            <Card key={store.id} className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Store className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{store.name}</CardTitle>
                      <CardDescription>Marketplace: {store.marketplace}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={store.status === "active" ? "default" : "secondary"}>
                    {store.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Package className="h-4 w-4" />
                      Products
                    </div>
                    <div className="text-2xl font-bold text-foreground">{storeProducts.length}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      Sales
                    </div>
                    <div className="text-2xl font-bold text-foreground">{totalSales}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <TrendingUp className="h-4 w-4" />
                      Avg Rank
                    </div>
                    <div className="text-2xl font-bold text-foreground">#{avgRank}</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/demo/stores/${store.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* All Products from All Stores */}
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
          <CardDescription>Products across all your connected stores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {demoProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1 space-y-1">
                  <div className="font-medium text-foreground">{product.title}</div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>ASIN: {product.asin}</span>
                    <span>•</span>
                    <span>{product.storeName}</span>
                    <span>•</span>
                    <span>Rank: #{product.currentRank}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={product.status === "optimizing" ? "default" : "secondary"}>
                    {product.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
