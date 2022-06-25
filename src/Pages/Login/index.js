import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FloatingLabel, Form, Button, Card } from "react-bootstrap";

import { AuthContext } from "../../main";
import { validateEmail } from "../../utils";

import styles from "./loginStyles.module.css";

const Login = () => {
  let navigate = useNavigate();
  const { login, SetToast } = useContext(AuthContext);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (validateEmail(form.elements[0].value)) {
        event.preventDefault();
        event.stopPropagation();
        login({
          email: form.elements[0].value,
          password: form.elements[1].value,
        });
        navigate("/productList");
      } else {
        SetToast("Enter Valid Email");
        event.preventDefault();
        event.stopPropagation();
      }
    }
    setValidated(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.welcomeText}>Have an Account</h1>
      <Card className={styles.card}>
        <Form
          className={styles.formStyle}
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group
            className={styles.formGroupStyle}
            controlId="validationCustom01"
          >
            <FloatingLabel label="Email address" className={styles.inputStyle}>
              <Form.Control
                id="email"
                required
                type="email"
                placeholder="Enter Email"
                defaultValue=""
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group
            className={styles.formGroupStyle}
            controlId="validationCustom02"
          >
            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className={styles.inputStyle}
            >
              <Form.Control
                required
                type="password"
                placeholder="password"
                defaultValue=""
              />
            </FloatingLabel>
          </Form.Group>
          <Button className={styles.submitButton} type="submit">
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};
export default Login;
