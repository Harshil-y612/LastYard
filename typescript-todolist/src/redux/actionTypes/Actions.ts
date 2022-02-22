type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: string;
};

// interfce for add user

interface AddUser {
  type: "ADD-USER";
  playload: User;
}

// interfce for edit user

interface EditUser {
  type: "EDIT_USER";
  playload: User;
}

// interfce for delete user

interface DeleteUser {
  type: "DELETE_USER";
  playload: number;
}

export type Action = AddUser | EditUser | DeleteUser;

