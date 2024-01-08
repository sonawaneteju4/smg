import React from 'react'

const CreateNewCustomer = ({ onClick }) => {
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
                <div className="bg-white rounded-lg p-8 z-20">
                    <div className="flex justify-end">
                        <button onClick={onClick} className="text-gray-500 hover:text-gray-700">
                            Close
                        </button>

                    </div>
                    <hr />
                    <div className="mt-4 w-96">
                        <div className=''>
                            <lable className="block text-gray-700 text-sm  ml-3 mb-2" htmlF0r="cName">Customer Name</lable>
                            <input
                                className="shadow rounded-3xl appearance-none border-2 p-1  w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="cName"
                                name="cName"
                                type="cName"
                                placeholder="Enter Your Email"
                                    // value={userCredential.email}
                                    // onChange={onChange}
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNewCustomer