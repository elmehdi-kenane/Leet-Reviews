"use client";
import CardEngagement from "@/components/CardEngagement";
import Comment from "@/components/Comment";
import axios from "axios";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { DataFormat } from "@/components/utils";

export default function Engagment() {
  const [comment, setComment] = useState("");
  const [refresh, setRefreach] = useState(false);
  const [avatar, setAvatar] = useState("");
  const routeur = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);
  const [loading, setLoading] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  interface CompanyData {
    id: number;
    Conatract: string;
    Positon: string;
    progress: string;
    name: string;
    YourStatus: string; // Adjust the type accordingly
    city: string;
    comments: [];
    // Add other properties as needed
  }

  const param = useSearchParams();
  const id = param?.get("id");
  const isCommentAreaSelected = param?.get("commentAreaSelected");
  
  const [comments, setComments] = useState([]);
  const [data, setData] = useState<CompanyData | any>([]);
  var commentsLength = 0;

  useEffect(() => {
    // Focus on the textarea when the component mounts
    if (textareaRef && textareaRef.current && isCommentAreaSelected === "true") {
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          // other headers...
        };
        const user = await axios.get("http://localhost:8000/42/me", {
          headers,
        });
        setAvatar(user.data.avatar);
        const url = `http://localhost:8000/42/getComments/?id=${id}`;
        const response = await axios.get(url);
        setComments(response.data.comments);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when API call completes
      }
    };

    fetchData();
  }, []);

  const handlePublish = async () => {
    if (isPublishing || comment.trim().length === 0) {
      return;
    }

    try {
      setIsPublishing(true);

      const token = Cookies.get("token");
      console.log("token engagment", token);
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // other headers...
      };

      const url = `http://localhost:8000/42/comments/?id=${id}`;
      console.log("comment going", comment);
      const status = await axios.post(url, { comment }, { headers });
      //  Refresh comments after posting

      const refreshedData = await axios.get(
        `http://localhost:8000/42/getComments/?id=${id}`
      );
      setComments(refreshedData.data.comments);
      console.log("comments", refreshedData.data);
    } catch (error) {
      routeur.push("/login");
      console.error("Error fetching data:", error);
    } finally {
      setIsPublishing(false);
      setTimeout(() => {
        setIsPublishing(false);
      }, 5000);
    }

    // Clear feedback after posting
    setComment("");
  };

  const handleTextareaChange = (event: any) => {
    setComment(event.target.value);
  };

  return (
    <div className="flex flex-col items-center mt-10  min-w-[280px] md:h-screen h-full w-full fixed">
      <div className="flex flex-col w-[90%]  justify-between items-center">
        {loading === true ? (
          <div>loading</div>
        ) : (
          <CardEngagement
            id={data.id}
            key={data.id}
            contractType={data.Conatract}
            WorkingType={data.Positon}
            ProgressCheck={data.progress}
            CompanyName={data.name}
            JobStatus={data.YourStatus}
            CompanyLocation={data.city}
            creationDate={DataFormat(data)}
            CompanyLogo={
              data.avatar === "" ? "/DefaultCompanyLogo.svg" : data.avatar
            }
            LinkedInOfCompany={data.linkding}
            ExperienceRate={data.emojistatus}
            creatorid={data.creatorId}
          />
        )}
        <div className=" w-[100%] lg:w-[900px] h-[90px] mt-5 ">
          <div className="flex w-full gap-2 h-full">
            <div>
              <Image
                src={avatar}
                alt=""
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <div className="w-full h-full">
              <textarea
                ref={textareaRef}
                name="feedback"
                onChange={handleTextareaChange}
                value={comment}
                id=""
                placeholder="Type Your Comment Here..."
                className="resize-none w-full rounded-2xl p-3 focus:outline-none border border-transparent focus:border focus:border-[#00224D]"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end items-end">
            <button
              onClick={handlePublish}
              className={`bg-[#FF204E] text-white rounded-lg w-24 h-7 mt-[-10px] ${
                isPublishing ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isPublishing}
            >
              Publish
            </button>
          </div>
        </div>
      </div>
      <div className=" lg:w-[900px] w-[90%] my-[50px]">
        <div className="flex justify-between">
          {/* <p>{`Total:  ${comments?.length}`}</p> */}
          <div className="flex" onClick={() => setRefreach(!refresh)}>
            <Image src={"/reload.png"} width={25} height={30} alt="" />
            <button>Refresh</button>
          </div>
        </div>
        <div className="w-[100%]">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div
              className={`flex flex-col items-center ${
                comments.length === 0 ? "justify-center" : "justify-start"
              } gap-5 border-2 border-[#00224D] h-max min-h-[200px] max-h-[500px] w-full px-3 py-3 rounded-3xl mb-[50px]`}
            >
              {comments.length === 0 ? (
                <div className="text-xl font-semibold text-center text-[white] bg-[#FF204E] p-3 rounded-xl">
                  Leave The First Comment and Make An Impact!
                </div>
              ) : (
                <div className="w-full h-full overflow-y-auto rounded-3xl">
                  {comments.map((company: any, index) => (
                    <Comment
                      key={index}
                      avatar={company.user.avatar}
                      comment={company.text}
                      login={company.user.login}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
