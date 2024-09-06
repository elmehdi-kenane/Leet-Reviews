import React, { useState } from "react";
import Image from "next/image";

const Comment = ({ login, comment, avatar = "/fun_face.svg" }: any) => {
  const [showFullText, setShowFullText] = useState(false);

  const handleToggleText = () => {
    setShowFullText(!showFullText);
  };
  const username = login[0].toUpperCase() + login.slice(1);
  const words = comment.split(" ");
  const displayText = showFullText ? comment : words.slice(0, 20).join(" "); // Display first 20 words

  return (
    <div className="flex w-full">
      <div className="w-[50px] h-[50px] ">
        <Image
          src={avatar}
          alt=""
          width={5000}
          height={5000}
          className="w-full h-full rounded-full border-2 border-white"
        />
      </div>
      <div className="w-[100%] lg:w-[93%] md:w-[83%] h-full rounded-xl bg-blend-darken">
        <p className="font-medium text-[#00224D] mt-[5px] ml-[4px]">{username}</p>
        <div className="p-2 bg-[white] rounded-xl rounded-tl-[5px] border border-[#00224D]">
          <p className="min-h-max max-h-16 overflow-y-scroll">{displayText}</p>
          {/* {words.length > 20 && (
            <button
              onClick={handleToggleText}
              className="hover:underline focus:outline-none text-white"
            >
              {showFullText ? "Read Less" : "Read More"}
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Comment;
