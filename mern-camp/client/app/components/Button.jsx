import React from 'react'

const Button = ({className,buttonText,type, ...other}) => {
  return (
    <button type={type} className={`btn button ${className}`} {...other}>{buttonText}</button>
  )
}

export default Button