import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { isAuthenticated } from "../Auth";
import { TextareaAutosize } from "@material-ui/core";
import { addStory } from "../APIS/blog";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Story Writter
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AddStoryForm = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    title: "",
    content: "",
    error: false,
    loading: false,
    success: false,
  });
  const classes = useStyles();

  const { title, content, error, loading, success } = values;

  const handleChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
    setValues({ ...values, [e.target.name]: e.target.value, error: false });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    addStory({ title, content }, user._id, token)
      .then((result) => {
        setValues({
          ...values,
          loading: false,
          success: true,
          title: "",
          content: "",
        });
      })
      .catch((error) => {
        console.log(error.message);
        setValues({
          ...values,
          error: error.message,
          loading: false,
          success: false,
        });
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add Your Story
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
          {loading && (
            <Grid item xs={12}>
              <Alert severity="success">Adding yur story Please wait...</Alert>
            </Grid>
          )}
          {success && (
            <Grid item xs={12}>
              <Alert severity="success">Story added Successfully</Alert>
            </Grid>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            type="title"
            label="Story Title"
            name="title"
            autoComplete="title"
            autoFocus
            onChange={handleChange}
            value={title}
          />
          <TextareaAutosize
            required
            fullWidth
            name="content"
            placeholder="Story Content"
            id="content"
            rowsMin={10}
            onChange={handleChange}
            value={content}
            style={{ width: "100%" }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Story
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default AddStoryForm;
