import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ManageRegistration = () => {
  const [registrations, setRegistrations] = useState([]);
  const navigate = useNavigate();
  //   const [exhibition, setExhibition] = useState();
  //   const [visitor, setVisitor] = useState();

  useEffect(() => {
    const fetchReg = async () => {
      try {
        const response = await fetch(
          "http://localhost:2025/api/v1/registration/getAllRegistrations"
        );
        const data = await response.json();
        setRegistrations(data);
        console.log(registrations);
      } catch (error) {
        console.error("Error fetching artist:", error);
      }
    };
    fetchReg();
  }, []);

  const handleDelete = (id) => {
    navigate(`/confirmDelete/${id}`);
  };

  return (
    <>
      <div className="dash-body" style={{ width: "100%" }}>
        <h1
          className="header"
          style={{
            alignContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          Exhibition Registration Management
        </h1>
        <br />

        <Table
          striped
          bordered
          hover
          variant="light"
          style={{
            width: "70%",
            margin: "0 auto",
            marginTop: "20px",
            alignItems: "center",
            alignContent: "center",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Exhibition Title</th>
              <th>Visitor Name</th>
              <th>Number of Visitors</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg.id}>
                <td>{reg.id}</td>
                <td>{reg.exhibition.title}</td>
                <td>{reg.actualVisitor.name}</td>
                <td>{reg.numberOfPeople}</td>

                <td>
                  <Button
                    style={{ width: "200px", font: "bold" }}
                    variant="outline-danger"
                    onClick={() => handleDelete(reg.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default ManageRegistration;
