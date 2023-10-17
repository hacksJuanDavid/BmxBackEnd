"use client";
import ErrorAuthorization from "../Errors/ErrorAuthorization";
import { useState, useEffect, useCallback, useMemo } from "react";
const { v4: uuidv4 } = require("uuid");

export default function ListUser() {
  // Interface User
  interface User {
    id: number;
    username: string;
    email: string;
    password: string;
  }

  // Manejar las variables de estado
  const [Users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<{ id: string; message: string } | null>(
    null
  );

  // Get token
  const token = localStorage.getItem("token");
  // Generate id error
  const idError = useMemo(() => uuidv4(), []);

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

  // Handle Edit
  const handleEdit = (id: number) => {
    console.log("Edit", id);
  };

  // Handle Details
  const handleDetails = (id: number) => {
    console.log("Details", id);
  };

  // Handle Delete
  const handleDelete = (id: number) => {
    console.log("Delete", id);
  };

  return (
    <>
      <h1 className="text-5xl font-bold text-center m-2 p-1">ListUser</h1>
      <div className="card shadow-lg compact side bg-base-100">
        <div className="card-body overflow-x-auto">
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
                      onClick={() => handleEdit(user.id)}
                    >
                      Edit
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
