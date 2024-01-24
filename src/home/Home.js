import Piechart from "../piechart/Piechart";
import Summary from "../summary/Summary";
import "./Home.css";

const Home = ({ setOpen }) => {
  return (
    <div className="container-home">
      <div className="head-home">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 hidden sm:block"
          onClick={() => setOpen(true)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>

        <h1 className="title">Dashboard</h1>
      </div>
      <Summary />
      <div className="container-piechart text-center">
        <Piechart />
      </div>
    </div>
  );
};

export default Home;
