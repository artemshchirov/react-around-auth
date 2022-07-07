import { useState } from "react";
import EntryForm from "./EntryForm";

function Register(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>





    
      {/* <p className="entry__text"> Уже зарегестрированы?</p>
      <button>Войти</button> */}
    </>
  );
}

export default Register;
