import React, { useState, useEffect } from "react";
import StoryOverview from "../StoryOverview/StoryOverview.component";
import { withRouter } from "react-router-dom";
import { isAuthenticated } from "../Auth";
import SkeletonPreview from "../Skeleton/Skeleton.component";
import { getStory } from "../APIS/blog";
import openSocket from "socket.io-client";

const Story = ({ match }) => {
  const { user, token } = isAuthenticated();
  const [story, setStory] = useState(null);
  const [visit, setVisit] = useState(1);

  useEffect(() => {
    getStory(user._id, match.params.storyId, token)
      .then((result) => {
        setStory(result);
        const socket = openSocket("https://story-backend.herokuapp.com/");
        socket.emit("visit", {
          storyId: match.params.storyId,
          userId: user._id,
        });
        socket.emit("visitAdd", {
          storyId: match.params.storyId,
          userId: user._id,
        });
        socket.on("visitCount", ({ count }) => {
          setVisit(count);
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
    return () => {
      const socket = openSocket("https://story-backend.herokuapp.com/");
      socket.emit("leave", {
        storyId: match.params.storyId,
        userId: user._id,
      });
      console.log("hi");
    };
  }, []);

  return (
    <div>
      {story ? (
        <StoryOverview story={story} isSingleStory visit={visit} />
      ) : (
        <SkeletonPreview />
      )}
    </div>
  );
};

export default withRouter(Story);
