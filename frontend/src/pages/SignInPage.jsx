import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="clerk-centered-container">
      <SignIn routing="hash" afterSignInUrl="/notebook" />
    </div>
  );
};

export default SignInPage;
