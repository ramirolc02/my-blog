import { InteractiveBookshelf } from "@/app/components/InteractiveBookshelf"
import { getBookshelfData } from "@/lib/data"
import type { BookMetadata } from "@/types/bookshelf"

const titlesLeftToRight = [
    "The Da Vinci Code",
    "The Great Economists",
    "The Wall",
    "Surely You're Joking, Mr. Feynman!",
    "The Fabric of Reality",
    "Zero to One",
    "Thinking, Fast and Slow",
    "How to Win Friends and Influence People",
    "The Beginning of Infinity",
    "Deep Work",
    "The Courage to Be Disliked",
    "The Psychology of Money",
    "Read Write Own",
    "Nail It Then Scale It",
]

const bookAuthors: Record<string, string> = {
    "The Da Vinci Code": "Dan Brown",
    "The Great Economists": "Linda Yueh",
    "The Wall": "Marlen Haushofer",
    "Surely You're Joking, Mr. Feynman!":
        "Richard P. Feynman, Ralph Leighton",
    "The Fabric of Reality": "David Deutsch",
    "Zero to One": "Peter Thiel, Blake Masters",
    "Thinking, Fast and Slow": "Daniel Kahneman",
    "How to Win Friends and Influence People": "Dale Carnegie",
    "The Beginning of Infinity": "David Deutsch",
    "Deep Work": "Cal Newport",
    "The Courage to Be Disliked": "Ichiro Kishimi, Fumitake Koga",
    "The Psychology of Money": "Morgan Housel",
    "Read Write Own": "Chris Dixon",
    "Nail It Then Scale It": "Nathan Furr, Paul Ahlstrom",
}

const bookDescriptions: Record<string, string> = {
    "The Da Vinci Code": "",
    "The Great Economists": "",
    "The Wall": "",
    "Surely You're Joking, Mr. Feynman!": "",
    "The Fabric of Reality": "",
    "Zero to One": "",
    "Thinking, Fast and Slow": "",
    "How to Win Friends and Influence People": "",
    "The Beginning of Infinity": "",
    "Deep Work": "",
    "The Courage to Be Disliked": "",
    "The Psychology of Money": "",
    "Read Write Own": "",
    "Nail It Then Scale It": "",
}

const bookStatuses: Record<string, string> = {
    "The Da Vinci Code": "Read",
    "The Great Economists": "Unread",
    "The Wall": "Read",
    "Surely You're Joking, Mr. Feynman!": "Read",
    "The Fabric of Reality": "Read",
    "Zero to One": "Read",
    "Thinking, Fast and Slow": "Read",
    "How to Win Friends and Influence People": "Read",
    "The Beginning of Infinity": "Unread",
    "Deep Work": "Unread",
    "The Courage to Be Disliked": "In Progress",
    "The Psychology of Money": "Read",
    "Read Write Own": "Read",
    "Nail It Then Scale It": "Read",
}

const bookRatings: Record<string, number | undefined> = {
    "The Da Vinci Code": undefined,
    "The Great Economists": undefined,
    "The Wall": undefined,
    "Surely You're Joking, Mr. Feynman!": undefined,
    "The Fabric of Reality": undefined,
    "Zero to One": undefined,
    "Thinking, Fast and Slow": undefined,
    "How to Win Friends and Influence People": undefined,
    "The Beginning of Infinity": undefined,
    "Deep Work": undefined,
    "The Courage to Be Disliked": undefined,
    "The Psychology of Money": undefined,
    "Read Write Own": undefined,
    "Nail It Then Scale It": undefined,
}

// Book IDs sorted by x-position (left to right) from the mask data
const bookOrderLeftToRight = [7, 1, 9, 6, 8, 11, 13, 4, 12, 10, 2, 0, 5, 3]

const bookMetadata: Map<number, BookMetadata> = (() => {
    const meta = new Map<number, BookMetadata>()

    bookOrderLeftToRight.forEach((bookId, index) => {
        const title = titlesLeftToRight[index]
        if (!title) return
        meta.set(bookId, {
            id: bookId,
            title,
            author: bookAuthors[title],
            description: bookDescriptions[title],
            status: bookStatuses[title],
            rating: bookRatings[title],
        })
    })

    return meta
})()

export default function BookshelfPage() {
    const bookshelfData = getBookshelfData()

    return (
        <div className="container mx-auto max-w-6xl px-4 py-10">
            <header className="mb-8 text-center space-y-3">
                <h1 className="text-4xl font-bold tracking-tight">Interactive Bookshelf</h1>
                <p className="text-muted-foreground">
                    Hover or click a book to highlight its contour and view details. Thanks to <a href="https://github.com/facebookresearch/sam3" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">SAM3 Segmentation</a>.
                </p>
            </header>

            <InteractiveBookshelf
                imageSrc="/images/bookshelf.jpg"
                data={bookshelfData}
                metadata={bookMetadata}
            />
        </div>
    )
}

