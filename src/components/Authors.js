import React, { useState } from 'react'
import { Query, ApolloConsumer, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

import SetBirthYear from './SetBirthYear'


const ALL_AUTHORS = gql`
{
  allAuthors  {
    name
    born
    id
    bookCount
  }
}
`


const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
    id
  }
}
`

const Authors = (props) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const handleError = (error) => {
    setErrorMessage(error.message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (!props.show) {
    return null
  }
  return (
    <div>
      <ApolloConsumer>
        {(client =>
          <div>
            <Query query={ALL_AUTHORS} pollInterval={2000}>
              {(result) => {
                if (result.loading) {
                  return <div>loading...</div>
                }
                const authors = result.data.allAuthors
                console.log(result)
                return (
                  <div>
                    <h2>authors</h2>
                    <table>
                      <tbody>
                        <tr>
                          <th></th>
                          <th>
                            born
                </th>
                          <th>
                            books
                </th>
                        </tr>
                        {authors.map(a =>
                          <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )
              }}
            </Query>

         
            <Mutation 
            mutation={EDIT_AUTHOR}
            onError={handleError}
            >
              {(editAuthor) =>
              
                <SetBirthYear
                  editAuthor={editAuthor}
                  
                />
              }
            </Mutation>

          </div>
        )}

      </ApolloConsumer>

    </div>
  )
}

export default Authors