import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home/page";
import LoginPage from "../pages/auth/login/page";
import SignUpPage from "../pages/auth/signup/page";
import SocialSignUpPage from "../pages/auth/social-signup/page";
import { TermsOfServicePage } from "../pages/auth/terms-of-service/page";
import { PrivacyPolicyPage } from "../pages/auth/privacy-policy/page";
import { InterestSelectionPage } from "../pages/auth/interest-selection/page";
import { TermsAgreementPage } from "../pages/auth/terms-agreement/page";
import FaceStep from "@/pages/profileSetting/page";
import { Chat } from "@/pages/chat/page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/signup",
    element: <SignUpPage />,
  },
  {
    path: "/auth/social-signup",
    element: <SocialSignUpPage />,
  },
  {
    path: "/auth/terms-of-service",
    element: <TermsOfServicePage />,
  },
  {
    path: "/auth/privacy-policy",
    element: <PrivacyPolicyPage />,
  },
  {
    path: "/auth/interest-selection",
    element: <InterestSelectionPage />,
  },
  {
    path: "/auth/terms-agreement",
    element: <TermsAgreementPage />,
  },
  {
    path: "/profile",
    element: <FaceStep />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
]);
