import "../assets/Modal.css";
import { useState, useEffect } from "react";

export default function ModalFormEditCollection({
  closeModal,
  dataDetail,
  setDataDetail,
}: {
  closeModal: any;
  dataDetail: any;
  setDataDetail: any;
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
    localStorage.setItem("collections", JSON.stringify(collections));
  }, [collections]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const collection_name = document.getElementById(
      "collection_name"
    ) as HTMLInputElement;

    if (collection_name.value === "") {
      alert("Field new collection can't blank");
    } else {
      let format = /[!@#$%^&*()_+\-=\]{};':"\\|,.<>?]+/;
      let split_name = collection_name.value.trim().split(" ");
      let name_collection = split_name.join("_");

      if (collections.hasOwnProperty(collection_name)) {
        alert("Collection Name Already Exist! Please Put Another Name");
        return;
      }

      if (format.test(name_collection)) {
        alert("Collection Name Can't Have Special Character!");
        return;
      }

      setCollections((current: any) => {
        // create copy of state object
        const copy = { ...current };
        // create new key with new value
        delete Object.assign(copy, { [name_collection]: copy[dataDetail] })[
          dataDetail
        ];

        return copy;
      });

      setDataDetail(name_collection);

      alert(`Name Collection success updated`);

      collection_name.value = "";
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
          Change Name Collection
        </div>

        <div id="modal-body" style={{ marginTop: "35px" }}>
          <div id="new_collection" style={{ display: "flex" }}>
            <div style={{ display: "flex", width: "150px" }}>
              Name Collection
            </div>
            <div
              style={{ display: "flex", width: "150px", marginLeft: "50px" }}
            >
              <input
                style={{ width: "100%" }}
                type="input"
                id="collection_name"
                name="collection_name"
                defaultValue={dataDetail}
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
