"use client";
import Image from "next/image";
import Badge from "./Badge";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";


const CustomizedTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#d1d5db",
    color: "#00224D",
    fontSize: 11,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#d1d5db",
  },
}));

export default function Card({
  CompanyName = "default",
  JobStatus = "default",
  CompanyLocation = "default",
  contractType = "default",
  ProgressCheck = "default",
  WorkingType = "default",
  id = 0,
  creationDate = 2024,
  CompanyLogo = "/goodEx.png",
  CompanyLinkedIn = "https://www.linkedin.com/school/1337-coding-school/",
  ExperienceRate = "/goodEx.png",
  creatorid = 0,
}: any) {
  const handleClickCard = (key: any) => {};

  const [user, setLogin] = useState("");
  const [FeedbackSubtitle, setFeedbackSubtitle] = useState<any>();
  const [FeedbackAuthorAvatar, setFeedbackAuthorAvatar] = useState<any>();
  const [AuthorIntraLogin, setAuthorIntraLogin] = useState("");

  const trimFeedbackSubtitle = (originalFeedbackSubtitle: string) => {
    const maxChars = 190;
    if (originalFeedbackSubtitle.length <= maxChars)
      setFeedbackSubtitle(originalFeedbackSubtitle);
    else
      setFeedbackSubtitle(originalFeedbackSubtitle.slice(0, maxChars) + "...");
  };

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
        const AuthorIntraLogin = await axios.get(
          `http://localhost:8000/42/user/?id=${creatorid}`
        );
        setAuthorIntraLogin(AuthorIntraLogin.data.login);

        const userComment = await axios.get(
          `http://localhost:8000/42/getComments/?id=${id}`
        );
        trimFeedbackSubtitle(userComment.data.comments[0].text);
        setFeedbackAuthorAvatar(userComment.data.comments[0].user.avatar);
        console.log(userComment.data.comments[0].user.avatar);
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
    <div
      onClick={() => handleClickCard(id)}
      className="flex justify-between flex-col p-10 max-sm:px-[5px] max-sm:py-[10px] rounded-[16px] bg-white mt-10 w-[100%] max-w-[900px] h-[400px] max-md:h-max shadow-lg hover:shadow-2xl font-inter text-[#00224D] gap-3"
    >
      <div className="flex justify-between gap-[10px] max-md:flex-col items-center">
        <div className="flex max-sm:flex-col items-center gap-4 h-max md:mt-[-40px]">
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
              title="Experience Rate"
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
          <div className="flex flex-col h-full w-full max-sm:items-center">
            <div className="font-bold text-2xl max-lg:text-lg flex gap-1 items-center">
              {CompanyName}
              <a href={CompanyLinkedIn} target="_blank">
                <Image src="/LinkedInIcon.svg" alt="" width={25} height={25} />
              </a>
            </div>
            <p className="font-semibold text-xl max-lg:text-base">
              {JobStatus}
            </p>
            {/* <div className="flex items-center">
              <p className="font-light">Experience Rate</p>
              <Image
                src={ExperienceRate}
                alt={ExperienceRate}
                width={20}
                height={20}
              />
            </div> */}
          </div>
        </div>
        <div className="flex items-center flex-wrap max-md:justify-end max-sm:justify-center w-[310px] max-lg:w-[270px] max-md:min-w-full gap-[10px] h-max font-medium">
          <div className="flex items-center gap-[5px] rounded-[14px] border border-[#00224D]  w-[150px] max-lg:w-[48%] max-md:max-w-[140px] h-[50px] p-[5px] max-lg:text-sm">
            <div className="bg-[#00224D] rounded-full w-[35px] h-[35px] flex justify-center items-center">
              <Image
                src="/WorkLocationIcon.svg"
                alt="WorkLocationIcon.svg"
                width={20}
                height={20}
              />
            </div>
            {WorkingType}
          </div>
          <div className="flex items-center gap-[5px] rounded-[14px] border border-[#00224D]  w-[150px] max-lg:w-[48%] max-md:max-w-[140px] h-[50px] p-[5px] max-lg:text-sm">
            <div className="bg-[#00224D] rounded-full w-[35px] h-[35px] flex justify-center items-center">
              <Image
                src="/ContractTypeIcon.svg"
                alt="ContractTypeIcon.svg"
                width={18}
                height={18}
              />
            </div>
            {contractType}
          </div>
          <div className="flex items-center gap-[5px] rounded-[14px] border border-[#00224D]  w-[150px] max-lg:w-[48%] max-md:max-w-[140px] h-[50px] p-[5px] max-lg:text-sm">
            <div className="bg-[#00224D] rounded-full w-[35px] h-[35px] flex justify-center items-center">
              <Image
                src="/CompanyCityIcon.svg"
                alt="CompanyCityIcon.svg"
                width={20}
                height={20}
              />
            </div>
            {CompanyLocation}
          </div>
          <div className="flex items-center gap-[5px] rounded-[14px] border border-[#00224D]  w-[150px] max-lg:w-[48%] max-md:max-w-[140px] h-[50px] p-[5px] max-lg:text-sm">
            <div className="bg-[#00224D] rounded-full w-[35px] h-[35px] flex justify-center items-center">
              <Image
                src="/ProgressCheckIcon.svg"
                alt="ProgressCheckIcon.svg"
                width={20}
                height={20}
              />
            </div>
            {ProgressCheck}
          </div>
          <a
            href={`https://profile.intra.42.fr/users/${AuthorIntraLogin}`}
            target="_blank"
            className="w-full flex justify-end"
          >
            <div className="bg-[#00224D] rounded-full w-[35px] h-[35px] flex justify-center items-center">
              <Image
                src="/42-logo.svg"
                alt="42-logo.svg"
                width={20}
                height={20}
              />
            </div>
          </a>
        </div>
      </div>
      <div className="flex justify-between items-start flex-col max-sm:mt-[-35px]">
        <Image
          src={FeedbackAuthorAvatar}
          alt={FeedbackAuthorAvatar}
          width={50}
          height={50}
          className="rounded-full relative z-10 border-2 border-[#00224D]"
        />
        <div className="border-2 border-[#00224D] p-4 rounded-2xl w-[98%] mt-[-20px] relative self-end max-lg:text-xs max-sm:text-[9px] max-sm:leading-[12px]">
          {FeedbackSubtitle}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <div className="flex items-center gap-[5px]">
            {/* <a href="">
              <div className="bg-[#00224D] rounded-full w-[35px] h-[35px] flex justify-center items-center">
                <Image
                  src="/DiscordIcon.svg"
                  alt="DiscordIcon.svg"
                  width={20}
                  height={20}
                />
              </div>
            </a> */}
          </div>
          {creationDate}
        </div>
        <Link
          href={`/Engagement?id=${id}`}
          className="text-[#FF204E] flex items-center gap-[3px] border-[2px] border-[#FF204E] rounded-xl p-2 h-max"
        >
          <Image
            src="/CommentIcon.svg"
            alt="CommentIcon.svg"
            width={20}
            height={20}
          />
          <p className="max-sm:hidden">Comment</p>
        </Link>
      </div>
    </div>
  );
}
