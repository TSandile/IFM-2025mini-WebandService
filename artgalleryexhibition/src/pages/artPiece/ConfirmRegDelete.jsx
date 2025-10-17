import { Form } from "react-bootstrap";
import { TextField } from "@mui/material";
import Button from "react-bootstrap/Button";
import "../artist/ArtistManage.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteRegistration = () => {
  const { id } = useParams();
  const [registration, setRegistration] = useState({
    id: "",
    exhibition: { id: "" },
    actualVisitor: { id: "", name: "" },
    numberOfPeople: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtPiece = async () => {
      try {
        const response = await fetch(
          `http://localhost:2025/api/v1/registration/getRegistration/${id}`
        );

        const data = await response.json();
        setRegistration(data);
      } catch (error) {
        console.error("Error fetching art piece:", error);
      }
    };
    fetchArtPiece();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:2025/api/v1/registration/deleteRegistration/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("Registratin deleted successfully");
        navigate("/manageRegistration");
      }
    } catch (error) {
      console.error("Error deleting Registration:", error);
      alert("Failed to delete Registration");
    }
  };

  return (
    <>
      <div className="center-form d-flex justify-content-center align-items-center">
        <h1>Delete Registration</h1>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-around">
            <Button
              style={{ width: "500px" }}
              type="submit"
              variant="danger"
              color="error"
            >
              Delete
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};
export default DeleteRegistration;
