import React from 'react'

const Input = ({type, label,value,className, id }) => {
  return (
    <div className="relative z-0 w-full mb-5 group">
    <input
      type={type}
      value={value}
      className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${className}`}
      id={id}
    />
      <label
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        htmlFor={id}
      >
        {label}
      </label>
  </div>  )
}

export default Input