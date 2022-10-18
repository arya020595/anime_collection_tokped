import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import "../assets/Product.css";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import "../assets/Modal.css";

const PRODUCTS = gql`
  query Query($page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(search: $search) {
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

export default function AnimeList() {
  const PER_PAGE = 14;
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [dataDetail, setDataDetail] = useState({});

  const { loading, error, data } = useQuery(PRODUCTS, {
    variables: {
      perPage: PER_PAGE,
      page: page,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const pageNumber = [];

  for (let index = 1; index <= 10; index++) {
    pageNumber.push(index);
  }

  return (
    <div>
      <div className="grid-container">
        {data.Page.media.map(
          (data:any) => (
            <div key={data.id} className="grid-item">
              <Link key={data.id} className="text-link" to={`/product/${data.id}`}>
                <div className="card-image">
                  <img alt={data.title.romaji} src={`${data.coverImage.large}`} />
                </div>
              </Link>
              <div className="card-detail">
                {data.title.romaji}
                <div style={{ marginTop: "10px" }}>
                  <button onClick={() => {
                    setOpenModal(true)
                    setDataDetail(data)
                  }
                  }>Add to Collection</button>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <div className="center">
        <div className="pagination">
          <a
            className={`${page === 1 ? "disabled" : ""}`}
            onClick={() => setPage((prev) => prev - 1)}
          >
            &laquo;
          </a>
          {pageNumber.map((number) => (
            <a
              className={`${
                data.Page.pageInfo.currentPage === number ? "active" : ""
              }`}
              key={number}
              onClick={() => setPage(number)}
            >
              {number}
            </a>
          ))}
          <a
            className={`${page === 10 ? "disabled" : ""}`}
            onClick={() => setPage((prev) => prev + 1)}
          >
            &raquo;
          </a>
        </div>
      </div>

      {
        openModal && <Modal closeModal={setOpenModal} dataDetail={dataDetail}/>
      }
    </div>
  );
}
