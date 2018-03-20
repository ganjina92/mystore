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
    cart(parent, { id }, ctx, info) {
      return ctx.db.query.cart(
        { where: { id } },
        info
      )
    },
    allProducts(parent, {}, ctx, info) {
      return ctx.db.query.products({}, info)
    },
    allUsers(parent, {}, ctx, info) {
      return ctx.db.query.users({}, info)
    },
  
  allProductsInCart(parent, {}, ctx, info) {
    const cart=ctx.db.query.cart(
      { where: { cartID } },
      info
    )
    return cart.products
  }
},
  Mutation: {
    ...auth,
    updateUser(parent, { id, name, email }, ctx, info) {
      return ctx.db.mutation.updateUser(
        {
          data: { name, email },
          where: { id }
        },
        info,
      )
    },
    createProduct(parent, { name, imgURL, desc, price }, ctx, info) {
      return ctx.db.mutation.createProduct(
        { data: { name, imgURL, desc, price} },
        info,
      )
    },
    createCart(parent, { product }, ctx , info ) {
      const product= [ctx.db.query.cart(
        { where: { product} },
        info
      )]
      return ctx.db.mutation.createCart(
        { data: { products } },
        info,
      )
    },
    createCartProduct( parent,{ product, quantity}, ctx, info) {
      return ctx.db.mutation.createCartProduct(
        { data: { product, quantity}},
        info
      )
    },
    deleteProduct(parent, { id }, ctx, info) {
      return ctx.db.mutation.deleteProduct(
        {
          where: { id }
        },
        info
      )
    },
    
    
  }
}
    const server = new GraphQLServer({
      typeDefs: './src/schema.graphql',
      resolvers,
      context: req => ({
        ...req,
        db: new Prisma({
          typeDefs: 'src/generated/prisma.graphql',
          endpoint: 'https://us1.prisma.sh/public-quillscorpion-38/lego-store-prisma/dev',
          secret: 'mysecret123',
          debug: true,
        }),
      }),
    })
    server.start(() => console.log('Server is running on http://localhost:4000'))
