"use client";
import { useState, useEffect } from "react";
import { Table, Input, Button, Form, message, Select, Spin } from "antd";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/navigation";

const columns = [
  {
    title: "Subject",
    dataIndex: "subjectName",
    key: "subject",
  },
  {
    title: "Subject code",
    dataIndex: "subjectCode",
    key: "subjectcode",
  },
  {
    title: "Branch",
    dataIndex: "branch",
    key: "branch",
  },
  {
    title: "Faculty",
    dataIndex: "faculty",
    key: "faculty",
  },
  {
    title: "Total available seats",
    dataIndex: "seats",
    key: "seats",
  },
];

export default function Home() {
  const [subjectsData, setSubjectsData] = useState();
  const [isSubjectDataLoading, setIsSubjectDataLoading] = useState(true);
  const [isUSNSubmitted, setIsUSNSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [options, setOptions] = useState("");
  const [branch, setBranch] = useState("");
  const [studentSubmitLoading, setStudentSubmitLoading] = useState(false);
  const [isStudentDataSubmited, setIsStudentDataSubmited] = useState(false);

  const router = useRouter();

  axios.interceptors.request.use((config) => {
    config.headers["Cache-Control"] = "no-cache";
    return config;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        //console.log("fetch data subjects");
        const response = await fetch("/api/subjects", {
          cache: "no-store",
        });

        setSubjectsData(await response.json());
        setIsSubjectDataLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [isStudentDataSubmited]);

  const handleNext = async () => {
    const extractedCode = usn.match(/.{5}([A-Za-z]{2})/);

    if (extractedCode && extractedCode.length > 1) {
      setBranch(extractedCode[1]);
      const options = await axios.get(
        `/api/filtersubjects/${extractedCode[1]}`
      );
      setOptions(options.data);
      console.log(options.data);
      setIsUSNSubmitted(true);
    } else {
      message.error("Enter valid usn");
    }
  };

  const handleSubmit = async (value) => {
    setStudentSubmitLoading(true);
    try {
      const res = await axios.post("/api/addstudent", {
        sid: value.subject,
        branch: branch,
        usn: usn,
        name: name,
        email: email,
        phone: phone,
      });

      if (res.data.CODE == 400) {
        alert("USN already registered");
      } else if (res.data.CODE == 401) {
        alert(`Registration for this course is full and closed`);
      } else {
        // message.success(
        //   `${usn} Successfully registered to subject ${res.data.subjectName} ${res.data.subjectCode} ${res.data.faculty}`,
        //   100
        // );
        router.push(
          `/result/${usn}/${res.data.subjectName}/${res.data.subjectCode}/${res.data.faculty}`
        );
      }
      setIsStudentDataSubmited(true);
    } catch (err) {
      console.log(err);
      message.error(err);
    }
    setStudentSubmitLoading(false);
  };

  return (
    <div className="container mx-auto">
      <Head>
        <title>Open Elective for the AY-2023-24</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4">
        <h1 className="text-3xl font-bold text-center my-8">
          Open Elective for the AY-2023-24
        </h1>

        <div className="my-8">
          <h2 className="text-2xl font-bold">Enter Details</h2>
          <div className="text-red-500">
            Please enter all details correctly{" "}
            <div>
              Based on USN in next step open elective subject options are showed
            </div>
          </div>
          <Form layout="vertical" onFinish={handleNext}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input name!" }]}
            >
              <Input
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                // disabled={isUSNSubmitted}
              />
            </Form.Item>
            <Form.Item
              label="USN"
              name="usn"
              rules={[
                { required: true, message: "Please input USN!" },
                { min: 10, message: "Enter your full USN" },
              ]}
            >
              <Input
                placeholder="Enter your USN"
                onChange={(e) => setUsn(e.target.value)}
                value={usn}
                // disabled={isUSNSubmitted}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input email!" },
                {
                  type: "email",
                  message: "enter valid email",
                },
              ]}
            >
              <Input
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                // disabled={isUSNSubmitted}
              />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please input phone!" }]}
            >
              <Input
                placeholder="Enter your phone number"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                // disabled={isUSNSubmitted}
              />
            </Form.Item>
            {!isUSNSubmitted ? (
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Next
                </Button>
              </Form.Item>
            ) : (
              <></>
            )}
          </Form>
        </div>
        {isUSNSubmitted ? (
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Select Subject" name="subject" required>
              <Select>
                {options.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {`${item.subjectCode}-${item.faculty}-${item.subjectName}`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={studentSubmitLoading}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <></>
        )}
        <Table
          columns={columns}
          dataSource={subjectsData}
          loading={isSubjectDataLoading}
        />
      </main>
    </div>
  );
}
