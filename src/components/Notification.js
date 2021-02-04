import React from 'react'

const Notification = ({ message }) => {
    let color = null

    if (message.toLowerCase().includes('wrong')) {
        color = 'red'
    } else {
        color = 'green'
    }

    const notificationStyle = {
        color: color,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (message === '') {
        return null
    }

    return <div style={notificationStyle} className='error'>{message}</div>
}

export default Notification