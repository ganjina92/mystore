const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const { auth } = require('./resolvers/auth')

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
    allProducts(parent, {}, ctx, info) {
      return ctx.db.query.products({}, info)
    },
    allUsers(parent, {}, ctx, info) {
      return ctx.db.query.users({}, info)
    }
  },
  Mutation: {
    ...auth,
    updateUser(parent, { id, name, email, pw }, ctx, info) {
      return ctx.db.mutation.updateUser(
        {
          data: { name, email, pw },
          where: { id }
        },
        info,
      )
    },
    createProduct(parent, { name, imgURL, desc, price, quantity }, ctx, info) {
      return ctx.db.mutation.createProduct(
        { data: { name, imgURL, desc, price, quantity } },
        info,
      )
    },
    updateProduct(parent, { id, name, imgURL, desc, price, quantity }, ctx, info) {
      return ctx.db.mutation.updateProduct(
        {
          data: { name, imgURL, desc, price },
          where: { id }
        },
        info,
      )
    },
    deleteProduct(parent, {id}, ctx, info) {
      return ctx.db.mutation.deleteProduct(
        {
          where: { id }
        },
        info
      )
    },
  
    addProductToCart(parent, { user_id, product_id }, ctx, info) {
      return ctx.db.mutation.updateUser(
        {
          data: {
            cart: {
              update: {
                products: { connect: [{ id: product_id }] }
              }
            }
          },
          where: { id: user_id },
        }, info, )
    },
    removeProductFromCart(parent, { user_id, product_id }, ctx, info) {
      return ctx.db.mutation.updateUser(
        {
          data: {
            cart: {
              update: {
                products: { disconnect: [{ id: product_id }] }
              }
            }
          },
          where: { id }
        }, info, )
    },
    clearCart(parent, { id }, ctx, info) {
      return ctx.db.mutation.updateCart(
        {
          where: { id },
          data: {
            user: {
              disconnect: user_id
            }
          }
        }, info, )
    },
  },
}

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
