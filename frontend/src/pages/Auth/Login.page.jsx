import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import AuthenticationTitle from "../../components/Auth/AuthenticationTitle";

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginService, authLoading, user } = useBoundStore((state) => state);

  useEffect(() => {
    if (user) {
      navigate("/posts");
    }
  }, [user, navigate]);

  const onLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (email && password) {
      loginService(email, password);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <AuthenticationTitle onLogin={onLogin} authLoading={authLoading} />
    </div>
  );
};

export default LoginPage;
