import Item from "../models/Item";
import { useLocation } from "react-router-dom";
import { GetItemById } from "../services/ItemService";

function ItemContainer() {
  let iItem: Item = { id: "", name: "", description: "", category: "" };
  iItem.id = useLocation().state?.id;
  const { error, isLoaded, item } = GetItemById(iItem);

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
  } else if (item) {
    return (
      <div>
        <div key={item.id}>
          <h1>{item.name}</h1>
          <p>{item.description}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Something unexpected happened!</h1>
      </div>
    );
  }
}

export default ItemContainer;
