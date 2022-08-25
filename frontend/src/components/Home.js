import React, { useState, useEffect, useCallback } from "react";
import NavBar from "./NavBar";
import TableComponent from "./Table";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsersHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://localhost:5000/users/all/62fa1c6d239202b2b8c994d5"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const mappedData = data.map((obj) => {
        return { ...obj, birthDate: new Date(obj.birthDate) };
      });
      const sortedData = mappedData.sort(
        (obj1, obj2) => Number(obj1.birthDate) - Number(obj2.birthDate)
      );

      console.log(sortedData);
      setUsers(sortedData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchUsersHandler();
  }, [fetchUsersHandler]);

  let content = <p>Found no users.</p>;

  if (users.length > 0) {
    content = <TableComponent users={users}></TableComponent>;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <>
      <NavBar></NavBar>
      {content}
    </>
  );
};

export default Home;
