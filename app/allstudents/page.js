"use client";

import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const columns = [
  {
    title: "Student Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "USN",
    dataIndex: "usn",
    key: "usn",
  },
  {
    title: "Branch",
    dataIndex: "branch",
    key: "branch",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Subject Name",
    dataIndex: "subjectName",
    key: "subjectName",
  },
  {
    title: "Subject Code",
    dataIndex: "subjectCode",
    key: "email",
  },
  {
    title: "Faculty",
    dataIndex: "faculty",
    key: "faculty",
  },
];

// const data = [
//   {
//     key: "1",
//     name: "John Doe",
//     age: 30,
//     address: "New York",
//   },
//   {
//     key: "2",
//     name: "Jane Smith",
//     age: 25,
//     address: "Los Angeles",
//   },
//   {
//     key: "3",
//     name: "Tom Brown",
//     age: 40,
//     address: "Chicago",
//   },
// ];

const Page = () => {
  const [studentsData, setStudentData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/addstudent");
        setStudentData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div style={{ padding: "20px" }}>
      <h1>All students data</h1>
      <Table columns={columns} dataSource={studentsData} />
    </div>
  );
};

export default Page;
