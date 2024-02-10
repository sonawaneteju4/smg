import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import Swal from "sweetalert2";

const AddMediciens = () => {
  const [medicine, setmedicine] = useState("");
  const [medList, setmedList] = useState([]);
  const medRef = collection(db, "medicine");
  const checkIsUnique = async () => {
    const q = query(
      medRef,
      where("medicineName", "==", medicine.toLowerCase())
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  };

  const AddNewMedicine = async (e) => {
    e.preventDefault();
    try {
      const isUnique = await checkIsUnique();
      if (medicine !== "") {
        if (isUnique) {
          const AddMed = await addDoc(medRef, {
            medicineName: medicine.toLowerCase(),
          });
          showPopAlert({
            title: `${medicine} Added successfully`,
            icon: "success",
          });
          console.log("Credit Bill added successfully:", AddMed);
          setmedicine("");
        } else {
          showPopAlert({
            title: `${medicine} Already Exist`,
            icon: "error",
          });
        }
      } else {
        showPopAlert({
          title: "Add Something",
          icon: "error",
        });
      }
      // If you want to do something after adding the bill, you can place it here
    } catch (error) {
      console.error("Error adding credit bill:", error);
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
  }, [medicine]);

  return (
    <>
      {" "}
      <div className="lg:mx-96 md:mx-16 mx-5">
        <form onSubmit={AddNewMedicine}>
          <div className="mt-5">
            <input
              type="text"
              id="medicineName"
              value={medicine}
              onChange={(e) => {
                setmedicine(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Medicine Name"
              required
            />
          </div>
          <div
            className="mt-2 flex
        justify-center"
          >
            <button
              type="submit"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Add Medicine
            </button>
          </div>
        </form>
      </div>
      <hr />
      <div className="grid lg:grid-cols-5 grid-cols-2 gap-3 justify-center lg:mx-16 mx-2 mt-5">
        {medList.map((item) => (
          <div key={item.id} className="flex justify-center">
            <button className="bg-green-200/80 lg:px-4 px-2 border-2 border-black rounded-2xl pointer-events-none">
              {item.medicineName.charAt(0).toUpperCase() + item.medicineName.slice(1).toLowerCase()}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default AddMediciens;
