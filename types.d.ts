type Meta = {
  id: string,
  title: string,
  date: string,
  tags: string[],
  excerpt?: string,
}

type BlogPost = {
  meta: Meta,
  content: ReactElement<any, string | JSXElementConstructor<any>>,
}

type TagStatistics = {
  name: string,
  count: number,
  frequency: 'high' | 'medium' | 'low'
}

type FilterOptions = {
  tags?: string[],
  searchTerm?: string
}
