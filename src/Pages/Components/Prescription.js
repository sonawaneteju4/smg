import React, { useState, useEffect } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const Prescription = ({ userId ,closeModal}) => {
  const [medList, setmedList] = useState([]);
  const medRef = collection(db, "medicine");
  const q = query(medRef, where("userId", "==", userId));

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
  }, [userId]);
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" onClick={closeModal}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
        <div className="bg-white rounded-lg z-20 p-10 ">
          <div className="text-center">User Medicines</div>
          <div className="grid lg:grid-cols-5 grid-cols-2 gap-3 justify-center lg:mx-16 mx-2 mt-5">
            {medList.map((item) => (
              <div key={item.id} className="flex justify-center">
                <button className="bg-green-200/80 lg:px-4 px-2 border-2 border-black rounded-2xl pointer-events-none">
                  {item.medicineName.charAt(0).toUpperCase() +
                    item.medicineName.slice(1).toLowerCase()}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prescription;
