"use client";
import Card from "@/components/Card";
import Form from "@/components/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import Skeleton from "react-loading-skeleton";
import { DataFormat } from "@/components/utils";

export default function Home() {
  const [formCompleted, setFormCompleted] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem("searchTerm");
    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
    }


    // Listen for the custom event
    const handleStorageChange = async (event: any) => {
      // Read the 'token' cookie
const tokenCookie = document.cookie
.split('; ')
.find(row => row.startsWith('token='));

// Extract the token value
const token = tokenCookie ? tokenCookie.split('=')[1] : null;

      if (event.detail) {
        setSearchTerm(event.detail);
      } else if (event.detail === "") {
        try {
          const headers = {
            "Content-Type": "application/json", // Adjust the content type as needed
            
          };
          const response = await axios.get(
            "http://localhost:8000/42/getCompanys",
            { headers }
          );
          setData(response.data);
          console.log("response.data", response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        console.log("event detail", event);
      }
    };

    window.addEventListener("searchTermChange", handleStorageChange);

    const sortByNameWithKeyword = () => {
      // If there is a search term, filter and sort the data
      const filteredData = data.filter((item: any) =>
        item.name.includes(searchTerm)
      );
      const sortedData = filteredData.sort((a: any, b: any) =>
        a.name.localeCompare(b.name)
      );
    //   setData(sortedData);
    //   console.log("response.data", sortedData);
    };
    sortByNameWithKeyword();

    return () => {
      // Cleanup the event listener on component unmount
      window.removeEventListener("searchTermChange", handleStorageChange);
    };
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          "Content-Type": "application/json", // Adjust the content type as needed
          
        };
        const response = await axios.get(
          "http://localhost:8000/42/getCompanys",
          { headers }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally {
        setLoading(false); // Set loading to false when API call completes
      }
    };

    fetchData();
  }, [formCompleted]);
  return (
    <main
      className="flex items-center h-full min-h-screen min-w-[280px] max-w-[1440px] mt-10 mx-auto p-1 flex-col bg-[#F1F3F5]"
      style={{ backgroundImage: "url('/backk.jpg')" }}
    >
      <div className="flex  flex-col items-center  w-[90%]  h-full mt-10">
        <div className="flex  justify-center  w-[100%]">
          <Form value={submit} />
        </div>

        {/* <div className=" w-[90%] lg:w-[900px] mt-10">Total : {data.length}</div> */}

        {loading ? (
          // Show Skeleton only when loading

          <p className="text-black">loading...</p>
        ) : (
          // Render actual data when not loading
          data.map((company: any) => (
            <Card
              id={company.id}
              key={company.id}
              contractType={company.Conatract}
              WorkingType={company.Positon}
              ProgressCheck={company.progress}
              CompanyName={company.name}
              JobStatus={company.YourStatus}
              CompanyLocation={company.city}
              creationDate={DataFormat(company)}
              CompanyLogo={
                company.avatar === ""
                  ? "/DefaultCompanyLogo.svg"
                  : company.avatar
              }
              LinkedInOfCompany={company.linkding}
              ExperienceRate={company.emojistatus}
              creatorid={company.creatorId}
            />
          ))
        )}
      </div>
    </main>
  );
}
