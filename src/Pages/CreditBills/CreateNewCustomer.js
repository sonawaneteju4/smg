import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Swal from "sweetalert2";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const CreateNewCustomer = ({ onClick }) => {
  const [customerData, setcustomerData] = useState({
    cName: "",
    cPhone: 0,
    village: "",
    pageNo: Number,
    cType: "",
    userMed: [],
  });
  const animatedComponents = makeAnimated();
  

  const [dueBal, setdueBal] = useState("");
  const [medOptions, setMedOptions] = useState([]);

  const usersCollectionRef = collection(db, "customers");
  const creditDockRef = collection(db, "creditBill");
  const [selectedMed, setSelectedMed] = useState([]);

  const handleMedicineSelectChange = (selectedOptions) => {
    // Update selectedMed directly
    setSelectedMed(selectedOptions);

    // Extract values from selectedMed and update userMed
    const selectedMedValues = selectedOptions.map((med) => ({
      id: med.value,
      medicineName: med.label,
      // Add other properties as needed
    }));

    // Update userMed directly
    setcustomerData((prevData) => ({
      ...prevData,
      userMed: selectedMedValues,
    }));
    console.log(customerData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the field is 'cPhone', convert the value to a number
    const updatedValue =
      name === "cPhone" || name === "pageNo" ? +value : value;

    setcustomerData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
    console.log(customerData);
  };
  const checkUniquePhone = async () => {
    const q = query(
      usersCollectionRef,
      where("cPhone", "==", customerData.cPhone) &&
        where("pageNo", "==", customerData.pageNo)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  };

  const handleData = async (e) => {
    e.preventDefault();
    try {
      // Check if cPhone is unique
      const isUnique = await checkUniquePhone();
      if (isUnique) {
        // Add a new customer

        const docRef = await addDoc(usersCollectionRef, customerData);
        console.log(customerData);
        console.log("Document written with ID:", docRef.id);
        const AddCreditBill = await addDoc(creditDockRef, {
          dueBal: dueBal,
          userId: docRef.id,
          transactionType: "credit",
          date: serverTimestamp(),
        });
        console.log(AddCreditBill);
        showPopAlert({
          title: "Customer added successfully!",
          icon: "success",
        });
        onClick();
        window.location.reload();
      } else {
        showPopAlert({
          title: "Error: Customer Phone Or Page is not unique.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  function showPopAlert({ title, icon }) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: icon,
      title: title,
    });
  }

  const medRef = collection(db, "medicine");
  const [medList, setmedList] = useState([]);
  useEffect(() => {
    const GetMedicineList = async () => {
      try {
        const querySnapshot = await getDocs(medRef);

        const medArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setmedList(medArray);
        console.log(medArray);
      } catch (error) {
        console.log(error);
      }
    };
    GetMedicineList();
  }, []);

  const formattedMedList = medList.map((med) => ({
    value: med.id,
    label: med.medicineName,
    isSelected: selectedMed.some((selected) => selected.value === med.id),
    // Include other properties if needed
  }));
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <form
        className="flex items-center justify-center min-h-screen"
        onSubmit={handleData}
      >
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
        <div className="bg-white rounded-lg z-20">
          <div className="flex justify-between items-center p-5 bg-sky-200 rounded-t-lg">
            <div className="">Create New Customer</div>
            <div className="">
              <button
                type="cancle"
                onClick={onClick}
                className="text-red-500 hover:text-red-700"
              >
                Close
              </button>
            </div>
          </div>

          <div className="w-96 m-2 px-5">
            {/* Customer Name */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="cName"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={handleChange}
                required
              />
              <label
                for="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Customer Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="cPhone"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={handleChange}
                required
              />
              <label
                for="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Mobile Number
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="dueBal"
                value={dueBal}
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-red-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={(e) => setdueBal(parseInt(e.target.value, 10))}
                required
              />
              <label
                for="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Opning Balance
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="village"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={handleChange}
                required
              />
              <label
                for="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Village{" "}
              </label>
            </div>
            <div className="flex flex-row">
              <div className="basis-1/2 mr-2">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="number"
                    name="pageNo"
                    id="floating_email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={handleChange}
                    required
                  />
                  <label
                    for="floating_email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Page Number
                  </label>
                </div>
              </div>
              <div className="basis-1/2 mr-2">
                <div className="relative z-0 w-full mb-5 group">
                  <select
                    name="cType"
                    value={customerData.cType}
                    onChange={handleChange}
                    id="customer_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required
                  >
                    <option value="" disabled selected>
                      Select Customer Type
                    </option>
                    <option className="family" value="family">
                      Customer Family
                    </option>
                    <option className="genral" value="genral">
                      Customer Genral SMS
                    </option>
                    <option className="basic" value="basic">
                      Customer Notify SMS
                    </option>
                  </select>
                  <label
                    for="customer_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Customer Type
                  </label>
                </div>
              </div>
            </div>
            <div>
              {/* Typeahead for medicines */}
              <div className="mb-5">
                <label
                  htmlFor="medicineSelect"
                  className="text-sm text-gray-500"
                >
                  Select Medicine
                </label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={formattedMedList}
                  value={selectedMed}
                  onChange={handleMedicineSelectChange}
                  placeholder="Search and select medicine"
                />
              </div>
            </div>
          </div>
          <hr className="border"></hr>

          <div className="my-2 mx-5">
            <button
              type="submit"
              className="border-blue-500 border-2 bg-sky-200 rounded-xl w-full p-2 text-center"
              // onClick={handleData}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNewCustomer;
