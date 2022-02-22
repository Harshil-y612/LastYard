import * as React from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

let updateFlag = false; //Update Flag true onClick of update button of printData
let dataArray = []; //Intialiser of global array of form data
let index = 0;

const Home = (props) => {
  let [printArray, setPrintArray] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); //Prevent page from reloading
    if (updateFlag === false) {
      setPrintArray(
        dataArray.push({
          id: dataArray.length,
          firstname: document.getElementsByName("firstname")[0].value,
          lastname: document.getElementsByName("lastname")[0].value,
          age: document.getElementsByName("age")[0].value,
          email: document.getElementsByName("email")[0].value,
          fileData: URL.createObjectURL(
            document.getElementsByName("file")[0].files[0]
          ),
        })
      );
    } else {
      setPrintArray(
        (dataArray[index]["firstname"] =
          document.getElementsByName("firstname")[0].value),
        (dataArray[index]["lastname"] =
          document.getElementsByName("lastname")[0].value),
        (dataArray[index]["age"] = document.getElementsByName("age")[0].value),
        (dataArray[index]["email"] =
          document.getElementsByName("email")[0].value),
        (dataArray[index]["fileData"] = URL.createObjectURL(
          document.getElementsByName("file")[0].files[0]
        ))
      );
      updateFlag = false;
    }
    console.log(dataArray);
    setOpen(false);
    PrintData();
  };

  const handleUpdate = (e) => {
    /*Update Function called onClick of printData update button
    set Flag value to True and copy all data of selected index of dataArray 
    from firstname into the form fields */
    e.preventDefault();
    setOpen(true);
    updateFlag = true;
    const dataFirstname =
      e.target.parentElement.parentElement.childNodes[0].innerText;
    index = dataArray.findIndex((data) => data["firstname"] === dataFirstname);
  };

  const handleDelete = (e) => {
    /*Delete Function Called onClick of printData delete button 
    get the index value from subResult div's id and delete that data on
    selected index using splice */
    const dataFirstname =
      e.target.parentElement.parentElement.childNodes[0].innerText;
    index = dataArray.findIndex((data) => data["firstname"] === dataFirstname);
    setPrintArray(dataArray.splice(index, 1));
  };

  const PrintData = () => {
    /* Print Function Component renders every time page got reload and return 
    the dataArray data inside div subresult using map function */
    return (
      <table className="outputTable">
        <thead>
          <tr>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Age</th>
            <th>Email</th>
            <th>Image</th>
            <th>View</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {dataArray.map((data, index) => (
            <tr key={index} id={data.id}>
              <td>{data.firstname}</td>
              <td>{data.lastname}</td>
              <td>{data.age}</td>
              <td>{data.email}</td>
              <td>
                <img
                  id="filedata"
                  height="50px"
                  width="50px"
                  src={data.fileData}
                  alt="FileImage"
                />
              </td>
              <td>
                <Link className="btn" name="updatebtn" to="/view">
                  View
                </Link>
              </td>
              <td>
                <button
                  className="btn"
                  name="updatebtn"
                  type="submit"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  className="btn"
                  name="deletebtn"
                  type="submit"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderForm = () => {
    return (
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add User</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="firstname"
                  name="firstname"
                  label="firstname"
                  fullWidth
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="lastname"
                  name="lastname"
                  label="lastname"
                  fullWidth
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="age"
                  name="age"
                  label="Age"
                  fullWidth
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  fullWidth
                  margin="dense"
                />
              </Grid>
              <Grid>
                <Button variant="contained" component="label">
                  <input type="file" name="file" label="File" />
                </Button>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              name="submitbtn"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  return (
    //Returns HTML Form with Submit button on HomeScreen using [meterial-UI]
    <div>
      <div className="navbar">
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
        <hr />
      </div>
      <div>
        <PrintData />
      </div>
      <button className="btn" onClick={handleClickOpen} name="addUserbtn">
        AddUser
      </button>
      <div className="formInput">{renderForm()}</div>
    </div>
  );
};

export default Home; //Export formTodoFunction as component for use
