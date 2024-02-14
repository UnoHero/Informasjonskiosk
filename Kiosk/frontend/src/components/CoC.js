import React, { useState, useEffect } from "react";

const CoC = () => {
  const [userData, setUserData] = useState(null); // Initialize with null
  const user = "Scott";

  async function cocUser() {
    try {
      const response = await fetch(`http://127.0.0.1:3001/coc/${user}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Call the function to fetch data when the component mounts
  useEffect(() => {
    cocUser();
  }, []); // Empty dependency array ensures it only runs once when the component mounts

  return (
    <div>
      {userData && <pre>{JSON.stringify(userData, null, 2)}</pre>}
    </div>
  );
};

export default CoC;
