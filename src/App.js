import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'


const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author
    published
    genres
    id 
  }
}
`



const App = ({ result }) => {
  const [page, setPage] = useState('authors')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        result={result}
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <Mutation mutation={ADD_BOOK}>
        {(addBook) =>
          <NewBook
            addBook={addBook}
            show={page === 'add'}
          />
        }
      </Mutation>

    </div>
  )
}

export default App