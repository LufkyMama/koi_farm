import api from "../config/axios";
import { useNavigate } from "react-router-dom";
import Cover_Image from "../assets/bg.jpg";
import { Form, Input,message } from "antd";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  // Handle the form submission for registering a user
  const handleRegister = async (values) => {
    try {
      // Send the registration data to the backend
      const response = await api.post("/User/register", {
        userID: 0, // Assuming userID is auto-generated or set to 0
        username: values.username,
        password: values.password,
        name: values.username,
        email: values.email, // Added email
        phone: values.phone, // Added phone
        address: values.address, // Added address
       
      });

      // Extract the tokens from the response
      const { accessToken, refreshToken } = response.data.token;
      const { role, name, phone, address } = response.data;

      // Store the tokens in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userName", name);
      localStorage.setItem("userPhone", phone);
      localStorage.setItem("userAddress", address);

      navigate("/");

    } catch (error) {
      console.error("Registration failed:", error);

      // Display error message from backend if available
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message); // Show error message to the user
      } else {
        message.error("Registration failed. Please try again."); // Fallback message
      }
    }
  };
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
              <h3 className="text-3xl font-semibold mb-2">Register</h3>
              <p className="text-base text-gray-500 mb-2">
                Welcome to the F Koi Shop! Please enter your details.
              </p>
            </div>

            <div className="w-full flex flex-col">
              <Form
                form ={form}
                className="w-full"
                labelCol={{ span: 24 }}
                onFinish={handleRegister} // Updated to use handleRegister
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Username!",
                      type: "", // Ensure the input is a valid Username
                    },
                  ]}
                >
                  <Input
                    type="text"
                    autoComplete="off" //NOt suggest old userName
                    placeholder="Username"
                    className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                      type: "email", // Ensure the input is a valid email
                    },
                  ]}
                >
                  <Input
                    type="email"
                    placeholder="Email"
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

                <Form.Item
                  name="confirmPassword"
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
                          new Error("The two passwords do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                  />
                </Form.Item>

                <Form.Item
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please input your address!",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Address"
                    className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                  />
                </Form.Item>

                <Form.Item>
                  <div className="w-ful flex flex-col">
                    <button className="w-ful text-white my-2 font-semibold bg-black rounded-md p-4 border-2 border-black text-center flex items-center justify-center">
                      Register
                    </button>
                  </div>
                </Form.Item>

                <div className="w-full flex items-center justify-center relative py-2">
                  <div className="w-full h-[1px] bg-black"></div>
                  <p className="text-lg absolute text-black/80 bg-white">or</p>
                </div>
              </Form>
              
            </div>
          </div>

          <div className="w-full flex flex-col items-center p-10 mb-10"> {/* Add mb-10 for margin-bottom */}
            <p className="text-sm font-semibold text-black mb-2">
              You already have an account!{" "}
              <span className="font-semibold text-blue-500 hover:underline cursor-pointer">
                <Link to="/login">Login here</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
