import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// DetailsUser page
export default function DetailsUser() {
  // Manage state
  const [id, setId] = useState(0);

  // Get router
  const router = useRouter();

  // Get user from store redux
  const usersRedux = useSelector((state: any) => state.listuser.listUsers);

  // Get user from query
  const userRedux = usersRedux.find((user: any) => user.id === id);

  // Handle to user page
  const handleUserPage = () => {
    router.push("/user");
  };

  // Set user id
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idUrl = urlParams.get("id");
    if (idUrl) {
      setId(Number(idUrl));
    }
  }, []);

  return (
    <>
      <div className="hero min-h-screen bg-base-100">
        <div className="hero-content">
          <div className="card shadow-lg compact side bg-base-200">
            <div className="card-body overflow-x-auto">
              <h1 className="text-3xl font-bold text-center m-2 p-1">
                Details User
              </h1>
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
                  <tr key={userRedux?.id}>
                    <td>{userRedux?.id}</td>
                    <td>{userRedux?.username}</td>
                    <td>{userRedux?.email}</td>
                    <td>{userRedux?.password}</td>
                    <td>
                      <button
                        className="btn bg-green-950 rounded m-1 p-1 w-20 text-white"
                        onClick={() => handleUserPage()}
                      >
                        Back
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
