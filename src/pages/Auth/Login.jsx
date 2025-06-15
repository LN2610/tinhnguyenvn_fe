import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../util/AuthContext"

const Login = () => {
    
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  })

  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const { login, currentUser } = useContext(AuthContext);
  
  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
      try {
        await login(inputs);
      } catch (error) {
        console.log("error", error)
        alert(error.response?.data || "Đã có lỗi xảy ra trong quá trình đăng nhập.");
        setErr(error)
      }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Panel - Hero Section */}
      <div className="w-1/2 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative flex items-center justify-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-emerald-300 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-teal-300 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-20 left-16 w-12 h-12 bg-cyan-300 rounded-full animate-pulse delay-700"></div>
          <div className="absolute bottom-32 right-12 w-24 h-24 bg-emerald-200 rounded-full animate-bounce delay-1000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-12 max-w-lg">
          {/* Animated Logo */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <img
              src="welovevlt.png"
              alt="Volunteers"
              className="relative w-64 h-64 mx-auto object-cover rounded-full shadow-2xl border-8 border-white/50 hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Title with Animation */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in">
            Kết Nối Tình Nguyện
          </h1>
          <h2 className="text-2xl font-semibold text-emerald-600 mb-6 animate-fade-in delay-300">
            Việt Nam
          </h2>

          {/* Description */}
          <div className="space-y-4 text-gray-600 animate-fade-in delay-500">
            <p className="text-lg leading-relaxed">
              🤝 <strong>Nền tảng kết nối</strong> những trái tim tình nguyện trên khắp Việt Nam
            </p>
            <p className="text-base">
              🌟 Tham gia các hoạt động từ thiện, bảo vệ môi trường, hỗ trợ cộng đồng
            </p>
            <p className="text-base">
              💚 Cùng nhau xây dựng một xã hội tốt đẹp hơn
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 animate-fade-in delay-700">
            <div className="text-center p-3 bg-white/30 backdrop-blur-sm rounded-xl">
              <div className="text-2xl font-bold text-emerald-600">1000+</div>
              <div className="text-sm text-gray-600">Tình nguyện viên</div>
            </div>
            <div className="text-center p-3 bg-white/30 backdrop-blur-sm rounded-xl">
              <div className="text-2xl font-bold text-teal-600">200+</div>
              <div className="text-sm text-gray-600">Dự án</div>
            </div>
            <div className="text-center p-3 bg-white/30 backdrop-blur-sm rounded-xl">
              <div className="text-2xl font-bold text-cyan-600">63</div>
              <div className="text-sm text-gray-600">Tỉnh thành</div>
            </div>
          </div>
        </div>

        {/* Floating Hearts Animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 text-red-300 text-2xl animate-float">💚</div>
          <div className="absolute top-1/3 right-1/3 text-red-300 text-xl animate-float delay-1000">🤝</div>
          <div className="absolute bottom-1/3 left-1/3 text-red-300 text-lg animate-float delay-2000">🌟</div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-1/2 bg-gradient-to-br from-white to-gray-50 flex flex-col justify-center items-center p-12 relative">
        
        {/* Admin Button */}
        <a
          href="https://springboot-demo-latest-9inn.onrender.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-6 right-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm px-6 py-3 rounded-full hover:from-purple-700 hover:to-purple-800 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
        >
          👑 Admin Portal
        </a>

        {/* Login Card */}
        <div className="w-full max-w-md bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
              <img
                src="./logo.PNG"
                alt="Logo"
                className="w-12 h-12 object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Chào mừng trở lại!</h1>
            <p className="text-gray-600">Đăng nhập để tiếp tục hành trình tình nguyện</p>
          </div>

          {/* Login Form */}
          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-1">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-700"
              >
                Tên đăng nhập
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">👤</span>
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={inputs.username}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 bg-white/50"
                  placeholder="Nhập tên đăng nhập"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔒</span>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={inputs.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 bg-white/50"
                  placeholder="Nhập mật khẩu"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              🚀 Đăng nhập ngay
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">hoặc</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Chưa có tài khoản?{' '}
              <span
                onClick={() => navigate('/register')}
                className="text-emerald-600 font-semibold cursor-pointer hover:text-emerald-700 hover:underline transition duration-200"
              >
                Đăng ký ngay 💚
              </span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 text-center text-sm text-gray-500">
          <p>🇻🇳 Tự hào phục vụ cộng đồng Việt Nam</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        .delay-500 {
          animation-delay: 500ms;
        }

        .delay-700 {
          animation-delay: 700ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }

        .delay-2000 {
          animation-delay: 2000ms;
        }
      `}</style>
    </div>
  );
};

export default Login;