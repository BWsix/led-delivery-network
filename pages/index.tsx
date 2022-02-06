import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";

const Home: NextPage = () => {
  const led = async (status: "on" | "off") => {
    const result = await axios.get(`http://localhost:3000/api/led?${status}=1`);
    console.log(result.data);
  };

  return (
    <>
      <button onClick={() => led("on")}>on</button>
      <button onClick={() => led("off")}>off</button>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  await axios.get("http://localhost:3000/api/led?init=1");

  return {
    props: {},
  };
};
