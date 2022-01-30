import React, { useState, useRef } from "react";
import { Form, Input, Upload, Button, Avatar } from "antd";
import styled from "styled-components";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
// import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useHistory } from "react-router";

const Register = () => {
  const [userName, setUserName] = useState();
  const [password, setPassWord] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  // const avatar = useRef()
  const history = useHistory();
  const Register = () => {
    // event.preventDefault();

    const RegisterUser = async () => {
      const data = {email: email, username: userName, password: password, fullname: fullName};
      // const formData = new FormData();
      // formData.append("email", email);
      // formData.append("username", userName);
      // formData.append("password", password);
      // formData.append("fullname", fullName);
      // formData.append("avatar",avatar.current);

      try {
        await axios.post("https://localhost:44333/User/addUser", data);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    };
    RegisterUser();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    // windowconsole.info("Bạn nhập sai thông tin");
  };

  // const normFile = (e) => {
  //   console.log("Upload event:", e);
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e && e.fileList;
  // };
  return (
    <Wrapper>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={Register}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <RegisterForm
          name="Ten"
          label="Full Name"
          type="text"
          value={fullName}
          change={(event) => setFullName(event.target.value)}
        />
        <RegisterForm
          name="TenTaiKhoan"
          label="User Name"
          type="text"
          value={userName}
          change={(event) => setUserName(event.target.value)}
        />

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Input your account information!",
            },
          ]}
        >
          <Input.Password
            className="input"
            value={password}
            onChange={(event) => setPassWord(event.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            className="input"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </Form.Item>

        <RegisterForm
          name="Email"
          label="Email"
          type="text"
          value={email}
          change={(event) => setEmail(event.target.value)}
        />

        
        {/* <Form.Item
          name="avatar"
          label="avatar"
          value={avatar}
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="upload avatar của bạn"
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item> */}
        <button type="submit" className="submit-btn">
          Regist now
        </button>
      </Form>
    </Wrapper>
  );
};

function RegisterForm(props) {
  return (
    <Form.Item
      className="information"
      label={props.label}
      name={props.name}
      rules={[{ required: true, message: "Input your account information!" }]}
    >
      <Input
        type={props.type}
        className="input"
        value={props.value}
        onChange={props.change}
      />
    </Form.Item>
  );
}

export default Register;
const Wrapper = styled.section`
  .information {
    letter-spacing: var(--spacing);
  }
  .input {
    padding: 0.2rem;
    border-radius: var(--radius);
    border-color: var(--clr-black);
  }
  .submit-btn {
    border-radius: var(--radius);
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid var(--clr-black);
    margin-left: 45%;
    background: var(--clr-primary-10);
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    cursor: pointer;
    transition: var(--transition);
    color: var(--clr-black);
  }
`;