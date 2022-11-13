import { useEffect } from "react";

function HomePage(props: {setError: any}) {
  const error = null;

  useEffect(() => {
    if (error)
    {
      props.setError(error);
    }
  }, [error, props])
  
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default HomePage;
