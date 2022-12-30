import * as Yup from "yup";

const checkoutSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  instructions: Yup.string(),
  items: Yup.array(),
});

export default checkoutSchema;
