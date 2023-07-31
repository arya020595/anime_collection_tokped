import "../assets/Modal.css";
import { useState, useEffect } from "react";

export default function Modal({
  closeModal,
  dataDetail,
}: {
  closeModal: any;
  dataDetail: any;
}) {
  
  const getLocalItems = () => {
    let list = localStorage.getItem("collections");

    if (list) {
      return JSON.parse(localStorage.getItem("collections") || "{}");
    } else {
      return [];
    }
  };

  const [collections, setCollections]: any[] = useState(getLocalItems());

  useEffect(() => {
    let new_collection = document.getElementById(
      "new_collection"
    ) as HTMLInputElement;
    let select_collection = document.getElementById(
      "select_collection"
    ) as HTMLInputElement;

    if (select_collection.value === "new_collection") {
      new_collection.style.display = "flex";
    } else {
      new_collection.style.display = "none";
    }

    localStorage.setItem("collections", JSON.stringify(collections));
  }, [collections]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    let select_collection = document.getElementById(
      "select_collection"
    ) as HTMLInputElement;
    let collection_new = document.getElementById(
      "collection_new"
    ) as HTMLInputElement;

    if (select_collection.value !== "new_collection") {
      if (collections[select_collection.value].some((e: any) => e.id === dataDetail.id)) {
        alert("The anime already exist! Please put another anime");

        return;
      }

      setCollections((current: any) => {
        // create copy of state object
        const copy = { ...current };

        // push value on existing key
        copy[select_collection.value].push(dataDetail);

        return copy;
      });

      alert(
        `Anime "${dataDetail.title.romaji}" success added to collection "${select_collection.value.split("_").join(" ")}"`
      );
    } else {
      if (collection_new.value === "") {
        alert("Field new collection can't blank");
      } else {
        let format = /[!@#$%^&*()_+\-=\]{};':"\\|,.<>?]+/;
        let split_name = collection_new.value.trim().split(" ");
        let collection_name = split_name.join("_");

        if (collections.hasOwnProperty(collection_name)) {
          alert("Collection Name Already Exist! Please Put Another Name");
          return;
        }

        if (format.test(collection_name)) {
          alert("Collection Name Can't Have Special Character!");
          return;
        }

        setCollections((current: any) => {
          // create copy of state object
          const copy = { ...current };
          // create new key with new value
          copy[collection_name as keyof any] = [dataDetail];

          return copy;
        });

        alert(
          `Anime ${dataDetail.title.romaji} success added to collection ${collection_new.value}`
        );
        collection_new.value = "";
      }
    }
  };

  const handleChange = async (e: any) => {
    let new_collection = document.getElementById(
      "new_collection"
    ) as HTMLInputElement;
    if (e.target.value === "new_collection") {
      new_collection.style.display = "flex";
    } else {
      new_collection.style.display = "none";
    }
  };

  return (
    <div
      id="myModal"
      className="modal"
      style={{ display: "block" }}
      onClick={(e: any) => {
        e.preventDefault();
        if (e.target === e.currentTarget) {
          closeModal(false);
        }
      }}
    >
      <div className="modal-content">
        <span className="close" onClick={() => closeModal(false)}>
          &times;
        </span>
        <div
          className="modal-title"
          style={{ textAlign: "center", fontWeight: 600 }}
        >
          Add Anime to My Collections
        </div>

        <div id="modal-body" style={{ marginTop: "35px" }}>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", width: "100%"}}>Anime Title</div>
            <div
              style={{ display: "flex", width: "100%" }}
            >
              {dataDetail.title.romaji}
            </div>
          </div>

          <div style={{ display: "flex", padding: "10px 0" }}>
            <div style={{ display: "flex", width: "100%" }}>
              Collection List
            </div>
            <div
              style={{ display: "flex", width: "100%" }}
            >
              <select
                onChange={handleChange}
                name="select_collection"
                id="select_collection"
                style={{ width: "100%" }}
              >
                <option value="new_collection">
                  -- Add anime to new collection --
                </option>
                {Object.keys(collections).map((element: any, index: any) => (
                  <option key={index} value={element}>
                    {element.split("_").join(" ")}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div id="new_collection" style={{ display: "none" }}>
            <div style={{ display: "flex", width: "100%" }}>
              Create New Collection
            </div>
            <div
              style={{ display: "flex", width: "100%" }}
            >
              <input
                style={{ width: "100%" }}
                type="input"
                id="collection_new"
                name="collection_new"
              />
            </div>
          </div>

          <div style={{ marginTop: "10px" }}>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
