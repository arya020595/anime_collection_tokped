import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import "../assets/Product.css";

export default function CollectionDetail() {
  const { collectionId }: any = useParams()

  const getLocalItems = () => {
    let list = localStorage.getItem("collections")

    if (list) {
      return JSON.parse(localStorage.getItem("collections") || "{}")
    } else {
      return []
    }
  }

  const [collections, setCollections]: any[] = useState(Object.values(getLocalItems())[collectionId])
  const collection_name = Object.keys(getLocalItems())[collectionId]
  
  useEffect(() => {
    // create copy of state object
    let local_items = { ...getLocalItems() }
    let key = Object.keys(local_items)[collectionId]
    local_items[key] = collections

    localStorage.setItem("collections", JSON.stringify(local_items))
  }, [collections])

  const handleRemove = (idProduct: any) => {
    let text = `Are you sure delete this anime?`

    if (window.confirm(text) === true) {
      setCollections((current: any) => {
        let filteredArray = current.filter((e:any) => e.id !== idProduct)

        return filteredArray
      })
    } else {
      return
    }
  }

  return (
    <div style={{padding: "0 50px" }}>
      <div
        style={{
          margin: "30px auto 0",
          textAlign: "center",
          fontSize: "18px",
          fontWeight: "600",
          padding: "20px 0",
        }}
      >
        My {collection_name} Collection
      </div>

      <div className="grid-container">
        {collections.map((data: any, index: number) => (
            <div key={data.id} className="grid-item">
              <Link key={data.id} className="text-link" to={`/product/${data.id}`}>
                <div className="card-image">
                  <img alt={data.title.romaji} src={`${data.coverImage.large}`} />
                </div>
              </Link>
              <div className="card-detail">
                <div className="card-detail-text">{data.title.romaji}</div>
                <div style={{ marginTop: "10px" }}>
                  <button style={{backgroundColor: "#f44336"}} onClick={() => handleRemove(data.id)}>Remove</button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
