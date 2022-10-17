import "../assets/CollectionDetail.css";
import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function CollectionDetail() {
  const { collectionId }: any = useParams();

  const getLocalItems = () => {
    let list = localStorage.getItem("collections");

    if (list) {
      return JSON.parse(localStorage.getItem("collections") || "{}");
    } else {
      return [];
    }
  };

  const [collections, setCollections]: any[] = useState(getLocalItems());
  const [items, setItems]: any[] = useState([]);

  useEffect(() => {
    localStorage.setItem("collections", JSON.stringify(collections));

    console.log("TERPANGGIL KAK");
  }, [collections]);

  const COLLECTION_DETAIL = gql`
    query Page($page: Int, $perPage: Int, $idIn: [Int]) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        media(id_in: $idIn) {
          id
          title {
            romaji
          }
          coverImage {
            medium
            large
          }
        }
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(COLLECTION_DETAIL, {
    variables: {
      idIn: Object.values(collections)[collectionId],
    },
  });

  const handleRemove = (idProduct: any) => {
    let text = `Are you sure delete this anime?`;

    if (window.confirm(text) === true) {
      setCollections((current: any) => {
        // create copy of state object
        const copy = { ...current };
        let key = Object.keys(copy)[collectionId];

        let filteredArray = copy[key].filter((e:any) => e !== idProduct)
        
        copy[key] = filteredArray

        refetch({ idIn: filteredArray });
        return copy;
      });
    } else {
      return;
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

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
        List Anime
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Cover Image</th>
            <th>Anime Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.Page.media.map((data: any, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <img src={`${data.coverImage.medium}`} />
              </td>
              <td>
                <Link key={index} to={`/product/${data.id}`}>
                  {data.title.romaji}
                </Link>
              </td>
              <td>
                <button onClick={() => handleRemove(data.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
