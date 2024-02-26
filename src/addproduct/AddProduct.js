import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import "./AddProduct.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkMode } from "../context/DarkMode";
import { useDispatch } from "react-redux";
import { uploadProduct } from "../crudSlice";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });
  const [pending, setPending] = useState(false);
  const { isDarkMode } = useContext(DarkMode);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);

    try {
      dispatch(uploadProduct({ formData }));
      navigate("/products");
      setPending(false);
    } catch (e) {
      console.log(e);
      setPending(false);
    }
  };

  return (
    <div className="container-add">
      <button onClick={() => navigate(-1)} className="btn-back py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 pr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>
        <span>Back</span>
      </button>

      <h1 className={`title ${isDarkMode ? "text-gray-100" : ""}`}>
        Add New Products
      </h1>

      <Box
        component="form"
        sx={{
          width: 900,
          maxWidth: "100%",
        }}
        noValidate
        autoComplete="off"
        className={`flex flex-col gap-3 mt-10 ${
          isDarkMode ? "bg-gray-200 p-4 rounded-xl sm:p-3" : ""
        }`}
        onSubmit={handleSubmit}
      >
        <div className="flex gap-3">
          <TextField
            fullWidth
            label="title"
            id="title"
            placeholder="Enter product's title here"
            value={formData.title}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            }
          />
          <TextField
            fullWidth
            label="price"
            id="price"
            placeholder="Enter product's price here"
            value={formData.price}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                price: e.target.value,
              }))
            }
          />
        </div>
        <TextField
          id="description"
          label="description"
          multiline
          rows={7}
          placeholder="Enter product's description here"
          value={formData.description}
          onChange={(e) =>
            setFormData((prevState) => ({
              ...prevState,
              description: e.target.value,
            }))
          }
        />
        <div className="flex gap-3">
          <TextField
            fullWidth
            label="image link"
            id="image"
            placeholder="paste your product's image link here"
            value={formData.image}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                image: e.target.value,
              }))
            }
          />
          <TextField
            fullWidth
            label="category"
            id="category"
            placeholder="Enter product's category here"
            value={formData.category}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                category: e.target.value,
              }))
            }
          />
        </div>

        <button className="btn-add-submit">
          {pending ? (
            <CircularProgress size="1rem" color="inherit" />
          ) : (
            "Add product"
          )}
        </button>
      </Box>
    </div>
  );
};

export default AddProduct;
