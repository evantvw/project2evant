// import List from "../list/List";
import Summary from "../summary/Summary";
import "./Home.css";

const Home = () => {
  return (
    <div className="container-home">
      <div className="head-home">
        <h1 className="text-5xl font-bold ">Dashboard</h1>
      </div>
      <Summary />
    </div>
  );
};

export default Home;
