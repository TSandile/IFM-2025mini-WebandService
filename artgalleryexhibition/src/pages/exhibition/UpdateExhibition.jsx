import { Form } from "react-bootstrap";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  useTheme,
  OutlinedInput,
  FormControl,
  InputLabel,
} from "@mui/material";
import "../artist/ArtistManage.css";
import { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 350,
    },
  },
};

const UpdateExhibition = () => {
  const { id } = useParams();
  const theme = useTheme();
  const statuses = ["Select Status", "Planned", "Removed", "Displayed"];
  const [status, setStatus] = useState(statuses[0]);
  const [formData, setFormData] = useState({
    id: "",
    description: "",
    title: "",
    start_date: "",
    end_date: "",
    status: "",
    imageData: null,
  });

  const navigate = useNavigate();

  function getStyles(status, statusName, theme) {
    return {
      fontWeight: statusName.includes(status)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
    };
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStatusChange = (event) => {
    const {
      target: { value },
    } = event;

    setStatus(typeof value === "string" ? value : "");
    // setFormData({ ...formData, statusInfo: value });
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      image: event.target.files[0], //store file object itself
    });
  };

  useEffect(() => {
    const fetchExhibition = async () => {
      try {
        const response = await fetch(
          `http://localhost:2025/api/v1/exhibition/getExhibition/${id}`
        );
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching exhibition:", error);
      }
    };
    fetchExhibition();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:2025/api/v1/exhibition/updateExhibition/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Exhibition updated successfully");
        alert("Exhibition updated successfully");
        navigate("/manageExhibition");
      }
    } catch (error) {
      console.error("Error updating exhibition:", error);
    }
  };

  return (
    <>
      <div className="center-form d-flex justify-content-center align-items-center">
        <h1>Update Exhibition</h1>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                id="outlined-basic"
                label=" Exhibition Id"
                varient="outlined"
                type="text"
                sx={{ width: 340 }}
                //for dynamic data
                name="id"
                value={formData.id}
                read-only={true}
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                className="text-field"
                id="outlined-basic"
                label="Exhibition Title"
                varient="outlined"
                type="text"
                sx={{ width: 340 }}
                //for dynamic data
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                id="outlined-basic"
                label="Description"
                varient="outlined"
                type="text"
                sx={{ width: 340 }}
                //for dynamic data
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3">
              <TextField
                label="start Date"
                varient="outlined"
                type="date"
                sx={{ width: 340 }}
                name="startdate"
                value={formData.startdate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3">
              <TextField
                label="End Date"
                varient="outlined"
                type="date"
                sx={{ width: 340 }}
                name="enddate"
                value={formData.startdate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-around">
            <FormControl sx={{ m: 1 }}>
              <InputLabel id="demo-multiple-name-label">
                Exhibition Status
              </InputLabel>
              <Select
                labelId="demmo-multile-name-label"
                id="demo-multiple-name"
                value={status}
                onChange={handleStatusChange}
                input={<OutlinedInput label="Status" />}
                MenuProps={MenuProps}
                defaultValue={status}
                sx={{ width: 340 }}
              >
                {statuses.map((status) => (
                  <MenuItem
                    key={status}
                    value={status}
                    style={getStyles(status, status, theme)}
                  >
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="d-flex justify-content-around">
            <span> Upload Image</span>
          </div>

          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                varient="outlined"
                type="file"
                name="image"
                onChange={handleFileChange}
                InputProps={{ inputProps: { accept: "images/*" } }}
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-around">
            <Button
              type="submit"
              id="btn-confirm"
              variant="contained"
              size="large"
            >
              Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default UpdateExhibition;
