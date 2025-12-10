'use client'

import { useCallback, useMemo, useState } from "react"
import Image from "next/image"
import { BookPath } from "./BookPath"
import { InfoPanel } from "./InfoPanel"
import type {
  Book,
  InteractiveBookshelfProps,
  SelectionState,
} from "@/types/bookshelf"
import styles from "./styles.module.css"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function InteractiveBookshelf({
  imageSrc,
  data,
  metadata,
  onBookClick,
  onBookHover,
  className,
}: InteractiveBookshelfProps) {
  const [selection, setSelection] = useState<SelectionState>({
    hoveredId: null,
    selectedId: null,
  })
  const [isDisabled, setIsDisabled] = useState(false)

  const handleBookHover = useCallback(
    (book: Book | null) => {
      if (isDisabled) return
      setSelection((prev) => ({ ...prev, hoveredId: book?.id ?? null }))
      onBookHover?.(book)
    },
    [isDisabled, onBookHover],
  )

  const handleBookClick = useCallback(
    (book: Book) => {
      if (isDisabled) return
      setSelection((prev) => ({
        hoveredId: null,
        selectedId: prev.selectedId === book.id ? null : book.id,
      }))
      onBookClick?.(book)
    },
    [isDisabled, onBookClick],
  )

  const clearSelection = useCallback(() => {
    setSelection({ hoveredId: null, selectedId: null })
  }, [])

  const toggleDisabled = useCallback(() => {
    setIsDisabled((prev) => !prev)
    if (!isDisabled) {
      setSelection({ hoveredId: null, selectedId: null })
    }
  }, [isDisabled])

  const activeBook = useMemo(() => {
    // If a book is selected, only show that one
    if (selection.selectedId !== null) {
      return data.books.find((b) => b.id === selection.selectedId)
    }
    // Otherwise show hovered book
    return data.books.find((b) => b.id === selection.hoveredId)
  }, [data.books, selection.hoveredId, selection.selectedId])

  const containerStyle = useMemo(
    () => ({
      maxWidth: `${data.width}px`,
      width: "100%",
      aspectRatio: `${data.width} / ${data.height}`,
    }),
    [data.height, data.width],
  )

  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.controls}>
        <Button variant="outline" onClick={clearSelection} disabled={isDisabled}>
          Clear selection
        </Button>
        <Button
          variant={isDisabled ? "default" : "outline"}
          onClick={toggleDisabled}
        >
          {isDisabled ? "Enable interaction" : "Disable interaction"}
        </Button>
      </div>

      <div className={styles.bookshelfContainer} style={containerStyle}>
        <Image
          src={imageSrc}
          alt="Bookshelf"
          fill
          priority
          className={styles.image}
          sizes="(max-width: 768px) 90vw, 90vw"
          style={{ objectFit: "contain" }}
        />

        <svg
          viewBox={`0 0 ${data.width} ${data.height}`}
          className={cn(styles.overlay, isDisabled && styles.overlayDisabled)}
          aria-label="Interactive book selection overlay"
        >
          {data.books.map((book) => (
            <BookPath
              key={book.id}
              book={book}
              isHovered={!isDisabled && selection.hoveredId === book.id}
              isSelected={!isDisabled && selection.selectedId === book.id}
              onHover={handleBookHover}
              onClick={handleBookClick}
            />
          ))}
        </svg>
      </div>

      <InfoPanel
        book={activeBook}
        metadata={activeBook ? metadata?.get(activeBook.id) : undefined}
        isSelected={selection.selectedId === activeBook?.id}
      />
    </div>
  )
}

