import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
// import Select from "react-select/dist/declarations/src/Select";
import makeAnimated from "react-select/animated";
import Select from "react-select";

const Prescription = ({ userId, closeModal }) => {
  const [isForUpdate, setisForUpdate] = useState(false);
  const [medList, setmedList] = useState([]);
  const [customer, setCustomer] = useState();
  const animatedComponents = makeAnimated();
  const [customerMeds, setcustomerMeds] = useState([]);

  const medRef = collection(db, "medicine");
  const docRef = doc(db, "customers", String(userId)); // userId is the document ID
  const q = query(medRef, where("userId", "==", userId));
  const [selectedMed, setSelectedMed] = useState([]);

  const handleMedicineSelectChange = (selectedOptions) => {
    setSelectedMed(selectedOptions);

    const selectedMedValues = selectedOptions.map((med) => ({
      id: med.value,
      medicineName: med.label,
    }));
    setcustomerMeds(selectedMedValues);
  };

  useEffect(() => {
    // This effect will run whenever 'customer' changes
    console.log(customer);
  }, [customer]);

  const updateUserMedInDatabase = async () => {
    try {
      await updateDoc(docRef, { userMed: selectedMed });
      console.log("UserMed updated in the database");
      closeModal();
    } catch (error) {
      console.error("Error updating userMed in the database", error);
    }
  };

  useEffect(() => {
    const getCustomer = async () => {
      try {
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const customerData = { id: docSnapshot.id, data: docSnapshot.data() };
          console.log("medss");
          setCustomer(customerData);
          console.log(customerData);
          console.log(customerData.data.userMed);
          setSelectedMed(
            customerData?.data?.userMed.map((med) => ({
              value: med.value,
              label: med.label,
            }))
          );
        } else {
          console.log("No Customer found");
        }
      } catch (error) {
        console.error("Error fetching customer data", error);
      }
    };
    console.log("selectedMeds OF USer");
    console.log(selectedMed);

    getCustomer();
  }, [userId]);

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

  const formattedMedList = medList.map((med) => ({
    value: med.id,
    label: med.medicineName,
    isSelected: customerMeds.some((selected) => selected.id === med.id),
    // Include other properties if needed
  }));

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
        <div className="bg-white  rounded-lg z-20 pb-5 px-5 ">
          <div
            className="text-end py-3 text-red-500 cursor-pointer"
            onClick={closeModal}
          >
            Close
          </div>
          <div className="flex justify-between pb-3 border-b gap-3">
            <div
              className="text-sky-500 cursor-pointer"
              onClick={() => {
                setisForUpdate(false);
              }}
            >
              Medicines
            </div>
            <div
              className="text-sky-500 cursor-pointer"
              onClick={() => {
                setisForUpdate(true);
              }}
            >
              Update Medicine
            </div>
          </div>

          {isForUpdate ? (
            <>
              <div className="mb-5 lg:w-96 w-80">
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
              <div className="border-blue-500 border-2 bg-sky-200 rounded-xl w-full p-2 text-center">
                <button onClick={updateUserMedInDatabase}>
                  Update Medicines
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="lg:w-96 w-80">
                <div className="text-center border-b">Medicines</div>
                <div className="gap-1 flex flex-col text-center">
                  {customer?.data?.userMed?.length > 0 ? (
                    customer?.data?.userMed?.map((item) => (
                      <div
                        key={item.id}
                        className="odd:bg-slate-100 even:bg-gray-200"
                      >
                        {item.label}
                      </div>
                    ))
                  ) : (
                    <div>No medicine available !</div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prescription;
