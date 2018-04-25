const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const { auth } = require('./resolvers/auth')
const { cart } = require('./resolvers/cart')
// const { paypal } = require('paypal-rest-sdk')

const resolvers = {
  Query: {
    user(parent, { id }, ctx, info) {
      return ctx.db.query.user(
        { where: { id } },
        info
      )
    },
    product(parent, { id }, ctx, info) {
      return ctx.db.query.product(
        { where: { id } },
        info
      )
    },
    cart(parent, { id }, ctx, info){
      return ctx.db.mutation.user(
        { where: { id } },
        info
      )
    },
    cartProduct(parent, { id }, ctx, info){
      return ctx.db.mutation.cartProduct(
        { where: { id } },
        info
      )
    },
    allProducts(parent, {}, ctx, info) {
      return ctx.db.query.products(
        { orderBy: 'price_ASC' }
      , info)
    },

    allUsers(parent, {}, ctx, info) {
      return ctx.db.query.users({}, info)

  },
    async allProductsInCart(parent, { id }, ctx, info){
      const cart = await ctx.db.query.cart(
        { where: { id } },
        info
      )
      return cart.products
    }
  },
  Mutation: {
    ...auth,
    ...cart,
    updateUser(parent, { id, name, email, pw }, ctx, info) {
      return ctx.db.mutation.updateUser(
        {
          data: { name, email, pw,},
          where: { id }
        },
        info,
      )
    },
    createProduct(parent, { name, imgURL, desc, price }, ctx, info) {
      return ctx.db.mutation.createProduct(
        { data: { name, imgURL, desc, price } },
        info,
      )
    },
    updateProduct(parent, { id, name, imgURL, desc, price }, ctx, info) {
      return ctx.db.mutation.updateProduct(
        {
          data: { name, imgURL, desc, price },
          where: { id }
        },
        info,
      )
    },
    deleteProduct(parent, { id }, ctx, info){
      return ctx.db.mutation.deleteProduct(
        {
          where: { id }
        },
        info
      )
    }
  },
}

// paypal.configure({
//   'mode': 'sandbox', //sandbox or live
//   'client_id': 'AUXzTnci3l0EJFgfjeF7B4pOkZOr3zRz6cFrWqKP4sdfiOfyCZJhuXgYDKd0TnZNhk66baxPE3rQHZKu',
//   'client_secret': 'ENF0T9q8iFOsk0U42F-4nF_5vWa21zuFYE-NEnlYqoSpYHEU6i0RsJdbi9EYAXumeY3aSv1xqgMX0OYh'
// });


const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://us1.prisma.sh/public-nettleraver-722/simple-store/dev',
      secret: 'mysecret123',
      debug: true,
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
