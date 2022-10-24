import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getEvents, getAllEvents } from "../features/event/eventSlice";
import { snack } from "../features/global/globalSlice";
import { Header } from "../components/Header";
import BackButton from "../components/BackButton";
import EventStatusTabs from "../components/EventStatusTabs";

function CategoryPage() {
  const { publicEvents } = useSelector((state) => state.event);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { type } = useParams();

  // GET ALL EVENTS - [public]
  useEffect(() => {
    setLoading(true);
    dispatch(getAllEvents())
      .unwrap()
      .then(() => {
        // if successfull
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        dispatch(snack("Error please try again"));
      });
  }, [dispatch]);

  // Get event type
  useEffect(() => {
    let arr = [];
    if (publicEvents) {
      publicEvents.forEach((item) => {
        if (item.eventType === type) {
          arr.push(item);
        }
      });
      setData(arr);
    }
  }, [publicEvents, type]);

  // console.log(data?.length);

  return (
    <>
      <Header />

      <div className="mt-5 flex justify-between items-center">
        <BackButton />

        <div>
          <h3 className="font-bold text-lg">{type}</h3>
        </div>
      </div>

      <section>
        <div className="mb-5">{data && <EventStatusTabs events={data} />}</div>
      </section>
    </>
  );
}

export default CategoryPage;
