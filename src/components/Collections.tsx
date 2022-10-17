import "../assets/Collection.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ModalFormEditCollection from "./ModalFormEditCollection";
import ModalFormAddCollection from "./ModalFormAddCollection";

export default function Collections() {
  const getLocalItems = () => {
    let list = localStorage.getItem("collections");

    if (list) {
      return JSON.parse(localStorage.getItem("collections") || "{}");
    } else {
      return [];
    }
  };

  const [collections, setCollections]: any[] = useState(getLocalItems());
  const [openModal, setOpenModal] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [dataDetail, setDataDetail] = useState({});

  useEffect(() => {
    localStorage.setItem("collections", JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    console.log("TERPNAGGIL KAKAK");

    setCollections(getLocalItems());
  }, [dataDetail]);

  const handleRemove = (element: string) => {
    let text = `Are you sure delete collection "${element
      .split("_")
      .join(" ")}"?`;

    if (window.confirm(text) === true) {
      setCollections((current: any) => {
        // create copy of state object
        const copy = { ...current };

        // remove key from object
        delete copy[element];

        return copy;
      });
    } else {
      return;
    }
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <div
        style={{
          margin: "0 auto",
          textAlign: "center",
          fontSize: "18px",
          fontWeight: "600",
          padding: "20px 0",
        }}
      >
        List Collections
      </div>

      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={() => {
            setOpenModalAdd(true);
          }}
        >
          Add Collection
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Collection Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(collections).map((element: string, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <Link key={index} to={`/my-collection/${index}`}>
                  {element.split("_").join(" ")}
                </Link>
              </td>
              <td>
                <button
                  onClick={() => {
                    setOpenModal(true);
                    setDataDetail(element);
                  }}
                >
                  Edit
                </button>{" "}
                | <button onClick={() => handleRemove(element)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openModal && (
        <ModalFormEditCollection
          closeModal={setOpenModal}
          dataDetail={dataDetail}
          setDataDetail={setDataDetail}
        />
      )}

      {openModalAdd && (
        <ModalFormAddCollection
          closeModal={setOpenModalAdd}
          dataDetail={dataDetail}
          setDataDetail={setDataDetail}
        />
      )}
    </div>
  );
}
