import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signin | Direct Stars",
  description: "Login into Direct Stars dashboard",
};

export default function SignIn() {
  return <SignInForm />;
}
