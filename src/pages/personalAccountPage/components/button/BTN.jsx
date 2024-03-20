import React from 'react'
import './button.css'

const BTN = ({children, Clicked, isActive}) => {
  return (
    <div>
      <button onClick={Clicked} className={isActive ? "btn active" : "btn"}>{children}</button>
    </div>
  )
}

export default BTN
