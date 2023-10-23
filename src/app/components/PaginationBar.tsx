import Link from "next/link"

type Props = {
    currentPage: number,
    totalPages: number,
    queryString?: string
}

export default function PaginationBar({ currentPage, totalPages, queryString }: Props) {
    const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10))
    const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9))

    const items: JSX.Element[] = []

    for( let page = minPage; page <= maxPage; page++) {
        const href = queryString ? `?${queryString}&page=${page}` : `?page=${page}`
        items.push(
            <li>
                {
                    page === currentPage
                    ? <Link href={href} aria-current="page" className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{ page }</Link>
                    : <Link href={href} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{ page }</Link>
                }
            </li>
        )
    }
    
    const prevHref = queryString ? `?${queryString}&page=${currentPage - 1}` : `?page=${currentPage - 1}`
    const nextHref = queryString ? `?${queryString}&page=${currentPage + 1}` : `?page=${currentPage + 1}`

    return (
    <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-base h-10">
            {
                currentPage > 1 && (
                    <li>
                        <Link href={prevHref} className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</Link>
                    </li>
                )
            }
            
            {
                items
            }

            {
                currentPage < totalPages && (
                    <li>
                        <Link href={nextHref} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</Link>
                    </li>
                )
            }
            
        </ul>
    </nav>
  )
}
