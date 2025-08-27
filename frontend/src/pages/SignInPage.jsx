import { SignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();

  return (
    <div className="clerk-centered-container">
      <SignIn
        routing="hash"
        afterSignIn={() => {
          navigate("/notebook");
        }}
      />
    </div>
  );
};

export default SignInPage;