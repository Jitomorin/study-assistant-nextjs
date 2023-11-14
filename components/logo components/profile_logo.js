import { Avatar } from "@mui/material";
import Image from "next/image";
import React from "react";
import profile from "../../public/profile.jpg";

const ProfileLogo = (props) => {
  const width = props.width;
  const height = props.height;
  
  return (
    <Avatar
      alt="profile"
      src={props.src}
      
      sx={{ width: width,height: height }}
    />
  );
};

export default ProfileLogo;
