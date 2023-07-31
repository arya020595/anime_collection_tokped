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
  const default_cover_collection = 'https://deconova.eu/wp-content/uploads/2016/02/default-placeholder.png'

  useEffect(() => {
    localStorage.setItem("collections", JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {

    setCollections(getLocalItems());
  }, [dataDetail]);

  const handleRemove = (element: string) => {
    let text = `Are you sure remove collection "${element
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
    <div style={{padding: "0 50px"}}>
      <div
        style={{
          margin: "0 auto",
          textAlign: "center",
          fontSize: "18px",
          fontWeight: "600",
          padding: "20px 0",
        }}
      >
      </div>

      <div style={{ marginBottom: "10px" }}>
        <button className="button-action" style={{backgroundColor: "#4f74c8"}}
          onClick={() => {
            setOpenModalAdd(true);
          }}
        >
          Create New Collection
        </button>
      </div>

      <div style={{overflowX: "auto"}}>
        <table>
          <thead>
            <tr>
              <th>Cover Collection</th>
              <th>Collection Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(collections).map((element: string, index: number) => (
              <tr key={index}>
                <td>
                  {
                    collections[element][0] ?  
                      <img width={100} alt={collections[element][0].title.romaji} src={`${collections[element][0].coverImage.medium}`} />
                    : 
                      <img width={100} alt='default_cover_collection' src={`${default_cover_collection}`} />
                  }
                </td>
                <td>
                  <Link style={{fontSize: "large"}} key={index} to={`/my-collection/${index}`}>
                    {element.split("_").join(" ")}
                  </Link>
                </td>
                <td>
                  <button className="button-action" style={{backgroundColor: "#e7e7e7", color: "#333"}}
                    onClick={() => {
                      setOpenModal(true);
                      setDataDetail(element);
                    }}
                  >
                    Edit
                  </button>{" "}
                  <button className="button-action" style={{backgroundColor: "#f44336"}} onClick={() => handleRemove(element)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
