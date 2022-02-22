import { ApolloServer, gql } from 'apollo-server';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: ID # type id is like an integer
    title: String
    author: String
    createdAt: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    # multiple books
    books: [Book]
    # one book by id
    book(id: ID): Book
  }
`;

// Data Source
const bookDatabase = [
  {
    id: 1,
    title: 'The Awakening',
    author: 'Kate Chopin',
    begin_with: 1645521310,
  },
  {
    id: 2,
    title: 'City of Glass',
    author: 'Paul Auster',
    begin_with: 1645521310,
  },
  {
    id: 3,
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    begin_with: 1645521310,
  },
  {
    id: 4,
    title: 'Lord of the Rings',
    author: 'J.R.R. Tolkien',
    begin_with: 1645521310,
  },
  {
    id: 5,
    title: 'Noooo',
    author: 'Joooo',
    begin_with: 1645521310,
  },
  {
    id: 6,
    title: 'Book',
    author: 'from Author',
    begin_with: 1645521310,
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: (parent, args, context, info) => {
      return bookDatabase;
    },
    book: (parent, args, context, info) => {
      // args.id is an object, it is an argument that you pass in your request. ParseInt to make it a number
      return bookDatabase.find((x) => x.id === parseInt(args.id));
    },
  },
  Book: {
    createdAt: (parent) => {
      console.log(parent);
      return new Date(parent.begin_with).toISOString();
      // return 'Mock';
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server. Default on port: 4000
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
