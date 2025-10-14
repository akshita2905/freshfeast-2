import { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App.jsx'; // use your server URL

function SignIn() {
  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";


  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Add this line to fix your error
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Now this works
    setError("");

    try {
      const response = await axios.post(`${serverUrl}/api/auth/signin`, {
        email,
        password,
      }, { withCredentials: true });

      console.log("Signin Success:", response.data);
      alert("Signin successful!");
      navigate("/signIn");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4" style={{ backgroundColor: bgColor }}>
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6" style={{ color: primaryColor }}>Sign In</h2>


        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          <div className="relative">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-2 font-semibold rounded-md transition-colors ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <div className="text-right mb-4 text-[#ff4d2d] font-medium" onClick={() => {
            navigate("forgot-password")
          }}>
            Forgot Password
          </div>

          <div className="flex items-center my-4">
            <hr className="flex-1 border-gray-300" />
            <span className="px-2 text-gray-400">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <button
            type="button"
            className="w-full py-2 flex items-center justify-center border rounded-md hover:bg-gray-100 transition-colors"
          >
            <FcGoogle className="mr-2" /> Sign In with Google
          </button>
          <p className="text-center mt-6 text-sm">
            Create an account?{" "}
            <span
              onClick={() => navigate("/signUp")}
              className="text-[#ff4d2d] font-semibold cursor-pointer hover:underline"
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
