"use client"
import { demoProducts } from "@/lib/demo-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, TrendingUp, TrendingDown, Star, DollarSign, Plus } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function DemoProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="mt-2 text-muted-foreground">Track and optimize your Amazon product listings</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="optimizing">Optimizing</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="monitoring">Monitoring</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all-stores">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by store" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-stores">All Stores</SelectItem>
            <SelectItem value="outdoor">Outdoor Adventure Gear</SelectItem>
            <SelectItem value="home">Premium Home Goods</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {demoProducts.map((product) => {
          const rankChange = product.currentRank - (product.targetRank || 0)
          const isImproving = rankChange > 0

          return (
            <Card key={product.id} className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base line-clamp-2">{product.title}</CardTitle>
                  <Badge variant={product.status === "optimizing" ? "default" : "secondary"}>
                    {product.status}
                  </Badge>
                </div>
                <CardDescription>
                  ASIN: {product.asin} • {product.storeName}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Current Rank</div>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold text-foreground">#{product.currentRank}</div>
                      {isImproving ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Target Rank</div>
                    <div className="text-2xl font-bold text-primary">#{product.targetRank}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <DollarSign className="h-3 w-3" />
                      Price
                    </div>
                    <div className="text-sm font-semibold text-foreground">${product.price}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3" />
                      Rating
                    </div>
                    <div className="text-sm font-semibold text-foreground">{product.rating}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Package className="h-3 w-3" />
                      Sales
                    </div>
                    <div className="text-sm font-semibold text-foreground">{product.sales}</div>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <div className="text-xs text-muted-foreground">Last optimized {product.lastOptimized}</div>
                </div>

                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
