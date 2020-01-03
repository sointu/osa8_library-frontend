import React, { useState } from 'react'

const SetBirthYear = (props) => {
    
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const submit = async (e) => {
        e.preventDefault()
        
        await props.editAuthor({
            variables: { name, born }
        })

        setName('')
        setBorn('')
    }
    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <div>
                    name
                    <input
                        value={name}
                        onChange={({ target }) => setName(target.value)}

                    />

                </div>
                <div>
                    born
                    <input
                        value={born}
                        onChange={({ target }) => setBorn(parseInt(target.value))}
                    />
                    <button onClick={props.editAuthor} type="button"> update author </button>
                </div>
            </form>
        </div>
    )
}
export default SetBirthYear
