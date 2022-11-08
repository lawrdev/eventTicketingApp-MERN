import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getEvent } from "../features/event/eventSlice";
import { snack } from "../features/global/globalSlice";
import BackButton from "../components/BackButton";

const cloud_name = "dqveipmsp";

function PicturePage() {
  const [loading, setLoading] = useState(true);

  const { event } = useSelector((state) => state.event);
  const { id } = useParams();
  const dispatch = useDispatch();

  // get event
  useEffect(() => {
    dispatch(getEvent(id))
      .unwrap()
      .then(() => {
        // if successfull
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        dispatch(snack(error));
      });
  }, [dispatch, id]);

  if (loading) return <Spinner />;

  return (
    <div className="px-3 mt-5">
      <BackButton />

      <div className="mt-4 max-w-2xl mx-auto shadow">
        <img
          src={`https://res.cloudinary.com/${cloud_name}/image/upload/w_900,h_510,c_fill,q_100/${event.details?.img_id}.jpg`}
          alt="event"
          className="object-contain"
          style={{
            backgroundPosition: "no-repeat",
            height: "100%",
            width: "100",
          }}
        />
      </div>
    </div>
  );
}

export default PicturePage;
