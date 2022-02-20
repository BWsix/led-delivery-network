import axios from "axios";
import type { NextPage } from "next";
import { useEffect } from "react";

const Home: NextPage = () => {
  const led = async (status: "on" | "off") => {
    const url = "/api/led?" + status + "=1";
    const result = await axios.get(url);
    console.log(result.data);
  };

  useEffect(() => {
    axios.get("/api/led");
  }, []);

  return (
    <>
      <button onClick={() => led("on")}>on</button>
      <button onClick={() => led("off")}>off</button>
    </>
  );
};

export default Home;
