const deleteProduct = async (csrf, id, btn) => {
  const res = await fetch(`/admin/product/${id}`,{method: 'DELETE', headers: {'csrf-token': csrf}})
  const data = await res.json()

  const article = btn.closest('article')

  article.parentNode.removeChild(article)
}
