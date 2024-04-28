"use client";

import React from "react";
import { Result } from "antd";

const page = ({ params }) => {
  const decodedSlug = params.slug.map(decodeURIComponent);

  return (
    <Result
      status="success"
      title={`${decodedSlug[0]} Successfully Registered`}
      subTitle={`${decodedSlug[0]} Successfully registered to subject ${decodedSlug[1]} ${decodedSlug[2]} ${decodedSlug[3]}`}
      // extra={[
      //   <div>
      //     <div>Subject Code: {decodedSlug[2]}</div>
      //     <div>Subject Name: {decodedSlug[1]}</div>
      //     <div>Faculty: {decodedSlug[3]}</div>
      //   </div>,
      // ]}
    />
  );
};

export default page;
