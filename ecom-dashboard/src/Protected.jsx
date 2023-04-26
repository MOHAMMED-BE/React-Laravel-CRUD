import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Protected = (props) => {
    let Cmp = props.Cmp;
    const navigate = useNavigate();
    const storedData = localStorage.getItem('user-info');

    useEffect(() => {
        if (!storedData) {
            navigate('/login');
        }
    }, [navigate, storedData]);

    return (
        <>
            <Cmp baseUrl={props.baseUrl} />
        </>

    )
}

export default Protected
