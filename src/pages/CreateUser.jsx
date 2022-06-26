import React, { useState } from "react";
import axios from "axios";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Create_User = () => {

  const URL = process.env.REACT_APP_API_END_POINT;
  const navigate = useNavigate();

  const [state, setState] = useState({
    userName: "",
    email: "",
    password: "",
    mobileNo: "",
  });

  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = { ...state };

    axios.post(`${URL}/createUsers`, formData)
      .then(() => {
        toast.success("User created Succesfullty!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((err) => {
        toast.error(err, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
    navigate("/getUsers");
  };

  return (
    <div className="container">
      <div className="container form-section">
        <div className="mt-5 mx-auto col-lg-4 col-xl-5 col-md-8 col-sm-11 border rounded-3 shadow">
          <Form className="p-5" onSubmit={handleSubmit}>
            <h1 className="text-dark text-center pb-4 fw-bolder">
              Create User
            </h1>
            <Form.Group className="my-4">
              <InputGroup className="mb-3" size="md">
                <InputGroup.Text id="basic-addon1">
                  <i className="fa-solid fa-user-large icons"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="User Name..."
                  name="userName"
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-4">
              <InputGroup className="mb-3" size="md">
                <InputGroup.Text id="basic-addon1">
                  <i className="fa-solid fa-envelope icons"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Email..."
                  name="email"
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-4">
              <InputGroup className="mb-3" size="md">
                <InputGroup.Text id="basic-addon1">
                  <i className="fa-duotoned fa-id-card icons"></i>
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="Age..."
                  name="age"
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-4">
              <InputGroup className="mb-3" size="md">
                <InputGroup.Text id="basic-addon1">
                  <i className="fa-solid fa-phone-flip icons"></i>
                </InputGroup.Text>
                <Form.Control
                  type="tel"
                  placeholder="Mobile No..."
                  name="mobileNo"
                  onChange={handleChange}
                  maxLength={12}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-3 p-2 fw-bolder"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Create_User;
