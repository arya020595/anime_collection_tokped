import "../assets/CollectionDetail.css"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

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
          {collections.map((data: any, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <img alt={data.title.romaji} src={`${data.coverImage.medium}`} />
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
  )
}
