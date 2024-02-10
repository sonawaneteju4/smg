import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Due from "./Due";
import Prescription from "./Prescription";
import NewEntry from "../CreditBills/NewEntry";

const CustomerInfo = () => {
  const [customer, setcustomer] = useState([]);
  const [prescriptionModalOpen, setPrescriptionModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [newEntry, setnewEntry] = useState(false);

  const DataRef = collection(db, "customers");
  useEffect(() => {
    // Retrieve all customers
    const getAllCustomers = async () => {
      try {
        const querySnapshot = await getDocs(DataRef);
        const customersArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setcustomer(customersArray);
        console.log(customersArray);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    // Call the function
    getAllCustomers();
    console.log(customer);
    // eslint-disable-next-line
  }, []);
  const openPrescriptionModal = (userId) => {
    setSelectedUserId(userId);
    setPrescriptionModalOpen(true);
  };
  const closePrescriptionModal = () => {
    setPrescriptionModalOpen(false);
  };
  const openNewEntry = (userId) => {
    setSelectedUserId(userId);
    setnewEntry(true);
  };
  const closeNewEntry = () => {
    setnewEntry(false);
  };
  return (
    <>
      {customer.map((items) => (
        <div
          key={items.id}
          className="w-full bg-slate-400/10 rounded-xl lg:flex justify-between sm:block my-2 px-5 lg:py-0 py-5 "
          // style={{ pointerEvents: "none" }}
        >
          {/* Customer Info */}
          <div className="lg:my-3 sm:my-0 flex sm:block justify-center">
            <div className="flex items-center">
              <div className="px-2">
                <CiUser />
              </div>
              <div className="font-bold lg:text-base md:text-base text-sm">
                {items.cName}
                <small className="font-light px-2">{items.village}</small>
              </div>
            </div>
            <div className="flex items-center my-3 ">
              <div className="px-2 ">
                {" "}
                <CiPhone />
              </div>
              <div className="font-bold lg:text-base sm:text-sm">
                {items.cPhone}
              </div>
            </div>
          </div>
          {/* Due & Bill Button */}
          <div>
            <div className="text-center lg:my-3 sm:my-0 font-bold ">
              Rs :{" "}
              <span className="text-red-500 text-xl">
                <Due userId={items.id} />
              </span>
            </div>
            <div className="flex my-2 justify-center">
              <div className="mx-1">
                <button
                  className="border-blue-500 border-2 bg-sky-200 rounded-xl w-full p-1 px-2 text-center text-sm"
                  onClick={() => openNewEntry(items.id)}
                >
                  New Entry
                </button>
              </div>
              <div className="mx-1">
                <button
                  className="border-blue-500 border-2 bg-lime-200 rounded-xl w-full p-1 px-2 text-center text-sm"
                  onClick={() => openPrescriptionModal(items.id)}
                >
                  Prescription
                </button>
              </div>
              <div className="mx-1">
                <button
                  className="border-blue-500 border-2 bg-sky-200 rounded-xl w-full p-1 px-2 text-center text-sm"
                  onClick={() => openPrescriptionModal(items.id)}
                >
                  Update User
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {prescriptionModalOpen && (
        <Prescription
          isOpen={prescriptionModalOpen}
          closeModal={closePrescriptionModal}
          userId={selectedUserId}
        />
      )}
      {newEntry && (
        <NewEntry
          isOpen={openNewEntry}
          closeModal={closeNewEntry}
          userId={selectedUserId}
        />
      )}
    </>
  );
};

export default CustomerInfo;
