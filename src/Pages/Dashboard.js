import React from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import QuickBar from "./CreditBills/QuickBar";
import CustomerInfo from "./Components/CustomerInfo";
import Button from "../components/button/Button";
import { IoPeopleSharp } from "react-icons/io5";
import { BiTransferAlt } from "react-icons/bi";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { LineChart } from "@mui/x-charts/LineChart";

const chartSetting = {
  width: 600,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(20px, 0)",
    },
  },
};
const randomValue = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const financialDataset = [
  {
    month: "Jan",
    due: randomValue(1000, 5000),
    repayment: randomValue(500, 4500),
  },
  {
    month: "Feb",
    due: randomValue(1000, 5000),
    repayment: randomValue(500, 4500),
  },
  {
    month: "Mar",
    due: randomValue(1000, 5000),
    repayment: randomValue(500, 4500),
  },
  {
    month: "Apr",
    due: randomValue(1000, 5000),
    repayment: randomValue(500, 4500),
  },
  {
    month: "May",
    due: randomValue(1000, 5000),
    repayment: randomValue(500, 4500),
  },
  {
    month: "June",
    due: randomValue(1000, 5000),
    repayment: randomValue(500, 4500),
  },
  {
    month: "July",
    due: randomValue(1000, 5000),
    repayment: randomValue(500, 4500),
  },
  {
    month: "Aug",
    due: randomValue(1000, 5000),
    repayment: randomValue(500, 4500),
  },
  {
    month: "Sept",
    due: randomValue(1000, 5000),
    repayment: randomValue(500, 4500),
  },
  {
    month: "Oct",
    due: randomValue(1000, 5000),
    repayment: randomValue(500, 4500),
  },
  {
    month: "Nov",
    due: randomValue(1000, 5000),
    repayment: randomValue(500, 4500),
  },
  {
    month: "Dec",
    due: randomValue(1000, 5000),
    repayment: randomValue(500, 4500),
  },
];

console.log(financialDataset);
const valueFormatter = (value) => `Rs: ${value}`;

const Dashboard = () => {
  const navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/");
    }
  });

  return (
    <>
      <div className="flex justify-center items-center border-b">
        <div className="px-10 my-3 border-r">
          <div className=" w-[500px] ">
            <div className="relative  flex w-full flex-wrap items-stretch">
              <input
                type="search"
                className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-orange-500 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none "
                placeholder="Search Customer"
                aria-label="Search"
                aria-describedby="button-addon2"
              />

              {/* <!--Search icon--> */}
              <span
                className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 hover:text-orange-500"
                id="basic-addon2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* <div className="m-5">
        <QuickBar />
      </div>
      <hr />
      <div className="mx-5">
        <CustomerInfo />
      </div> */}
        </div>
        <div className="mx-10 border-r px-10">
          <Button name="Customers" icon=<IoPeopleSharp /> />
        </div>
        <div>
          <Button name="Transactions" icon=<BiTransferAlt /> />
        </div>
      </div>

      <section className="flex">
        <div className="w-min m-5 shadow-2xl shadow-black/60 rounded-xl basis-1/2">
          <div className=" text-center navItems_700 text-2xl">Billings</div>
          <BarChart
            className=""
            dataset={financialDataset}
            xAxis={[{ scaleType: "band", dataKey: "month" }]}
            series={[
              { dataKey: "due", label: "Due", color: "red", valueFormatter },
              {
                dataKey: "repayment",
                label: "Repayment",
                color: "#478C5C",
                valueFormatter,
              },
            ]}
            {...chartSetting}
          />
        </div>
        <div className="w-min m-5 shadow-2xl shadow-black/60 rounded-xl basis-1/2 ">
          <div className=" text-center navItems_700 text-2xl">Sales</div>

          <LineChart
            className=""
            xAxis={[{ data: [1, 2, 3, 5, 8, 10, 11, 12] }]}
            series={[
              {
                data: [
                  80000, 50050, 120000, 85000, 138900, 91000, 120000, 100000,
                ],
              },
            ]}
            width={600}
            height={400}
          />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
