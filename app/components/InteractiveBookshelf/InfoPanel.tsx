'use client'

import type { Book, BookMetadata } from "@/types/bookshelf"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Props {
  book?: Book
  metadata?: BookMetadata
  isSelected?: boolean
}

export function InfoPanel({ book, metadata, isSelected }: Props) {
  return (
    <Card className="w-full max-w-lg min-h-[220px]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-lg">
            {book ? (metadata?.title || `Book ${book.id + 1}`) : "Book Information"}
          </CardTitle>
          {book && isSelected && (
            <Badge variant="secondary">Selected</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!book ? (
          <p className="text-muted-foreground">
            Hover over or click a book to see details
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {metadata?.author && (
              <InfoRow label="Author" value={metadata.author} />
            )}
            <InfoRow label="Confidence" value={`${(book.score * 100).toFixed(1)}%`} />
            {metadata?.description && (
              <InfoRow label="Description" value={metadata.description} />
            )}
            {metadata?.status && <InfoRow label="Status" value={metadata.status} />}
            {metadata?.rating !== undefined && (
              <InfoRow label="My Rating" value={`${metadata.rating}/5`} />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1.5 px-2 rounded bg-muted/50">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="font-medium text-sm">{value}</span>
    </div>
  )
}

