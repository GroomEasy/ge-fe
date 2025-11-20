import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <button onClick={() => navigate("/auth/login")} className="px-6 py-3 bg-black text-white">
        로그인 페이지
      </button>
      <button onClick={() => navigate("/auth/signup")} className="px-6 py-3 bg-gray-800 text-white">
        회원가입 페이지
      </button>
      <button
        onClick={() => navigate("/auth/social-signup")}
        className="px-6 py-3 bg-gray-600 text-white"
      >
        소셜 회원가입 페이지
      </button>
      <button
        onClick={() => navigate("/auth/interest-selection")}
        className="px-6 py-3 bg-gray-400 text-white"
      >
        관심 분야 선택 페이지
      </button>
      <button
        onClick={() => navigate("/auth/terms-agreement")}
        className="px-6 py-3 bg-gray-300 text-white"
      >
        약관 동의 페이지
      </button>
      <button onClick={() => navigate("/profile")} className="px-6 py-3 bg-gray-300 text-white">
        faceProfile
      </button>
    </div>
  );
};

export default HomePage;
