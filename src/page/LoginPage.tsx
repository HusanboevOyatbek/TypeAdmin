import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import axios from "axios";
import {  useNavigate } from 'react-router-dom';

type FieldType = {
  username?: string;
  password?: string;
};


type isAuthType = {setIsAuth: React.Dispatch<React.SetStateAction<boolean>>}


const LoginPage = ({ setIsAuth} :isAuthType) => {
  const navigate = useNavigate()


  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const res = await axios.post(`https://dummyjson.com/auth/login`, values);
      localStorage.setItem("token", res?.data?.accessToken);
      setIsAuth(true)
      localStorage.setItem("auth" , JSON.stringify(true))
      navigate("/admin/actor")
      


    } catch (err) {
      console.log(err);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };



  ////////////////////////////
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* Username */}
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Username kiriting!' }]}
          >
            <Input
              size="large"
              placeholder="Username"
              className="rounded-lg"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Parol kiriting!' }]}
          >
            <Input.Password
              size="large"
              placeholder="Password"
              className="rounded-lg"
            />
          </Form.Item>




          {/* Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full rounded-lg bg-amber-500 hover:bg-amber-600"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
};

export default LoginPage;