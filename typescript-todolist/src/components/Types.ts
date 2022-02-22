// types for crud

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  age: string;
  email: string;
};

export type TableProps = {
  array: User[];
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
};

export interface MyFormValues {
  firstName: string;
  lastName: string;
  age: string;
  email: string;
}
