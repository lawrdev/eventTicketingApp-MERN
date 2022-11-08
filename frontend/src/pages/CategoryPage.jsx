import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCategoryEvents } from "../features/event/eventSlice";
import { snack } from "../features/global/globalSlice";
import { Header } from "../components/Header";
import BackButton from "../components/BackButton";
import EventStatusTabs from "../components/EventStatusTabs";
import Spinner from "../components/Spinner";

function CategoryPage() {
  const { categoryEvents } = useSelector((state) => state.event);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const { type } = useParams();

  // GET ALL EVENTS - [public]
  useEffect(() => {
    setLoading(true);
    dispatch(getCategoryEvents(type))
      .unwrap()
      .then(() => {
        // if successfull
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        dispatch(snack(error));
      });
  }, [dispatch, type]);

  if (loading) return <Spinner />;

  return (
    <div className="px-3 sm:px-6">
      <Header />

      <div className="mt-5 mb-9 flex justify-between items-center">
        <BackButton />

        <div>
          <h3 className="font-bold text-lg">{type}</h3>
        </div>
      </div>

      <section className="mb-10">
        <div className="mb-5">
          {categoryEvents && <EventStatusTabs events={categoryEvents} />}
        </div>
      </section>
    </div>
  );
}

export default CategoryPage;
