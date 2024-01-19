import Piechart from "../piechart/Piechart";
import Summary from "../summary/Summary";
import "./Home.css";

const Home = ({ setOpen }) => {
  return (
    <div className="container-home sm:w-full">
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

        <h1 className="text-5xl font-bold sm:mt-5 sm:text-center">Dashboard</h1>
      </div>
      <Summary />
      <div className="mt-5 ml-5 lg:w-[77%] md:w-[84%] sm:hidden">
        <Piechart />
      </div>
    </div>
  );
};

export default Home;
