import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";

const GetUsers = () => {
  const [documents, setDocuments] = useState([]);
  const [showEditModel, setShowEditModel] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [singleDoc, setSingleDoc] = useState({});
  const [state, setState] = useState({ userName: "", email: "", mobileNo: "" });

  const URL = "http://localhost:8000";

  useEffect(() => {
    axios
      .get(`${URL}/getUsers`)
      .then((res) => {
        setDocuments(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleChangeFor = (e) => {
    console.log(e.target.value)
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };
  const handleUpdateDoc = () => {
    console.log(state._id)

  let newData = { id: state._id, userName: state.userName, age: 25 }

  //   axios.put(`${URL}/updateUser`, newData)
  //     .then((res) => {
  //       console.log("message from server", res.data)
  //       alert("User has been successfully updated.")
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })

  }
  const showEditModal = (doc) => {
    setShowEditModel(true);
    console.log(doc)
    setState(doc);
  };

  const EditModel = (props) => {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="px-4">
          <Modal.Title className="fs-2 px-3">Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body as="div" className="px-5">
          <Form className="px-5" >
            <Form.Group className="my-4">
              <InputGroup className="mb-3" size="md">
                <InputGroup.Text id="basic-addon1">
                  <i className="fa-solid fa-user-large icons"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="User Name..."
                  name="userName"
                  value={state.userName}
                  onChange={handleChangeFor}
                  // onChange={(e) => setState(s=>({...s, userName: e}))}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-4">
              <InputGroup className="mb-3" size="md">
                <InputGroup.Text id="basic-addon1">
                  <i className="fa-solid fa-envelope icons"></i>
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Email..."
                  name="email"
                  value={state.email}
                  onChange={handleChangeFor}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-4">
              <InputGroup className="mb-3" size="md">
                <InputGroup.Text id="basic-addon1">
                  <i className="fa-solid fa-phone-flip icons"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Mobile No..."
                  name="mobileNo"
                  value={state.mobileNo}
                  onChange={handleChangeFor}
                  // onChange={(e) => setState(s=>({...s, mobileNo: e}))}
                />
              </InputGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            className="w-25"
            onClick={() => setShowEditModel(false)}
          >
            Cancle
          </Button>
          <Button onClick={handleUpdateDoc}>Update Data</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const handleDelete = () => {
    const { _id } = singleDoc;
    axios
      .delete(`${URL}/deleteUser/${_id}`)
      .then((res) => {
        toast.success("User Deleted Succesfullty!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        let newArray = documents.filter((doc) => {
          return _id !== doc._id;
        });
        setDocuments(newArray);
        setShowDeleteModel(false);
      })
      .catch((err) => {
        toast.success(err, {
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
  };

  const showDeleteModal = (doc) => {
    setShowDeleteModel(true);
    setSingleDoc(doc);
  };

  const DeleteModel = (props) => {
    return (
      <Modal {...props} centered>
        <Modal.Header closeButton className="px-4">
          <Modal.Title className="fs-2">Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="px-2 fs-5">
            Are you sure you want to delete your account? <br />
            If you delete your account, you will permanently lose your profile.
          </p>
        </Modal.Body>
        <Modal.Footer
          as="div"
          className="d-flex justify-content-around align-items-center"
        >
          <Button
            variant="outline-secondary"
            className="w-25"
            onClick={() => setShowDeleteModel(false)}
          >
            Cancle
          </Button>
          <Button variant="danger" className="w-25" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  return (
    <div className="container">
      <div className="container form-section  pt-5 border">
        <Table striped bordered hover responsive>
          <thead>
            <tr className="text-center fs-4 bg-dark text-white">
              <th>Sr.No</th>
              <th>User_Name</th>
              <th>Email</th>
              <th>Mobile_No</th>
              <th>Acitvity</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <Spinner
                  animation="grow"
                  as={"td"}
                  className="text-black fs-2 text-center"
                />
              </tr>
            ) : (
              <>
                {documents.map((doc, i) => {
                  return (
                    <tr className="text-center fs-5" key={i}>
                      <td>{i}</td>
                      <td>{doc.userName}</td>
                      <td>{doc.email}</td>
                      <td>{doc.mobileNo}</td>
                      <td className="d-flex justify-content-center align-items-center">
                        <Button
                          variant="danger"
                          className="mx-3"
                          onClick={() => showDeleteModal(doc)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="primary"
                          className="w-25"
                          onClick={() => showEditModal(doc)}
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </Table>
        <EditModel
          show={showEditModel}
          onHide={() => setShowEditModel(false)}
        />
        <DeleteModel
          show={showDeleteModel}
          onHide={() => setShowDeleteModel(false)}
        />
      </div>
    </div>
  );
};

export default GetUsers;
