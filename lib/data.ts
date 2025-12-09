import type { BookshelfData } from "@/types/bookshelf"
import bookData from "@/data/book_masks.json"

export const getBookshelfData = (): BookshelfData => {
  return bookData as BookshelfData
}

