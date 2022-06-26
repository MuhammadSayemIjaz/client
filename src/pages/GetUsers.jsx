import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { ThreeCircles } from "react-loader-spinner";
import { toast } from "react-toastify";

const GetUsers = () => {
  const [documents, setDocuments] = useState([]);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [singleDoc, setSingleDoc] = useState({});
  const [state, setState] = useState({ userName: "", email: "", age : "" , mobileNo: "" });

  const URL = "http://localhost:8000";

  useEffect(() => {
    axios
      .get(`${URL}/getUsers`)
      .then((res) => {
        setDocuments(res.data);
        setIsLoading(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleChangeFor = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleUpdateDoc = () => {
    let updateUser = {
      id: state._id,
      userName: state.userName,
      email: state.email,
      age : state.age,
      mobileNo: state.mobileNo
    };
    axios
      .put(`${URL}/updateUser`, updateUser)
      .then((res) => {
        toast.success("User has been successfully updated!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        let newArray = documents.map((doc) => {
          return state._id === doc._id ?updateUser : doc;
        });
        console.log("newArray", newArray);
        setDocuments(newArray);
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
  };
  const showEditModal = (doc) => {
    setState(doc);
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
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@getbootstrap"
      ></button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    User Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="userName"
                    defaultValue={state.userName}
                    onChange={(e) => handleChangeFor(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Age:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="age"
                    defaultValue={state.age}
                    onChange={(e) => handleChangeFor(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    defaultValue={state.email}
                    onChange={(e) => handleChangeFor(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Mobile No:
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    name="mobileNo"
                    defaultValue={state.mobileNo}
                    onChange={handleChangeFor}
                    maxLength={12}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancle
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => handleUpdateDoc(e)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
        <div className="container">
          <Table striped bordered hover responsive>
            <thead>
              <tr className="text-center fs-4 bg-dark text-white">
                <th>Sr.No</th>
                <th>User_Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Mobile_No</th>
                <th style={{ width: "160px" }}>Acitvity</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, i) => {
                return (
                  <tr className="text-center fs-5" key={i}>
                    <td>{i + 1}</td>
                    <td>{doc.userName}</td>
                    <td>{doc.age}</td>
                    <td>{doc.email}</td>
                    <td>{doc.mobileNo}</td>
                    <td className="d-flex justify-content-around align-items-center flex-wrap">
                      <div className="tableIcons">
                        <button
                          style={{ border: "none" }}
                          onClick={() => showEditModal(doc)}
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          <i
                            className="fa-solid fa-pen-to-square "
                            style={{ color: "green" }}
                          ></i>
                        </button>
                      </div>
                      <div
                        className="tableIcons"
                        onClick={() => showDeleteModal(doc)}
                      >
                        <i
                          className="fa-solid fa-trash "
                          style={{ color: "red" }}
                        ></i>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          {isLoading ? (
            ""
          ) : (
            <div className="spinner-section d-flex justify-content-center align-items-center  mt-5 pt-5">
              <ThreeCircles
                color="blue"
                height={110}
                width={110}
                ariaLabel="three-circles-rotating"
              />
            </div>
          )}
          <DeleteModel
            show={showDeleteModel}
            onHide={() => setShowDeleteModel(false)}
          />
        </div>
    </>
  );
};

export default GetUsers;
