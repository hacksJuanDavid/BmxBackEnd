"use client";
import ErrorAuthorization from "../Errors/ErrorAuthorization";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
const { v4: uuidv4 } = require("uuid");

export default function ListBike() {
  // Interface Bike
  interface Bike {
    id: number;
    name: string;
    brand: string;
    model: string;
    color: string;
    frame: string;
    fork: string;
    bars: string;
    stem: string;
    grips: string;
    seat: string;
    seatPost: string;
    cranks: string;
    pedals: string;
    sprocket: string;
    frontWheel: string;
    rearWheel: string;
    frontTire: string;
    rearTire: string;
    frontHub: string;
    rearHub: string;
    chain: string;
    pegs: string;
  }

  // Manage state
  const [Bikes, setBikes] = useState<Bike[]>([]);
  const [error, setError] = useState<{ id: string; message: string } | null>(
    null
  );

  // Get token
  const token = localStorage.getItem("token");

  // Generate id error
  const idError = useMemo(() => uuidv4(), []);

  // Get Router
  const router = useRouter();

  // Call manage to API
  const getBikes = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BMX_URL}Bike`,
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

      setBikes(data);
    } catch (error) {
      console.error("Ocurrió un error al obtener las bicicletas:", error);
      setError({ id: idError, message: "Error you get you credentials" });
    }
  }, [token, idError]);

  // Manage useEffect
  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        await getBikes();
      }
    };
    fetchData();
  }, [token, getBikes]);

  if (error) {
    return (
      <div>
        <ErrorAuthorization id={idError} error={error} />
      </div>
    );
  }

  // Handle Create
  const handleCreate = () => {
    // Redirect to create
    router.push("/bike/create");

    console.log("Create");
  };

  // Handle handleUpdate
  const handleUpdate = (id: number) => {
    // Redirect to update
    router.push("/bike/update");

    console.log("Update", id);
  };

  // Handle Details
  const handleDetails = (id: number) => {
    // Redirect to details
    router.push("/bike/detail");

    console.log("Details", id);
  };

  // Handle Delete
  const handleDelete = (id: number) => {
    // Redirect to delete
    router.push("/bike/delete");

    console.log("Delete", id);
  };

  return (
    <>
      <h1 className="text-5xl font-bold text-center m-2 p-1">List Bikes</h1>
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
                <th>Name</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Color</th>
                <th>Frame</th>
                <th>Fork</th>
                <th>Bars</th>
                <th>Stem</th>
                <th>Grips</th>
                <th>Seat</th>
                <th>Seatpost</th>
                <th>Cranks</th>
                <th>Pedals</th>
                <th>Sprocket</th>
                <th>Front Wheel</th>
                <th>Rear Wheel</th>
                <th>Front Tire</th>
                <th>Rear Tire</th>
                <th>Front Hub</th>
                <th>Rear Hub</th>
                <th>Chain</th>
                <th>Pegs</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Bikes.map((bike) => (
                <tr key={bike.id}>
                  <td>{bike.id}</td>
                  <td>{bike.name}</td>
                  <td>{bike.brand}</td>
                  <td>{bike.model}</td>
                  <td>{bike.color}</td>
                  <td>{bike.frame}</td>
                  <td>{bike.fork}</td>
                  <td>{bike.bars}</td>
                  <td>{bike.stem}</td>
                  <td>{bike.grips}</td>
                  <td>{bike.seat}</td>
                  <td>{bike.seatPost}</td>
                  <td>{bike.cranks}</td>
                  <td>{bike.pedals}</td>
                  <td>{bike.sprocket}</td>
                  <td>{bike.frontWheel}</td>
                  <td>{bike.rearWheel}</td>
                  <td>{bike.frontTire}</td>
                  <td>{bike.rearTire}</td>
                  <td>{bike.frontHub}</td>
                  <td>{bike.rearHub}</td>
                  <td>{bike.chain}</td>
                  <td>{bike.pegs}</td>
                  <td>
                    <button
                      className="btn btn-primary rounded m-1 p-1 w-20"
                      onClick={() => handleUpdate(bike.id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-secondary rounded m-1 p-1 w-20"
                      onClick={() => handleDetails(bike.id)}
                    >
                      Details
                    </button>
                    <button
                      className="btn btn-accent rounded m-1 p-1 w-20"
                      onClick={() => handleDelete(bike.id)}
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
