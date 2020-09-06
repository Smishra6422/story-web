import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Skeleton from "@material-ui/lab/Skeleton";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 80,
  },
}));

const SkeletonPreview = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" style={{ marginBottom: "2rem" }}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circle"
              width={40}
              height={40}
            />
          }
          title={
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />
        {<Skeleton animation="wave" variant="rect" className={classes.media} />}

        <CardContent>
          {
            <React.Fragment>
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width="80%" />
            </React.Fragment>
          }
        </CardContent>
      </Card>
    </Container>
  );
};

export default SkeletonPreview;
