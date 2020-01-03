import React from 'react'
import { Query, ApolloConsumer } from 'react-apollo'
import { gql } from 'apollo-boost'

const ALL_BOOKS = gql`
{
  allBooks  {
    title
    author
    id
    published
  }
}
`
const Books = (props) => {
  if (!props.show) {
    return null
  }

  return (
    
    <ApolloConsumer>
      {(client =>
        
        <Query query={ALL_BOOKS} pollInterval={2000}>
          {(result) => {
            if (result.loading) {
              return <div>loading...</div>
            }
            const books = result.data.allBooks
            console.log(result)

            return (
              <div>
                <h2>books</h2>

                <table>
                  <tbody>
                    <tr>
                      <th></th>
                      <th>
                        author
            </th>
                      <th>
                        published
            </th>
                    </tr>
                    {books.map(a =>
                      <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author}</td>
                        <td>{a.published}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            )
          }}
        </Query>
        
      )}
    </ApolloConsumer>
        
  )

}

export default Books