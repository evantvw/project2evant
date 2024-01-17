import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const AddProduct = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    const product = {
      title: title,
      price: price,
      description: description,
      image: image,
      category: category,
    };

    try {
      const res = await axios.post(
        "https://fakestoreapi.com/products",
        product
      );
      console.log(res);
      navigate("/products");
      setPending(false);
    } catch (e) {
      console.log(e);
      setPending(false);
    }
  };

  return (
    <div className="w-3/4 mx-auto">
      <button onClick={() => navigate(-1)} className="button py-2">
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

      <h1 className="text-5xl font-bold mt-5">Add New Products</h1>

      <Box
        component="form"
        sx={{
          width: 900,
          maxWidth: "100%",
        }}
        noValidate
        autoComplete="off"
        className="flex flex-col gap-3 mt-10"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-3">
          <TextField
            fullWidth
            label="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            fullWidth
            label="price"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <TextField
          id="description"
          label="description"
          multiline
          rows={7}
          placeholder="Enter product's description here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex gap-3">
          <TextField
            fullWidth
            label="image"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <TextField
            fullWidth
            label="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <button className="py-2 px-5 bg-indigo-600 text-gray-100 w-1/6 rounded-lg ml-auto">
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
