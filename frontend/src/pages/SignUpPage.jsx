import { SignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

  return (
    <div className="clerk-centered-container">
      <SignUp
        routing="hash"
        afterSignUp={() => {
          navigate("/notebook");
        }}
      />
    </div>
  );
};

export default SignUpPage;