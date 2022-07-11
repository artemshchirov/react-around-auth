import { useState } from "react";

function Register({ handleRegister }) {
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const [registerData, setRegisterData] = useState({});

  const [message, setMessage] = useState("");

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setRegisterData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  const handleSUbmit = (evt) => {
    evt.preventDefault();
    if (registerData.password === registerData.confirmPassword) {
      let { username, password, email } = registerData;
      handleRegister(username, password, email);
    }
  };

  return (
    <>
      {/* <p className="entry__text"> Уже зарегестрированы?</p>
      <button>Войти</button> */}
    </>
  );
}

export default Register;
