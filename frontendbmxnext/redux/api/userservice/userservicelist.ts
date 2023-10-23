import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

// Get all users
const useGetAllUsers = () => {
  const token = useSelector((state: any) => state.auth.token);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BMX_URL}User`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        throw new Error("Error get to users");
      }
    };

    fetchData();
  }, [token]);

  return users;
};

export default useGetAllUsers;
