const getCurrentUser = (req) => {
  const user = req?.session?.user
  return user || null
}

module.exports = getCurrentUser
