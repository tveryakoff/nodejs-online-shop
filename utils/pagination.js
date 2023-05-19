const getPaginationData = ({totalElements, limit,pageDisplayCount, currentPage }) => {
  const totalPages = Math.ceil(totalElements / limit)
  const start = Math.max(1, Math.min(currentPage - Math.floor(pageDisplayCount / 2), totalPages - pageDisplayCount))

  const end = Math.min(totalPages, start + pageDisplayCount)

  const allPages = Array.from({ length: totalPages + 1 }, (_, index) => index)

  const pages = allPages.slice(start, end + 1)

  return pages
}

module.exports = {
  getPaginationData
}
