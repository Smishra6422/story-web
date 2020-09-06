import React, { Fragment, useEffect, useState } from "react";
import StoryOverview from "../StoryOverview/StoryOverview.component";
import { isAuthenticated } from "../Auth";
import { getAllStories } from "../APIS/blog";
import SkeletonPreview from "../Skeleton/Skeleton.component";

function Home() {
  const { user, token } = isAuthenticated();
  const [stories, setStories] = useState(null);

  useEffect(() => {
    getAllStories(user._id, token)
      .then((result) => {
        setStories(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <Fragment>
      {stories ? (
        <Fragment>
          {stories.map((story, index) => {
            return <StoryOverview key={index} story={story} />;
          })}
        </Fragment>
      ) : (
        <Fragment>
          <SkeletonPreview />
          <SkeletonPreview />
        </Fragment>
      )}
    </Fragment>
  );
}

export default Home;
