import Piechart from "../piechart/Piechart";
import Summary from "../summary/Summary";
import "./Home.css";

const Home = () => {
  return (
    <div className="container-home">
      <div className="head-home">
        <h1 className="text-5xl font-bold ">Dashboard</h1>
      </div>
      <Summary />
      <div className="mt-5 ml-5">
        <Piechart />
      </div>
    </div>
  );
};

export default Home;
