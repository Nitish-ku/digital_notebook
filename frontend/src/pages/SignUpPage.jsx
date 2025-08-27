import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="clerk-centered-container">
      <SignUp routing="hash" afterSignUpUrl="/notebook" />
    </div>
  );
};

export default SignUpPage;
