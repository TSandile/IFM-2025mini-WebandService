import { Form } from "react-bootstrap";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import "../exhibition/AddExhibition.css";
//for date
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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

const AddExhibition = () => {
  const theme = useTheme();
  const [status, setStatus] = useState("Select Status");

  //for data input
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    statusInfo: "",
  });

  //for dates
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const statuses = ["Select Status", "Planned", "Removed", "Displayed"];

  function getStyles(status, statusName, theme) {
    return {
      fontWeight: statusName.includes(status)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
    };
  }

  //handle tehxt input change and dates
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //handle status change
  // const handleStatusChangeInfo = (e) => {
  //   setFormData({
  //     ...formData,
  //     statusInfo: status ,
  //   });
  // };

  const handleStatusChange = (event) => {
    const {
      target: { value },
    } = event;

    setStatus(typeof value === "string" ? value : "");
    setFormData({ ...formData, statusInfo: value });
  };

  //specifi handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form data submitted:", formData);
    alert(" Artist form data submitted");
  };

  return (
    <>
      <div className="center-form d-flex justify-content-center align-items-center">
        <h1>Add Exhibition</h1>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-around">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextField
                className="text-field"
                id="outlined-basic"
                label="Exhibition Title"
                varient="outlined"
                type="text"
                sx={{ width: 340 }}
                //for dynamic input data
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
                //for dynamic input data
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
                name="startDate"
                value={formData.startDate}
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
                name="endDate"
                value={formData.startDate}
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
            <Button
              type="submit"
              id="btn-confirm"
              variant="contained"
              size="large"
            >
              Confirm
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};
export default AddExhibition;
