import React from 'react'
import './Heading.css';


function Heading (props) {


    return (
        <>
            <h1 className='tit'>WELCOEM TO OUR PAGE</h1>
            <h1 className='h11'>{props.head}</h1>
        </>
    )
}

export default Heading 