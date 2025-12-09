/**
 * Bounding box coordinates in pixel units
 * Format: [x_min, y_min, x_max, y_max]
 */
export type BoundingBox = [number, number, number, number]

/**
 * Individual book data extracted from SAM3 segmentation
 */
export interface Book {
  /** Unique identifier for the book */
  id: number

  /** SVG path data string (e.g., "M 100,200 L 150,200 ... Z") */
  path: string

  /** Model confidence score (0-1) */
  score: number

  /** Bounding box for positioning labels */
  bbox: BoundingBox

  /** Number of vertices in the contour */
  num_points: number
}

/**
 * Complete bookshelf data structure
 */
export interface BookshelfData {
  /** Original image width in pixels */
  width: number

  /** Original image height in pixels */
  height: number

  /** Array of detected books with contour data */
  books: Book[]
}

/**
 * Book metadata for display (extend as needed)
 */
export interface BookMetadata {
  id: number
  title?: string
  author?: string
  isbn?: string
  category?: string
  description?: string
  status?: string
  rating?: number
}

/**
 * Selection state for the bookshelf
 */
export interface SelectionState {
  hoveredId: number | null
  selectedId: number | null
}

/**
 * Props for the main InteractiveBookshelf component
 */
export interface InteractiveBookshelfProps {
  /** Path to the bookshelf image */
  imageSrc: string

  /** Bookshelf segmentation data */
  data: BookshelfData

  /** Optional book metadata map */
  metadata?: Map<number, BookMetadata>

  /** Callback when a book is clicked */
  onBookClick?: (book: Book) => void

  /** Callback when a book is hovered */
  onBookHover?: (book: Book | null) => void

  /** Custom class name */
  className?: string
}

