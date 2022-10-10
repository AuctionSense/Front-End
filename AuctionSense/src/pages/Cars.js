const { default: React } = require("react");
const { useLocation } = require("react-router-dom");
const { GetAllItemsByCategory } = require("services/ItemService");

function Cars() {
    const location = useLocation();
    const category = location.pathname.replace("/", "");
    const items  = GetAllItemsByCategory(category);
  
    if (items.loading != null) {
      return <>{items.loading}</>;
    }
    else if(items.hasError === true)
    {
      return (
      <div>
        {items.message}
      </div>
      );
    }
    else {
      return (
        <div>
          {items.list.map((item) => (
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