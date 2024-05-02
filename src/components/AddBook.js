import { Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
  });

  const handleState = (e) => {
    setBook((preBook) => ({
      ...preBook,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (data) => {
    axios
      .post("http://localhost:4000/private/api/add-book", data)
      .then((response) => {
        alert(response.data);
        reset({ title: "", author: "", genre: "" });
        setBook({ title: "", author: "", genre: "" });
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "50px" }}>
      <Button
        variant="contained"
        onClick={() => navigate("/")}
        sx={{ mb: 3 }}
        size="small"
      >
        View Books
      </Button>
      <Typography variant="h5" align="center" gutterBottom>
        Add New Book
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          required
          size="small"
          name="title"
          label="Title"
          variant="outlined"
          {...register("title", {
            required: true,
            pattern: /^[A-Za-z\s]+$/i,
          })}
          value={book.title}
          onChange={handleState}
          margin="normal"
          error={!!errors.title}
          helperText={errors.title ? "Please enter a valid title" : ""}
        />

        <TextField
          fullWidth
          required
          size="small"
          name="author"
          label="Author"
          variant="outlined"
          {...register("author", {
            required: true,
            pattern: /^[A-Za-z\s]+$/i,
          })}
          value={book.author}
          onChange={handleState}
          margin="normal"
          error={!!errors.author}
          helperText={errors.author ? "Please enter a valid author name" : ""}
        />

        <TextField
          fullWidth
          required
          size="small"
          name="genre"
          label="Genre"
          variant="outlined"
          {...register("genre", {
            required: true,
            pattern: /^[A-Za-z\s]+$/i,
          })}
          value={book.genre}
          onChange={handleState}
          margin="normal"
          error={!!errors.genre}
          helperText={errors.genre ? "Please enter a valid genre" : ""}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          sx={{ marginTop: "20px" }}
        >
          Save
        </Button>
      </form>
    </Container>
  );
};

export default AddBook;
