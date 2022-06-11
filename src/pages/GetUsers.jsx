import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";

const GetUsers = () => {
  const [documents, setDocuments] = useState([]);
  const [showEditModel, setShowEditModal] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  const URL = "http://localhost:8000";

  useEffect(() => {
    axios
      .get(`${URL}/getUsers`)
      .then((res) => {
        setDocuments(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    // setIsLoading(false);
  }, []);
  console.log(`documents`, documents);

  const EditModel = (props) => {
    return (
      
      <Modal {...props}  size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            Edit User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-dark">Close</Button>
          <Button>Update Data</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  const DeleteModel = (props) => {
    return (
      
      <Modal {...props}  size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton >
          <Modal.Title>
            Delete Data
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="">Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
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
            {documents.map((doc, i) => {
              return (
                <tr className="text-center fs-5">
                  <td key={i}>{i}</td>
                  <td key={i}>{doc.userName}</td>
                  <td key={i}>{doc.email}</td>
                  <td key={i}>{doc.mobileNo}</td>
                  <td className="d-flex justify-content-center align-items-center">
                    <Button variant="danger" className="mx-3" onClick={() => setShowDeleteModel(true)}>
                      Delete
                    </Button>
                    <Button variant="primary" className="w-25" onClick={() => setShowEditModal(true)}>
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      <EditModel
        show={showEditModel}
        onHide={() => setShowEditModal(false)}
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
