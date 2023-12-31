import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { FaRegMoneyBill1 } from 'react-icons/fa6';
import { IoPersonAddOutline } from "react-icons/io5";
import CreateNewCustomer from './CreateNewCustomer';


const QuickBar = () => {
    const [newCustomerModel, setnewCustomerModel] = useState(false)
    const handleClick = () => {
        setnewCustomerModel(false); // Close the modal when clicked outside
      };
    return (<>
        <div className='flex flex-row text-center'>
            <div className="basis-1/2 mx-10 relative">
                <input
                    type='text'
                    className='border-black border-2 rounded-xl w-full p-2 pl-8 text-center'
                    placeholder='Search Customer By Mobile Number Or Name'
                />
                <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
            </div>
            <div className="basis-1/4 mx-10 relative">
                <button className='border-blue-500 border-2 bg-sky-200 rounded-xl w-full p-2 text-center'>
                    <FaRegMoneyBill1 className="inline-block mr-2" />
                    Quick Bill
                </button>
            </div>
            <div className="basis-1/4 mx-10 relative">
                <button className='border-blue-500 border-2 bg-sky-200 rounded-xl w-full p-2 text-center' onClick={()=>{setnewCustomerModel(true)}}>
                    <IoPersonAddOutline className="inline-block mr-2" />
                    Add New Customer
                </button>
            </div>
        </div>
        {newCustomerModel && <CreateNewCustomer onClick={handleClick}/>}
    </>
    )
}

export default QuickBar