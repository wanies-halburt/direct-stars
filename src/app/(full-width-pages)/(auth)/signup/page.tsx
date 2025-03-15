import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup | Direct Stars",
  description: "Signup to have access to Direct Stars",
  // other metadata
};

export default function SignUp() {
  return <SignUpForm />;
}
