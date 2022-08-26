import React, { useState } from "react";

const Birthdays = () => {
  const [birthdayEvents, setBirthdayEvents] = useState([]);

//   const fetchBirthdays = useCallback(async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:5000/birthdays"
//       );
//       if (!response.ok) {
//         throw new Error("Something went wrong!");
//       }
//       const data = await response.json();
//       const mappedData = data.map((obj) => {
//         return { ...obj, birthDate: new Date(obj.birthDate) };
//       });
//       const sortedData = mappedData.sort(
//         (obj1, obj2) => Number(obj1.birthDate) - Number(obj2.birthDate)
//       );

//       console.log(sortedData);
//       setUsers(sortedData);
//     } catch (error) {
//       setError(error.message);
//     }
//   }, []);
//   useEffect(() => {
//     fetchUsersHandler();
//   }, [fetchUsersHandler]);


  return <p>Birthdays</p>;
};

export default Birthdays;
