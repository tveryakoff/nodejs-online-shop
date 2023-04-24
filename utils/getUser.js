const getCurrentUser = (req) => {
  const user = req?.user
  return user || null
}

module.exports = getCurrentUser
