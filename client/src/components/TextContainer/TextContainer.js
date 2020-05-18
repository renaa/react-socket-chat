import React from 'react'
import './TextContainer.css'

const TextContainer = ({ users }) => (

    
        <div className="textContainer">
            {users.map((user, i) => 
                <div key={i}>user.name</div>
            )}
        </div>
    

)
export default TextContainer