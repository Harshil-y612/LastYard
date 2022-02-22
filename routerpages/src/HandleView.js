import * as React from "react";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

let dataArray = [];
// onClick={(e) => props.HandleView(e)}
const HandleView = (props) => {
  //   let imageSrc =
  //     event.target.parentElement.parentElement.childNodes[4].children[0].src;
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>View Image</DialogTitle>
          <DialogContent>
            <img src={"imageSrc"} alt="FileData" />
          </DialogContent>
        </Dialog>
      </div>
      <Link to="/home">Home</Link>
    </div>
  );
};

export default HandleView;
