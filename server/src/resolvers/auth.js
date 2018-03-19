const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const auth = {
  async login(parent, { email, pw }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email } })
    if (!user) {
      throw new Error(`No such user found for email: ${email}`)
    }
    const valid = await bcrypt.compare(pw, user.pw)
    if (!valid) {
      throw new Error('Invalid password')
    }
    
    return {
      token: jwt.sign({ userId: user.id }, 'JWT_SECRET'),
      user,
    }
  },
  async createUser(parent, { name, email, pw }, ctx, info) {
    pw = await bcrypt.hash(pw, 10)
    return ctx.db.mutation.createUser(
      { data: { name, email, pw, cart:{create:{}} } },
      info,
    )
    
  },
}

module.exports = { auth }
