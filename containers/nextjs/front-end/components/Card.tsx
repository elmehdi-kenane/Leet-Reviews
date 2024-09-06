"use client";
import Image from "next/image";
import Badge from "./Badge";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import CustomizedTooltip from "./CustomizedTooltip";
import { trimFeedbackSubtitle } from "./utils";
import { log } from "console";

export default function Card({
  CompanyName = "default",
  JobStatus = "default",
  CompanyLocation = "default",
  contractType = "default",
  ProgressCheck = "default",
  WorkingType = "default",
  id = 0,
  creationDate = 2024,
  CompanyLogo = "/fun_face.svg",
  LinkedInOfCompany = "",
  ExperienceRate = "/fun_face.svg",
  creatorid = 0,
}: any) {
  const handleClickCard = (key: any) => {};

  const [user, setLogin] = useState("");
  const [FeedbackSubtitle, setFeedbackSubtitle] = useState<any>();
  const [FeedbackAuthorAvatar, setFeedbackAuthorAvatar] = useState<any>();
  const [FeedbackAuthorUsername, setFeedbackAuthorUsername] = useState<any>();
  const [isHovered, setIsHovered] = useState(false);

  const employmentDetails = [
    {
      id: 1,
      icon: "/WorkLocationIcon.svg",
      text: WorkingType,
    },
    {
      id: 2,
      icon: "/ContractTypeIcon.svg",
      text: contractType,
    },
    {
      id: 1,
      icon: "/CompanyCityIcon.svg",
      text: CompanyLocation,
    },
    {
      id: 1,
      icon: "/ProgressCheckIcon.svg",
      text: ProgressCheck,
    },
  ];
  let experienceRating;
  if (ExperienceRate === "/fun_face.svg") experienceRating = "Excellent";
  else if (ExperienceRate === "/regular_face.svg") experienceRating = "Good";
  else if (ExperienceRate === "/sad_face.svg") experienceRating = "Weak";

  useEffect(() => {
    async function getUser() {
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
        setLogin(user.data.login);
        const feedbackDetails = await axios.get(
          `http://localhost:8000/42/getComments/?id=${id}`
        );
        setFeedbackSubtitle(
          trimFeedbackSubtitle(feedbackDetails.data.description)
        );
        setFeedbackAuthorAvatar(feedbackDetails.data.creator.avatar);
        setFeedbackAuthorUsername(
          feedbackDetails.data.creator.login[0].toUpperCase() +
            feedbackDetails.data.creator.login.slice(1)
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    getUser();
  }, []);
  const uniqueUserIds = new Set();

  // Filter the array to keep only unique users
  //   const uniqueData = FeedbackSubtitle.filter((item: any) => {
  //     if (!uniqueUserIds.has(item.userId)) {
  //       uniqueUserIds.add(item.userId);
  //       return true;
  //     }
  //     return false;
  //   });

  const router = useRouter();

  const path = usePathname();
  const proceder = "/Engagement";
  const desire = proceder === path;
  const circleRadius = 15;
  return (
    <Link
      href={`/Engagement?id=${id}&commentAreaSelected=${false}`}
      onClick={() => handleClickCard(id)}
      className={`flex justify-between flex-col p-10 max-sm:px-[5px] max-sm:py-[10px] rounded-[16px] bg-white mt-10 w-[100%] max-w-[900px] ${
        FeedbackSubtitle === "" ? "h-[330px" : "h-[370px"
      } max-md:h-max shadow-lg hover:shadow-2xl font-inter text-[#00224D] gap-[10px]`}
    >
      <div className="flex justify-between gap-[10px] max-md:flex-col">
        <div className="flex max-sm:flex-col justify-center items-center gap-4 h-max min-h-[110px]">
          <div className="flex justify-start items-end rounded-full">
            <Image
              src={CompanyLogo}
              alt={CompanyLogo}
              width={125}
              height={125}
              className="rounded-full"
            />
            <CustomizedTooltip
              placement="bottom"
              title={`${experienceRating} Experience`}
              arrow
            >
              <div
                className={`w-[${circleRadius * 2}] h-[${
                  circleRadius * 2
                }]  ml-[-30px]`}
              >
                <Image
                  src={ExperienceRate}
                  alt={ExperienceRate}
                  width={circleRadius * 2 - 10}
                  height={circleRadius * 2 - 10}
                  className="ml-[5px] mb-[-25px] relative z-[9]"
                />
                <svg
                  width={circleRadius * 2}
                  height={circleRadius * 2}
                  xmlns="http://www.w3.org/2000/svg"
                  // className="border border-[blue]"
                >
                  <circle
                    r={circleRadius}
                    cx={circleRadius}
                    cy={circleRadius}
                    fill="#d1d5db"
                  />
                </svg>
              </div>
            </CustomizedTooltip>
          </div>
          <div className="flex flex-col h-full w-full max-sm:items-center justify-center">
            <div className="font-bold text-2xl max-lg:text-lg flex gap-1 items-center">
              {CompanyName}
              {LinkedInOfCompany !== "" && (
                <a
                  href={LinkedInOfCompany}
                  target="_blank"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Image
                    src="/LinkedInIcon.svg"
                    alt=""
                    width={25}
                    height={25}
                  />
                </a>
              )}
            </div>
            <p className="font-semibold text-xl max-lg:text-base">
              {JobStatus}
            </p>
          </div>
        </div>
        <div className="flex items-center flex-wrap max-md:justify-end max-sm:justify-center w-[310px] lg:w-[310px] max-md:min-w-full gap-[10px] max-sm:w-full max-sm:gap-[5px] h-max font-medium">
          {employmentDetails.map((employmentDetail) => {
            return (
              <div
                key={employmentDetail.id}
                className="flex items-center gap-[5px] rounded-[14px] border border-[#00224D]  w-[150px] max-lg:w-[48%] max-md:max-w-[120px] h-[50px] p-[5px] max-lg:text-sm"
              >
                <div className="bg-[#00224D] rounded-full w-[35px] h-[35px] flex justify-center items-center">
                  <Image
                    src={employmentDetail.icon}
                    alt={employmentDetail.icon}
                    width={20}
                    height={20}
                  />
                </div>
                {employmentDetail.text}
              </div>
            );
          })}
          {FeedbackSubtitle !== "" && (
            <div className="w-full h-max flex justify-end relative z-[1]">
              <a
                href={`https://profile.intra.42.fr/users/${FeedbackAuthorUsername}`}
                target="_blank"
                className="bg-[#00224D] rounded-full w-[35px] h-[35px] flex justify-center items-center"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Image
                  src="/42-logo.svg"
                  alt="42-logo.svg"
                  width={20}
                  height={20}
                />
              </a>
            </div>
          )}
        </div>
      </div>
      {FeedbackSubtitle !== "" ? (
        <div className="flex justify-between items-start flex-col mt-[-35px]">
          <div className="flex items-center gap-2">
            <Image
              src={FeedbackAuthorAvatar}
              alt={FeedbackAuthorAvatar}
              width={50}
              height={50}
              className="rounded-full relative z-10 border-2 border-[#00224D] mb-1"
            />
            <p className="mb-[15px] font-semibold">{FeedbackAuthorUsername}</p>
          </div>
          <div className="border-2 border-[#00224D] p-4 rounded-2xl w-[98%] mt-[-20px] relative self-end max-lg:text-xs max-sm:text-[9px] max-sm:leading-[12px]">
            <p className="overflow-x-auto w-full dark-scrollbar">
              {FeedbackSubtitle}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex border-2 border-[#00224D] rounded-2xl justify-between items-center p-2 gap-[5px]">
          <div className="flex items-center gap-2">
            <Image
              src={FeedbackAuthorAvatar}
              alt={FeedbackAuthorAvatar}
              width={50}
              height={50}
              className="rounded-full relative z-10 border-2 border-[#00224D]"
            />
            <p className="font-semibold">{FeedbackAuthorUsername}</p>
          </div>
          <div className="w-max h-max flex">
            <a
              href={`https://profile.intra.42.fr/users/${FeedbackAuthorUsername}`}
              target="_blank"
              className="bg-[#00224D] rounded-full w-[35px] h-[35px] flex justify-center items-center"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Image
                src="/42-logo.svg"
                alt="42-logo.svg"
                width={20}
                height={20}
              />
            </a>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center">
        <div className="flex flex-col max-sm:ml-[7px]">{creationDate}</div>
        <Link
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          href={`/Engagement?id=${id}&commentAreaSelected=${true}`}
          className="text-[#FF204E] flex item hover:bg-[#FF204E] hover:text-white s-center gap-[3px] border-[2px] border-[#FF204E] rounded-xl p-2 h-max"
        >
          <Image
            src={`${isHovered ? "/CommentIconLight.svg" : "/CommentIcon.svg"}`}
            alt="CommentIcon.svg"
            width={20}
            height={20}
          />
          <p className="max-sm:hidden">Comment</p>
        </Link>
      </div>
    </Link>
  );
}
