"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setListUsers } from "@/redux/features/listuser";
import ErrorAuthorization from "../Errors/ErrorAuthorization";
import useGetAllUsers from "@/redux/api/userservice/userservicelist";

export default function ListUser() {
  // Manage state
  const [token, setToken] = useState("");

  // Get token from store redux
  const tokenRedux = useSelector((state: any) => state.auth.token);

  // Get users from store redux
  const usersRedux = useSelector((state: any) => state.listuser.listUsers);

  // Get router
  const router = useRouter();

  // Get dispatch
  const dispatch = useDispatch();

  // Get all users
  const getAllUsers = useGetAllUsers();

  // Set users from getAllUsers
  useEffect(() => {
    dispatch(setListUsers(getAllUsers));
  }, [dispatch, getAllUsers]);

  // Get token from store redux
  useEffect(() => {
    setToken(tokenRedux);
  }, [tokenRedux]);

  if (!token) {
    const errorMessage = {
      id: "404",
      message: "Not authorized to access this page",
    };
    return (
      <div>
        <ErrorAuthorization id={errorMessage.id} error={errorMessage} />
      </div>
    );
  }

  // Handle Create
  const handleCreate = () => {
    // Redirect to create user
    router.push("/user/create");
  };

  // Handle Update
  const handleUpdate = (user: any) => {
    // Redirect to update user
    router.push(`/user/update?id=${user.id}`);
  };

  // Handle Details
  const handleDetails = (user: any) => {
    // Redirect to update user
    router.push(`/user/detail?id=${user.id}`);
  };

  // Handle Delete
  const handleDelete = (user: any) => {
    // Redirect to update user
    router.push(`/user/delete?id=${user.id}`);
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
              {usersRedux?.map((user: any) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <button
                      className="btn btn-primary rounded m-1 p-1 w-20"
                      onClick={() => handleUpdate(user)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-secondary rounded m-1 p-1 w-20"
                      onClick={() => handleDetails(user)}
                    >
                      Details
                    </button>
                    <button
                      className="btn btn-accent rounded m-1 p-1 w-20"
                      onClick={() => handleDelete(user)}
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