import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function App() {
  const { isLoading, isError, data, error, refetch } = useQuery(
    ["data"],
    async () => {
      const { data } = await axios(`https://randomuser.me/api/`);
      console.log(data);
      return data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error}</h1>;
  }

  const user = data?.results?.[0];

  return (
    <>
      <div>
        <img src={user.picture.large} alt="user id" />
        <h1>
          {data.results[0].name.first} {data.results[0].name.last}
        </h1>
        <button type="button" onClick={refetch}>
          Get User
        </button>
      </div>
    </>
  );
}

export default App;
