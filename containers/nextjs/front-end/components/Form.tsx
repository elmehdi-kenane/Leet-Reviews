// Your component
"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { set } from "date-fns";

const Form = (submit: any) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [file, setFile] = useState("");
  const [emoji, setEmoji] = useState("");
  const [experienceRatingState, setExperienceRatingState] = useState("");
  const [progressCheckState, setProgressCheckState] = useState("");
  const [contractTypeState, setContractTypeState] = useState("");
  const [workLocationState, setWorkLocationState] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    situation: "",
    jobPosition: "",
    linkedinUrl: "",
    moroccanCities: "casablanca",
    workLocation: "",
    feedback: "",
    contracttype: "",
    emojistatus: "",
    image: "",
  });

  const experienceRating = [
    {
      id: 1,
      icon: "/fun_face.svg",
      lightIcon: "/fun_face_light.svg",
      text: "Excellent",
    },
    {
      id: 2,
      icon: "/regular_face.svg",
      lightIcon: "/regular_face_light.svg",
      text: "Good",
    },
    {
      id: 3,
      icon: "/sad_face.svg",
      lightIcon: "/sad_face_light.svg",
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

  //   useEffect(() => {
  //     const updateExperienceRating = () => {
  //       if (experienceRatingState === experienceRating[0].text)
  //         setEmoji("/fun_face.svg");
  //       else if (experienceRatingState === experienceRating[1].text)
  //         setEmoji("/regular_face.svg");
  //       else if (experienceRatingState === experienceRating[2].text)
  //         setEmoji("/sad_face.svg");
  //     };
  //     updateExperienceRating();
  //     const updateProgressCheck = () => {
  //       if (progressCheckState === progressCheck[0].text) setEmoji("/fun_face.svg");
  //       else if (progressCheckState === progressCheck[0].text)
  //         setEmoji("/regular_face.svg");
  //     };
  //     updateProgressCheck();
  //   }, [experienceRatingState, progressCheckState]);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handleFormChange = (element: string, newValue: string | File) => {
    console.log("element", element);
    console.log("newValue", newValue);

    setFormData((prevData) => ({
      ...prevData,
      [element]: newValue,
    }));
  };

  //   const handleInputChange = (e: any) => {
  //     console.log("...handleInputChange...");

  //     const { name, value, type, checked } = e.target;

  //     // Use checked for checkbox, otherwise use the value
  //     const inputValue = type === "checkbox" ? checked : value;

  //     console.log("name", name);
  //     console.log("value", value);
  //     console.log("type", type);
  //     console.log("inputValue", inputValue);

  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [name]: inputValue,
  //     }));
  //   };

  //   const handleImageChange = (e: any) => {
  //     const file = e.target.files[0];
  //     console.log("file", file);
  //     setFile(file);
  //   };

  useEffect(() => {
    if (modalIsOpen) {
      // Disable scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling
      document.body.style.overflow = "auto";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalIsOpen]);
  const handleClickOutside = (event: any) => {
    if (formRef && formRef.current && !formRef.current.contains(event.target)) {
      setModalIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleupload = async (id: any) => {
    const companyLogoFile = new FormData();
    companyLogoFile.append("image", formData.image);

    if (formData) {
      try {
        const response = await axios.post(
          `http://localhost:8000/42/upload/?id=${id}`,
          companyLogoFile
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
      console.log("formData.companyName   -   ", formData.companyName);
      console.log("formData.situation   -   ", formData.situation);
      console.log("formData.jobPosition   -   ", formData.jobPosition);
      console.log("formData.linkedinUrl   -   ", formData.linkedinUrl);
      console.log("formData.moroccanCities   -   ", formData.moroccanCities);
      console.log("formData.workLocation   -   ", formData.workLocation);
      console.log("formData.feedback   -   ", formData.feedback);
      console.log("formData.contracttype   -   ", formData.contracttype);
      console.log("formData.image   -   ", formData.image);
      console.log("emojistatus   -   ", formData.emojistatus);

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
      emojistatus: formData.emojistatus,
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
        console.log(response.data);
        
        handleupload(response.data);

        routeur.push(`/Engagement?id=${response.data}`);
      } catch (error) {
        routeur.push("/login");
        console.error("Error fetching data:", error);
      }
    };
    CreatCompnys();
    toggleModal();
  };

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
        onClick={() => {
          toggleModal();
        }}
        className="flex items-center justify-center w-[250px] p-1 whitespace-nowrap"
      >
        <Image src="/plus.png" alt="" width={50} height={30} />
        <span className="ml-2">Share your Experience</span>
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          toggleModal;
        }}
        style={{
          overlay: {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(12px)",
            // position: "relative",
            zIndex: "9",
            overflow: "auto",
          },
        }}
        className="w-full mx-auto mt-[100px] mb-[50px] flex justify-center"
      >
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          className="flex items-center flex-col w-full max-w-[500px] h-max bg-[white] border-2 border-quaternary border-opacity-[0.1] rounded-xl p-7 overflow-y-auto"
        >
          <div className="font-medium mb-2 py-2 px-16 rounded-lg w-full text-lg text-white bg-quaternary text-center">
            Share Your Experience
          </div>
          <div className="w-full flex flex-col items-center rounded-md pt-5 gap-5">
            <label className="flex flex-col w-full items-center">
              <div className="font-semibold w-[95%]">
                Company Name:<span className="text-red-500 text-sm">*</span>
              </div>
              <input
                type="text"
                color="#00224D"
                name="companyName"
                value={formData.companyName}
                placeholder="Company Name"
                className="border border-quaternary rounded-md w-[95%] h-9 pl-3 focus:outline-none focus:border focus:border-primary"
                onChange={(e) => {
                  handleFormChange("companyName", e.target.value);
                }}
                required
              />
            </label>
            <label className="flex flex-col w-full items-center">
              <div className="font-semibold w-[95%]">
                Job Status:<span className="text-red-500 text-sm">*</span>
              </div>
              <input
                type="text"
                color="#00224D"
                name="jobPosition"
                value={formData.jobPosition}
                placeholder="Job Status"
                className="border border-quaternary rounded-md w-[95%] h-9 pl-3 focus:outline-none focus:border focus:border-primary"
                onChange={(e) => {
                  handleFormChange("jobPosition", e.target.value);
                }}
                required
              />
            </label>
            <div className="flex flex-col w-full items-center">
              <div className="font-semibold w-[95%]">
                How You Rate Your Experience In This Company?
                <span className="text-red-500 text-sm">*</span>
              </div>
              <div className="flex w-[95%] items-center gap-1 justify-between">
                {experienceRating.map((ex) => {
                  return (
                    <button
                      key={ex.id}
                      type="button"
                      name="ExperienceRate"
                      value={formData.emojistatus}
                      className={`border border-quaternary w-[100%] flex justify-center items-center gap-[5px] rounded-md h-9 ${
                        experienceRatingState === ex.text
                          ? "bg-quaternary text-white"
                          : ""
                      } border-quaternary w-[33.3%]`}
                      //   onChange={handleInputChange}
                      onClick={(e) => {
                        e.stopPropagation();
                        setExperienceRatingState(ex.text);
                        handleFormChange("emojistatus", ex.icon);
                      }}
                    >
                      <div className="h-5">
                        <Image
                          src={
                            experienceRatingState === ex.text
                              ? ex.lightIcon
                              : ex.icon
                          }
                          alt={
                            experienceRatingState === ex.text
                              ? ex.lightIcon
                              : ex.icon
                          }
                          width={30}
                          height={30}
                          className="h-full w-full"
                        />
                      </div>
                      <p className="font-normal">{ex.text}</p>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col w-full items-center">
              <div className="font-semibold w-[95%]">
                Your Experience:<span className="text-red-500 text-sm">*</span>
              </div>
              <div className="flex w-[95%] items-center gap-1 justify-between">
                {progressCheck.map((progressCheckItem) => {
                  return (
                    <button
                      key={progressCheckItem.id}
                      type="button"
                      name="ExperienceSituation"
                      value={formData.situation}
                      className={`border border-quaternary w-[95%] flex justify-center items-center rounded-md h-9 ${
                        progressCheckState === progressCheckItem.text
                          ? "bg-quaternary text-white"
                          : ""
                      } border-quaternary w-[49%]`}
                      //   onChange={handleInputChange}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFormChange("situation", progressCheckItem.text);
                        setProgressCheckState(progressCheckItem.text);
                      }}
                    >
                      <p className="font-normal">{progressCheckItem.text}</p>
                    </button>
                  );
                })}
              </div>
            </div>
            {/* <label className="flex flex-col w-full items-center">
            <div className="font-semibold w-[95%]">Company Location:</div>
            <input
            type="text"
            color="#00224D"
                name="companyName"
                value={formData.moroccanCities}
                placeholder="Search"
                className="border border-quaternary rounded-md w-[95%] h-9 pl-3"
                // onChange={handleInputChange}
                required
              />
            </label> */}
            <div className="flex flex-col w-full items-center">
              <div className="font-semibold w-[95%]">
                Contract Type:<span className="text-red-500 text-sm">*</span>
              </div>
              <div className="flex w-[95%] items-center gap-1 justify-between">
                {contractType.map((contractTypeItem) => {
                  return (
                    <button
                      key={contractTypeItem.id}
                      type="button"
                      name="companyName"
                      value={formData.contracttype}
                      className={`border border-quaternary w-[95%] flex justify-center items-center rounded-md h-9 ${
                        contractTypeState === contractTypeItem.text
                          ? "bg-quaternary text-white"
                          : ""
                      } border-quaternary w-[49%]`}
                      //   onChange={handleInputChange}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFormChange("contracttype", contractTypeItem.text);
                        setContractTypeState(contractTypeItem.text);
                      }}
                    >
                      <p className="font-normal">{contractTypeItem.text}</p>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col w-full items-center">
              <div className="font-semibold w-[95%]">
                Work Location:<span className="text-red-500 text-sm">*</span>
              </div>
              <div className="flex w-[95%] items-center gap-1 justify-between">
                {workLocation.map((workLocationItem) => {
                  return (
                    <button
                      key={workLocationItem.id}
                      type="button"
                      name="companyName"
                      value={formData.workLocation}
                      className={`border border-quaternary w-[95%] flex justify-center items-center rounded-md h-9 ${
                        workLocationState === workLocationItem.text
                          ? "bg-quaternary text-white"
                          : ""
                      } border-quaternary w-[49%]`}
                      //   onChange={handleInputChange}
                      onClick={() => {
                        handleFormChange("workLocation", workLocationItem.text);
                        setWorkLocationState(workLocationItem.text);
                      }}
                    >
                      <p className="font-normal">{workLocationItem.text}</p>
                    </button>
                  );
                })}
              </div>
            </div>
            <label className="flex flex-col w-full items-center">
              <div className="font-semibold w-[95%]">
                LinkedIn of Company
                <span className="font-normal w-full"> (Optional)</span>:
              </div>
              <input
                type="text"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={(e) => {
                  handleFormChange("linkedinUrl", e.target.value);
                }}
                className="border border-quaternary rounded-md p-1 w-[95%] focus:outline-none focus:border focus:border-primary"
                placeholder="LinkedIn of Company"
              />
            </label>

            <div className="flex flex-col w-full items-center">
              <p className="font-semibold w-[95%]">
                Your Feedback
                <span className="font-normal w-full"> (Optional)</span>:
              </p>
              <div className="h-[150px] w-[95%]">
                <textarea
                  id="feedback"
                  onChange={(e) => {
                    handleFormChange("feedback", e.target.value);
                  }}
                  placeholder="Write your Feedback"
                  name="feedback"
                  className="w-full h-full box-border overflow-y-scroll rounded-md p-3 border border-[#00224D] max-h-[140px] min-h-[50px] focus:outline-none focus:border focus:border-primary"
                ></textarea>
              </div>
            </div>
            <label className="flex flex-col w-[95%]">
              <div className="font-semibold">
                Company Image
                <span className="font-normal w-full"> (Optional)</span>:
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files)
                    handleFormChange("image", e.target.files[0]);
                }}
                className={`file:border-none hover:file:bg-primary file:bg-quaternary file:text-white file:rounded-md w-[70%] mx-auto`}
              />
            </label>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-[#FF204E] text-white hover:bg-white hover:text-primary border-2 border-transparent hover:border-2 hover:border-primary px-4 py-2 rounded-md font-semibold w-[95%]"
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
