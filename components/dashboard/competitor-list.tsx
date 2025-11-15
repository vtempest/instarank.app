"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Star } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Competitor {
  id: string
  asin: string | null
  title: string | null
  price: string | null
  rating: string | null
  reviewCount: number | null
  rank: number | null
  imageUrl: string | null
  lastScrapedAt: Date | null
  productTitle: string | null
  productAsin: string | null
}

interface CompetitorListProps {
  competitors: Competitor[]
}

export function CompetitorList({ competitors }: CompetitorListProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Your Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Reviews</TableHead>
            <TableHead>Rank</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {competitors.map((competitor) => (
            <TableRow key={competitor.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  {competitor.imageUrl ? (
                    <img
                      src={competitor.imageUrl || "/placeholder.svg"}
                      alt={competitor.title || "Product"}
                      className="h-12 w-12 rounded border border-border object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded border border-border bg-muted">
                      <span className="text-xs text-muted-foreground">No img</span>
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-foreground line-clamp-1">
                      {competitor.title || "Unknown Product"}
                    </div>
                    <div className="text-xs text-muted-foreground">{competitor.asin}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div className="font-medium text-foreground line-clamp-1">{competitor.productTitle || "Unknown"}</div>
                  <div className="text-xs text-muted-foreground">{competitor.productAsin}</div>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-semibold text-foreground">
                  {competitor.price ? `$${competitor.price}` : "N/A"}
                </span>
              </TableCell>
              <TableCell>
                {competitor.rating ? (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-foreground">{competitor.rating}</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </TableCell>
              <TableCell>
                <span className="text-foreground">{competitor.reviewCount?.toLocaleString() || "0"}</span>
              </TableCell>
              <TableCell>
                {competitor.rank ? (
                  <Badge variant="secondary">#{competitor.rank.toLocaleString()}</Badge>
                ) : (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  {competitor.lastScrapedAt
                    ? formatDistanceToNow(new Date(competitor.lastScrapedAt), { addSuffix: true })
                    : "Never"}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" asChild>
                  <a href={`https://www.amazon.com/dp/${competitor.asin}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
