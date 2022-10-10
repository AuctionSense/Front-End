const { default: React } = require("react");
const { useLocation } = require("react-router-dom");
const { GetAllItemsByCategory } = require("services/ItemService");

function Cars() {
    const location = useLocation();
    const category = location.pathname.replace("/", "");
    const { error, isLoaded, items }  = GetAllItemsByCategory(category);

  if (!isLoaded) {
    return <>{"Loading..."}</>;
  }
  else if(error)
  {
    return (
    <>
      {error.message}
    </>
    );
  }
    else {
      return (
        <div>
          {items.map((item) => (
            <div key={item.id}>
              <h1>{item.name}</h1>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      );
    }
  }

  export default Cars;