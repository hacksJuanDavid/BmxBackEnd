"use client";
import ErrorAuthorization from "../Errors/ErrorAuthorization";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
const { v4: uuidv4 } = require("uuid");

export default function ListUser() {
  // Interface User
  interface User {
    id: number;
    username: string;
    email: string;
    password: string;
  }

  // Manage state
  const [Users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<{ id: string; message: string } | null>(
    null
  );

  // Get token
  const token = localStorage.getItem("token");

  // Generate id error
  const idError = useMemo(() => uuidv4(), []);

  // Get router
  const router = useRouter();

  // Call manage to API
  const getUsers = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BMX_URL}User`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        setError({
          id: idError,
          message: "Not authorized to access this page",
        });
        return;
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Ocurrió un error al obtener los usuarios:", error);
      setError({ id: idError, message: "Error you get you credentials" });
    }
  }, [token, idError]);

  // Manage useEffect
  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        await getUsers();
      }
    };
    fetchData();
  }, [token, getUsers]);

  if (error) {
    return (
      <div>
        <ErrorAuthorization id={idError} error={error} />
      </div>
    );
  }

  // Handle Create
  const handleCreate = () => {
    // Redirect to create user
    router.push("/user/create");
  };

  // Handle Update
  const handleUpdate = (id: number) => {
    // Redirect to update user
    router.push("/user/update");
    console.log("Update", id);
  };

  // Handle Details
  const handleDetails = (id: number) => {
    // Redirect to update user
    router.push("/user/detail");
    console.log("Details", id);
  };

  // Handle Delete
  const handleDelete = (id: number) => {
    // Redirect to update user
    router.push("/user/delete");
    console.log("Delete", id);
  };

  return (
    <>
      <h1 className="text-5xl font-bold text-center m-2 p-1">List User</h1>
      <div className="card shadow-lg compact side bg-base-100">
        <div className="card-body overflow-x-auto">
          <button
            className="btn bg-green-950 rounded m-1 p-1 w-20"
            onClick={() => handleCreate()}
          >
            Create
          </button>
          <table className="table">
            <thead>
              <tr className="bg-neutral">
                <th>ID</th>
                <th>UserName</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <button
                      className="btn btn-primary rounded m-1 p-1 w-20"
                      onClick={() => handleUpdate(user.id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-secondary rounded m-1 p-1 w-20"
                      onClick={() => handleDetails(user.id)}
                    >
                      Details
                    </button>
                    <button
                      className="btn btn-accent rounded m-1 p-1 w-20"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
