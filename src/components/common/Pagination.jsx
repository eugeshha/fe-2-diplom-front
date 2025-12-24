// import React from 'react'
// import './Pagination.css'
//
// export default function Pagination({ currentPage, totalPages, onPageChange }) {
//     const generatePages = () => {
//         const pages = []
//
//         if (totalPages <= 5) {
//             for (let i = 1; i <= totalPages; i++) {
//                 pages.push(i)
//             }
//         } else {
//             pages.push(1)
//
//             if (currentPage > 3) {
//                 pages.push('dots-left')
//             }
//
//             const start = Math.max(2, currentPage - 1)
//             const end = Math.min(totalPages - 1, currentPage + 1)
//
//             for (let i = start; i <= end; i++) {
//                 pages.push(i)
//             }
//
//             if (currentPage < totalPages - 2) {
//                 pages.push('dots-right')
//             }
//
//             pages.push(totalPages)
//         }
//
//         return pages
//     }
//
//     const pages = generatePages()
//
//     return (
//         <div className="pagination">
//             <button
//                 className="pagination__button"
//                 onClick={() => onPageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//             >
//                 ←
//             </button>
//
//             {pages.map((page, index) => {
//                 if (page === 'dots-left' || page === 'dots-right') {
//                     return (
//                         <button key={index} className="pagination__button pagination__button--dots" disabled>
//                             ...
//                         </button>
//                     )
//                 }
//
//                 return (
//                     <button
//                         key={index}
//                         className={`pagination__button ${
//                             page === currentPage ? 'pagination__button--active' : ''
//                         }`}
//                         onClick={() => onPageChange(page)}
//                     >
//                         {page}
//                     </button>
//                 )
//             })}
//
//             <button
//                 className="pagination__button"
//                 onClick={() => onPageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//             >
//                 →
//             </button>
//         </div>
//     )
// }
import React from 'react'
import './Pagination.css'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const generatePages = () => {
        const pages = []

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            pages.push(1)

            if (currentPage > 3) {
                pages.push('dots-left')
            }

            const start = Math.max(2, currentPage - 1)
            const end = Math.min(totalPages - 1, currentPage + 1)

            for (let i = start; i <= end; i++) {
                pages.push(i)
            }

            if (currentPage < totalPages - 2) {
                pages.push('dots-right')
            }

            pages.push(totalPages)
        }

        return pages
    }

    const pages = generatePages()

    return (
        <div className="pagination">
            <button
                className="pagination__button pagination__button--arrow pagination__button--arrow-left"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            />

            {pages.map((page, index) => {
                if (page === 'dots-left' || page === 'dots-right') {
                    return (
                        <button
                            key={`dots-${index}`}
                            className="pagination__button pagination__button--dots"
                            disabled
                        >
                            ...
                        </button>
                    )
                }

                return (
                    <button
                        key={`page-${page}`}
                        className={`pagination__button ${
                            page === currentPage ? 'pagination__button--active' : ''
                        }`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                )
            })}

            <button
                className="pagination__button pagination__button--arrow pagination__button--arrow-right"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            />
        </div>
    )
}
