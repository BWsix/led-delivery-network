import axios from "axios";
import type { NextPage } from "next";
import { useEffect } from "react";

const Home: NextPage = () => {
  const led = async (status: "on" | "off") => {
    const result = await axios.get(`http://localhost:3000/api/led?${status}=1`);
    console.log(result.data);
  };

  useEffect(() => {
    axios.get("http://localhost:3000/api/led");
  }, []);

  return (
    <>
      <button onClick={() => led("on")}>on</button>
      <button onClick={() => led("off")}>off</button>
    </>
  );
};

export default Home;
