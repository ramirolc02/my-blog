'use client'

import { memo, useCallback } from "react"
import type { Book } from "@/types/bookshelf"
import styles from "./styles.module.css"
import { cn } from "@/lib/utils"

interface Props {
  book: Book
  isHovered: boolean
  isSelected: boolean
  onHover: (book: Book | null) => void
  onClick: (book: Book) => void
}

export const BookPath = memo(function BookPath({
  book,
  isHovered,
  isSelected,
  onHover,
  onClick,
}: Props) {
  const handleMouseEnter = useCallback(() => onHover(book), [book, onHover])
  const handleMouseLeave = useCallback(() => onHover(null), [onHover])
  const handleClick = useCallback(() => onClick(book), [book, onClick])

  return (
    <path
      d={book.path}
      className={cn(
        styles.bookPath,
        isHovered && styles.bookPathHovered,
        isSelected && styles.bookPathSelected,
      )}
      data-book-id={book.id}
      data-score={book.score}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Book ${book.id + 1}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick()
        }
      }}
    />
  )
})

