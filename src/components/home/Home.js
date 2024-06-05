import React from "react";
import { Link } from "react-router-dom";
import Container from "../container/Container";
import backgroundImage from "../../assets/images/background.jpg"; // Updated path
import Healthcare from "../../assets/svg/HealthCare";
import Aurveda from "../../assets/svg/Aurveda";
import FirstAid from "../../assets/svg/FirstAid";
import Surgical from "../../assets/svg/Surgical";

const Home = () => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    height: "80vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  return (
    <>
      <Container
        className="flex flex-col justify-center"
        style={backgroundStyle}
      >
        <section className="montserrat-600 text-black -ml-36">
          <div className="text-4xl">
            Unified Healthcare, Every{" "}
            <span className="text-orange-500 underline">Medicine</span>
          </div>
          <div className="text-xl w-8/12 montserrat-600 p-2 text-white">
            Your trusted source for all types of medications and general
            healthcare products, delivered right to your doorstep*.
          </div>
        </section>
      </Container>
      <Container id="products" className="h-[80vh] mt-10">
        <div className="text-center flex flex-col montserrat-600 justify-center text-4xl text-orange-500">
          Product Range
        </div>
        <div className="flex gap-10 mt-10">
          <div className="basis-1/4 flex justify-center shadow-2xl rounded-3xl p-5">
            <div className="">
              <div>
                <Healthcare />
              </div>
              <center className="text-2xl navItems_700 mt-2 text-orange-500">
                Helthcare
              </center>
            </div>
          </div>
          <div className="basis-1/4 flex justify-center shadow-2xl rounded-3xl p-5">
            <div>
              <div>
                <Aurveda />
              </div>
              <center className="text-2xl navItems_700 mt-2 text-orange-500">
                Aurveda
              </center>
            </div>
          </div>
          <div className="basis-1/4 flex justify-center shadow-2xl rounded-3xl p-5">
            <div>
              <div>
                <FirstAid />
              </div>
              <center className="text-2xl navItems_700 mt-2 text-orange-500">
                First Aid
              </center>
            </div>
          </div>
          <div className="basis-1/4 flex justify-center shadow-2xl rounded-3xl p-5">
            <div>
              <div>
                <Surgical />
              </div>
              <center className="text-2xl navItems_700 mt-2 text-orange-500">
                Surgical
              </center>
            </div>
          </div>
        </div>
        <div className="flex gap-10 mt-10">
          <div className="basis-1/4 flex justify-center shadow-2xl rounded-3xl p-5">
            <div className="">
              <div>
                <Healthcare />
              </div>
              <center className="text-2xl navItems_700 mt-2 text-orange-500">
                Helthcare
              </center>
            </div>
          </div>
          <div className="basis-1/4 flex justify-center shadow-2xl rounded-3xl p-5">
            <div>
              <div>
                <Aurveda />
              </div>
              <center className="text-2xl navItems_700 mt-2 text-orange-500">
                Aurveda
              </center>
            </div>
          </div>
          <div className="basis-1/4 flex justify-center shadow-2xl rounded-3xl p-5">
            <div>
              <div>
                <FirstAid />
              </div>
              <center className="text-2xl navItems_700 mt-2 text-orange-500">
                First Aid
              </center>
            </div>
          </div>
          <div className="basis-1/4 flex justify-center shadow-2xl rounded-3xl p-5">
            <div>
              <div>
                <Surgical />
              </div>
              <center className="text-2xl navItems_700 mt-2 text-orange-500">
                Surgical
              </center>
            </div>
          </div>
        </div>
      </Container>
      <Container id="offers" className="h-[80vh]">
        <div className="text-center  flex flex-col justify-center text-6xl">
          Offers
        </div>
      </Container>
      <Container id="store-and-dealershil" className="h-[80vh]">
        <div className="text-center  flex flex-col justify-center text-6xl">
          Store & Dealership
        </div>
      </Container>
      <Container id="whatsapp-connect" className="h-[80vh]">
        <div className="text-center  flex flex-col justify-center text-6xl">
          WhatsApp Connect
        </div>
      </Container>
      <Container id="smg" className="h-[80vh]">
        <div className="text-center  flex flex-col justify-center text-6xl">
          SMG{" "}
        </div>
      </Container>
    </>
  );
};

export default Home;
