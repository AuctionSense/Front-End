import { Link, useLocation } from "react-router-dom";
import Category from "../models/Category";
import { GetAllItemsByCategory } from "../services/ItemService";

function GamesContainer() {
  const location = useLocation();
  let category: Category = { name: "" };
  category.name = location.pathname.replace("/", "");
  const { error, isLoaded, items } = GetAllItemsByCategory(category);

  if (!isLoaded) {
    return (
      <div>
        <h1>{"Loading..."}</h1>
      </div>
    );
  } else if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  } else if (items)
    return (
      <div>
        {items.map((item) => (
          <div key={item.id}>
            <Link to={`/games/${item.name}`} state={{ id: item.id }}>
              Go to item
            </Link>
            <h1>{item.name}</h1>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    );
  else {
    return (
      <div>
        <h1>Something unexpected happened!</h1>
      </div>
    );
  }
}

export default GamesContainer;
