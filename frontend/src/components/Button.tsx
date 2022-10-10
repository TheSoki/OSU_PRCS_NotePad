import React from 'react'

export const Button = () => {
    const onButtonClick = () => {
        alert('Button clicked!')
    }
    return <button onClick={onButtonClick}>Click me!</button>
}
