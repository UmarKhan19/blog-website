import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

const Protected = ({ Component }) => {
  const token = Cookie.get("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
