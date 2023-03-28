import React from 'react'

const Alert = (props) => {
    return (
        <div class={`alert alert-${props.type}`} role="alert">
            {props.errorMessage}
        </div>
    )
}

export default Alert
