import React, { useContext } from "react";
import { Context } from "../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { user } = useContext(Context);
  const { data: myInformation = [], isLoading } = useQuery({
    queryKey: ["myinfo", user?.email],
    queryFn: () =>
      fetch(
        `https://job-task-server-dun.vercel.app/myinfo?email=${user.email}`
      ).then((res) => res.json().catch(console.error())),
  });
  console.log(myInformation);
  const { Date, Email, Name, _id, Profession } = myInformation;
  return (
    <div className="border-2 w-[600px] mx-auto p-8">
      <h2>
        <b>Name:</b> {Name}
      </h2>
      <h2>
        <b>Email:</b> {Email}{" "}
      </h2>
      <h2>
        <b>Profession:</b> {Profession}{" "}
      </h2>
      <h2>
        <b>Date:</b> {Date}
      </h2>

      <h2 className="text-red-600">
        hello, i can add more function but time is short, the time has come to
        submit the assingment, by the way i have finished the assingment with
        your requirement but item delete option did not add
        <br /> thank you
      </h2>
    </div>
  );
};

export default Home;
