import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../Auth";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: red[500],
  },
}));

const StoryOverview = ({ story, isSingleStory, visit }) => {
  const classes = useStyles();
  const { user } = isAuthenticated();

  return (
    <Container maxWidth="lg" style={{ marginBottom: "2rem" }}>
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {story.title[0]}
            </Avatar>
          }
          title={story.title}
          subheader={`By ${story.posted_by.name}`}
          style={{
            textTransform: "capitalize",
          }}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {story.content}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          {isSingleStory && (
            <IconButton aria-label="add to favorites" title="Current Visiting">
              <VisibilityIcon style={{ marginRight: "1rem" }} />
              <Typography variant="p" color="textSecondary" component="p">
                {visit}
              </Typography>
            </IconButton>
          )}
          {!isSingleStory && (
            <IconButton aria-label="add to favorites" title="Total Visited">
              <VisibilityIcon style={{ marginRight: "1rem" }} />
              <Typography variant="p" color="textSecondary" component="p">
                {story.visited.length}
              </Typography>
            </IconButton>
          )}
          {!isSingleStory && (
            <IconButton aria-label="share">
              <Link to={"/story/" + user._id + "/" + story._id}>
                <OpenInNewIcon />
              </Link>
            </IconButton>
          )}
        </CardActions>
      </Card>
    </Container>
  );
};

export default StoryOverview;
