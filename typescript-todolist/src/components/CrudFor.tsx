import { Field, Form, Formik, FormikProps } from "formik";
import React, { useState } from "react";
import { addUser, deleteUser, editUser } from "../redux/actions/crud";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import CrudTable from "./CrudTable";
import { RootState } from "../redux/rootReducer";
import { TextField } from "formik-material-ui";
import { Button } from "@mui/material";
import { MyFormValues, User } from "./Types";

const CrudFor = () => {
  // state decalaration for setting intial state  to formik
  const [userId, setUserId] = useState<null | number>(null);
  const [ firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setage] = useState<string>("");
  const [email, setemail] = useState<string>("");
  

  // getting the state from useSelector hook
  const state = useSelector((state: RootState) => state.reducer);

  //intilize the dispatch
  const dispatch = useDispatch();
  // intial formik values
  const initialValues: MyFormValues = {
    firstName: firstName,
    lastName: lastName,
    age: age,
    email: email,
  };

  // edit user function
  const handleEditUser = (id: number): void => {
    setUserId(id);
    let index = state.listArray.findIndex((item) => item.id === id);
    setFirstName(state.listArray[index].firstName);
    setLastName(state.listArray[index].lastName);
    setage(state.listArray[index].age);
    setemail(state.listArray[index].email);
  };

  //update function
  const handleUpdate = (): void => {
    let updatedObj: User = {
      id: Number(userId),
      firstName: firstName,
      lastName: lastName,
      age: age,
      email: email,
    };
    // dispatch the action creator
    dispatch(editUser(updatedObj));
    reset();
    setUserId(null);
  };

  //reset function
  const reset = (): void => {
    setFirstName("");
    setLastName("");
    setage("");
    setemail("");
  };

  return (
    <div>
      <Formik
        // initial the formik attributes
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values, action): void => {
          action.setSubmitting(false);
          let obj: User = {
            id: Math.random() * 1,
            ...values,
          };
          dispatch(addUser(obj));
          reset();
        }}
        // validation using yup
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required("Please enter first name"),
          lastName: Yup.string().required("Please enter last name"),
          age: Yup.string().required("Please enter age"),
          email: Yup.string()
            .email("enter the valid mail")
            .required("Enter valid email-id"),
        })}
      >
        {(props: FormikProps<MyFormValues>) => {
          const { setFieldValue } = props;
          return (
            <Form className="w-100 d-flex flex-column justify-content-center align-items-center">
              <div className="d-flex justify-content-center align-items-center my-4 w-50">
                <div className="m-2 w-100 " style={{ height: "2rem" }}>
                  <Field
                    component={TextField}
                    className="w-100"
                    label="First Name"
                    variant="standard"
                    name="firstName"
                    type="text"
                    size="small"
                    // onchange function for updation
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => {
                      setFieldValue("firstName", event.currentTarget.value);
                      setFirstName(event.currentTarget.value);
                    }}
                  />
                </div>
                <div className="m-2 w-100 " style={{ height: "2rem" }}>
                  <Field
                    component={TextField}
                    className="w-100"
                    label="lastName"
                    variant="standard"
                    name="lastName"
                    type="text"
                    size="small"
                    // onchange function for updation
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => {
                      setFieldValue("lastName", event.currentTarget.value);
                      setLastName(event.currentTarget.value);
                    }}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-center align-items-center my-4 w-50">
                <div className="m-2 w-100 " style={{ height: "2rem" }}>
                  <Field
                    component={TextField}
                    className="w-100"
                    label="Age"
                    variant="standard"
                    name="age"
                    type="text"
                    size="small"
                    // onchange function for updation
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => {
                      setFieldValue("age", event.currentTarget.value);
                      setage(event.currentTarget.value);
                    }}
                  />
                </div>
                <div className="m-2 w-100 " style={{ height: "2rem" }}>
                  <Field
                    component={TextField}
                    className="w-100"
                    label="Email"
                    variant="standard"
                    name="email"
                    type="text"
                    size="small"
                    // onchange function for updation
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => {
                      setFieldValue("email", event.currentTarget.value);
                      setemail(event.currentTarget.value);
                    }}
                  />
                </div>
              </div>
              <div className="mt-3">
                <Button
                  className="mx-3"
                  variant="contained"
                  type="submit"
                  disabled={userId === null ? false : true}
                >
                  Submit
                </Button>
                <Button
                  className="mx-3"
                  variant="contained"
                  onClick={(): void => handleUpdate()}
                  disabled={userId === null ? true : false}
                >
                  Update
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>

      <div className="mt-5 px-5">
        <CrudTable
          array={state.listArray}
          handleDelete={(id): void => {
            dispatch(deleteUser(id));
          }}
          handleEdit={handleEditUser}
        />
      </div>
    </div>
  );
};

export default CrudFor;
