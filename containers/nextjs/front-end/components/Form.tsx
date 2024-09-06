// Your component
"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const Form = (submit: any) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [file, setFile] = useState("");
  const [emoji, setEmoji] = useState("null");
  const [backgroundE, setBackground] = useState(false);
  const [backgroundM, setBackgroundM] = useState(false);
  const [backgroundB, setBackgroundB] = useState(false);

  const experienceRating = [
    {
      id: 1,
      icon: "/fun_face.svg",
      text: "Excellent",
    },
    {
      id: 2,
      icon: "/regular_face.svg",
      text: "Good",
    },
    {
      id: 3,
      icon: "/sad_face.svg",
      text: "Weak",
    },
  ];

  const progressCheck = [
    {
      id: 1,
      text: "In Progress",
    },
    {
      id: 2,
      text: "Finished",
    },
  ];

  const contractType = [
    {
      id: 1,
      text: "Internship",
    },
    {
      id: 2,
      text: "CDD",
    },
    {
      id: 3,
      text: "CDI",
    },
    {
      id: 4,
      text: "Freelance",
    },
  ];

  const workLocation = [
    {
      id: 1,
      text: "Remote",
    },
    {
      id: 2,
      text: "On-Site",
    },
    {
      id: 3,
      text: "Hybrid",
    },
  ];

  useEffect(() => {
    const checkTrueState = () => {
      if (backgroundE === true) {
        setEmoji("/fun_face.svg");
      } else if (backgroundM === true) {
        setEmoji("/regular_face.svg");
      } else if (backgroundB === true) {
        setEmoji("/sad_face.svg");
      } else {
        setEmoji("/fun_face.svg");
      }
    };
    checkTrueState();
  }, [backgroundB, backgroundE, backgroundM]);
  const [formData, setFormData] = useState({
    companyName: "",
    situation: "",
    jobPosition: "",
    linkedinUrl: "",
    moroccanCities: "",
    workLocation: "",
    feedback: "",
    contracttype: "",
    emojistatus: "",
    image: "",
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    // Use checked for checkbox, otherwise use the value
    const inputValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    console.log("file", file);
    setFile(file);
  };

  const handleupload = async (id: any) => {
    const formData = new FormData();
    formData.append("image", file);

    if (formData) {
      try {
        const response = await axios.post(
          `http://localhost:8000/42/upload/?id=${id}`,
          formData
        );

        if (response) {
          console.log("Image uploaded successfully");
        } else {
          console.error("Failed to upload image");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };
  const routeur = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const form = new FormData();
    form.append("companyName", formData.companyName);
    // ... append other form fields
    form.append("image", formData.image);

    try {
      // ... your fetch logic
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    // Check if companyName is empty
    if (
      formData.companyName.trim() === "" ||
      formData.jobPosition.trim() === "" ||
      formData.moroccanCities.trim() === "" ||
      formData.workLocation.trim() === "" ||
      formData.contracttype.trim() === ""
    ) {
      // Display an error message, prevent submission, or take any other action
      console.error("Company Name is required");
      notify();

      return;
    }

    e.preventDefault();

    // Create an object with all the form data
    const formDataObject = {
      companyName: formData.companyName,
      situation: formData.situation,
      jobPosition: formData.jobPosition,
      linkedinUrl: formData.linkedinUrl,
      moroccanCities: formData.moroccanCities,
      workLocation: formData.workLocation,
      feedback: formData.feedback,
      contracttype: formData.contracttype,
      image: formData.image,
      emojistatus: emoji,
    };

    var response;
    const CreatCompnys = async () => {
      try {
        const token = Cookies.get("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        response = await axios.post(
          `http://localhost:8000/42/companys/`,
          formDataObject,
          { headers }
        );
        toast.success(" Created ... ", {
          position: "top-center",
        });

        handleupload(response.data);

        routeur.push(`/Engagement?id=${response.data}`);
      } catch (error) {
        routeur.push("/login");
        console.error("Error fetching data:", error);
      }
    };
    CreatCompnys();
    closeModal();
  };

  const workLocations = [
    "Remote",
    "On-site",
    "Hybird",
    // Add more options as needed
  ];
  const moroccanCities = [
    "Casablanca",
    "Rabat",
    "Marrakech",
    "Fes",
    "Agadir",
    "Benguerir",
    "Khouribga",
    "Safi",
    "Tanger",
    // Add more cities as needed
  ];
  const jobPosition = [
    "Internship",
    "CDD",
    "CDI",
    "Freelance",
    // Add more job positions as needed
  ];

  const customStyle = {
    // backgroundImage: 'url("/form.png")',
    backgroundSize: "cover",
  };

  const notify = () => {
    toast.error(" Please Fill Required Inputs !", {
      position: "top-center",
    });
  };
  return (
    <div className="flex justify-center items-center max-w-full  text-white rounded-md bg-blue-700 cursor-pointer">
      <button
        onClick={openModal}
        className="flex items-center justify-center w-[250px] p-1 whitespace-nowrap"
      >
        <Image src="/plus.png" alt="" width={50} height={30} />
        <span className="ml-2">Share your Experience</span>
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(12px)",
          },
        }}
        className="w-max h-max mx-auto mt-16"
      >
        <form
          onSubmit={handleSubmit}
          className="flex items-center flex-col m-5 w-max h-max bg-[white] border-2 border-quaternary rounded-xl p-7"
        >
          <div className="font-bold mb-2 py-2 px-16 rounded-lg w-full text-xl text-primary border-2 border-primary">
            Share Your Experience
          </div>
          <div className="w-full flex flex-col items-center rounded-md pt-5 gap-5">
            <label className="flex flex-col w-full items-center">
              <div className="font-semibold w-[95%]">Company Name:</div>
              <input
                type="text"
                color="#00224D"
                name="companyName"
                value={formData.companyName}
                placeholder="Company Name"
                className="border border-quaternary rounded-md w-[95%] h-9 pl-3"
                onChange={handleInputChange}
                required
              />
            </label>
            <label className="flex flex-col w-full items-center">
              <div className="font-semibold w-[95%]">Job Status:</div>
              <input
                type="text"
                color="#00224D"
                name="jobPosition"
                value={formData.jobPosition}
                placeholder="Job Status"
                className="border border-quaternary rounded-md w-[95%] h-9 pl-3"
                onChange={handleInputChange}
                required
              />
            </label>
            <div className="flex flex-col w-full items-center">
              <div className="font-semibold w-[95%]">
                How You Rate Your Experience In This Company?
              </div>
              <div className="flex w-[95%] items-center gap-1 justify-between">
                {experienceRating.map((ex) => {
                  return (
                    <button
                      key={ex.id}
                      className={`flex justify-center items-center border rounded-md h-9 border-quaternary w-[33.3%]`}
                    >
                      <div className="h-5">
                        <Image
                          src={ex.icon}
                          alt={ex.icon}
                          width={30}
                          height={10}
                          className="h-full"
                        />
                      </div>
                      <p className="font-normal">{ex.text}</p>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col w-full items-center">
              <div className="font-semibold w-[95%]">Your Experience:</div>
              <div className="flex w-[95%] items-center gap-1 justify-between">
                {progressCheck.map((progressCheckItem) => {
                  return (
                    <button
                      key={progressCheckItem.id}
                      className={`flex justify-center items-center border rounded-md h-9 border-quaternary w-[49%]`}
                    >
                      <p className="font-normal">{progressCheckItem.text}</p>
                    </button>
                  );
                })}
              </div>
            </div>
            <label className="flex flex-col w-full items-center">
              <div className="font-semibold w-[95%]">Company Location:</div>
              <input
                type="text"
                color="#00224D"
                name="companyName"
                value={formData.companyName}
                placeholder="Search"
                className="border border-quaternary rounded-md w-[95%] h-9 pl-3"
                onChange={handleInputChange}
                required
              />
            </label>
            <div className="flex flex-col w-full items-center">
              <div className="font-semibold w-[95%]">Contract Type:</div>
              <div className="flex w-[95%] items-center gap-1 justify-between">
                {contractType.map((contractTypeItem) => {
                  return (
                    <button
                      key={contractTypeItem.id}
                      className={`flex justify-center items-center border rounded-md h-9 border-quaternary w-[49%]`}
                    >
                      <p className="font-normal">{contractTypeItem.text}</p>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col w-full items-center">
              <div className="font-semibold w-[95%]">Work Location:</div>
              <div className="flex w-[95%] items-center gap-1 justify-between">
                {workLocation.map((workLocationItem) => {
                  return (
                    <button
                      key={workLocationItem.id}
                      className={`flex justify-center items-center border rounded-md h-9 border-quaternary w-[49%]`}
                    >
                      <p className="font-normal">{workLocationItem.text}</p>
                    </button>
                  );
                })}
              </div>
            </div>
            <label className="flex flex-col w-full items-center">
              <div className="font-semibold w-[95%]">LinkedIn of Company:</div>
              <input
                type="text"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleInputChange}
                className="border border-quaternary rounded-md p-1 w-[95%]"
                placeholder="LinkedIn of Company"
              />
            </label>

            <div className="flex flex-col w-full items-center">
              <p className="font-semibold w-[95%]">
                Your Feedback
                <span className="font-normal w-full">(Optional)</span>:
              </p>
              <div className="h-[150px] w-[95%]">
                <textarea
                  id="feedback"
                  onChange={handleInputChange}
                  placeholder="Write your Feedback"
                  name="feedback"
                  className="w-full h-full box-border overflow-y-scroll rounded-md p-3 border-2 border-[#00224D]"
                ></textarea>
              </div>
            </div>
            <label className="flex flex-col w-[95%]">
              <div className="font-semibold">Company Image:</div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file:border-none file:bg-quaternary file:text-white file:rounded-md w-[70%] mx-auto"
              />
            </label>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-[#FF204E] text-white px-4 py-2 rounded-md font-semibold w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Form;
