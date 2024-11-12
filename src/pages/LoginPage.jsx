import  { useContext } from 'react';
import api from "../config/axios";
import { useNavigate } from "react-router-dom";
import Cover_Image from "../assets/bg.jpg";
import { Form, Input } from "antd";
import GOOGLE_ICON from "../assets/google.svg";
import { Link } from "react-router-dom";
import UserContext from '../context/userContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setRole } = useContext(UserContext);
  

  const handleLogin = async (values) => {
    try {
      const response = await api.post('/User/login', {
        username: values.username,
        password: values.password,
        name: values.username,
       
      });
      const { accessToken, refreshToken } = response.data.token;
      const { role, name, phone, address } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem('userRole', role.toString());
      localStorage.setItem('userName', name);
      localStorage.setItem('userPhone', phone);
      localStorage.setItem('userAddress', address);

      setIsLoggedIn(true);
      setRole(role.toString());   
      navigate("/");
    } catch (e) {
      console.log('Login failed', e);
    }
  }

  return (
    <>
      <div className="w-full h-screen flex items-start">
        <div className="relative w-1/2 h-full flex flex-col">
          <img src={Cover_Image} alt="Cover" className="w-full h-full" />
        </div>

        <div className="w-1/2 h-full bg-white flex flex-col p-10 justify-between items-center">
          <h1 className="w-full max-w-[500px] mx-auto text-xl font-semibold text-black mr-auto">
            F Koi Shop
          </h1>

          <div className="w-full flex flex-col max-w-[500px]">
            <div className="w-full flex flex-col mb-2">
              <h3 className="text-3xl font-semibold mb-2">Login</h3>
              <p className="text-base text-gray-500 mb-2">
                Welcome to the F Koi Shop! Please enter your details.
              </p>
            </div>

            <div className="w-full flex flex-col">
              <Form
                className="w-full"
                labelCol={{ span: 24 }}
                onFinish={handleLogin}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                      type: "", // Ensure the input is a valid email
                    },
                  ]}
                >
                  <Input
                    type=""
                    placeholder="Username"
                    className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input
                    type="password"
                    placeholder="Password"
                    className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                  />
                </Form.Item>
                <Form.Item>
                  <div className="w-full flex item-center justify-between">
                    <div className="w-ful flex item-center">
                      <input type="checkbox" className="w-4 h-4 mr-2" />
                      <p className="text-sm">Remeberme</p>
                    </div>
                    <p className="text-sm font-medium whitespace-nowrap cursor-pointer hover:underline">
                      Forgot Passowrd ?
                    </p>
                  </div>
                </Form.Item>
                <Form.Item>
                  <div className="w-ful flex flex-col">
                    <button type="submit" className="w-ful text-white my-2 font-semibold bg-black rounded-md p-4 text-center flex items-center justify-center">
                      Login
                    </button>
                  </div>
                </Form.Item>

                <div className="w-full flex items-center justify-center relative py-2">
                  <div className="w-full h-[1px] bg-black"></div>
                  <p className="text-lg absolute text-black/80 bg-white">or</p>
                </div>
                <div>
                  <button
                    className="w-full text-black my-2 bg-white border-2 border-black rounded-md p-4 text-center flex items-center justify-center"

                  >
                    <img
                      src={GOOGLE_ICON}
                      className="h-6 mr-2"
                      alt="Google Icon"
                    />
                    Sign In With Google
                  </button>
                </div>
              </Form>

            </div>
          </div>

          <div className="w-full flex flex-col items-center p-10">
            <p className="text-sm font-semibold text-black mb-2">
              Don&apos;t have an account?{" "}
              <span className=" font-semibold text-blue-500 hover:underline cursor-pointer">
                <Link to="/register">Sign up for free</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
