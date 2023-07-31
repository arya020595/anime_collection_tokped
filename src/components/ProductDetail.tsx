import {useParams} from "react-router-dom"
import { useQuery, gql } from "@apollo/client";
import "../assets/ProductDetail.css";

export default function AnimeDetail() {

    const {productId} = useParams()
    
    const PRODUCT_DETAIL = gql`
    query Media($mediaId: Int) {
        Media(id: $mediaId) {
            id
            title {
                romaji
            }
            episodes
            bannerImage
            genres
            averageScore
            description
        }
    }
    `;

    const { loading, error, data } = useQuery(PRODUCT_DETAIL, {
        variables: {
            mediaId: productId,
        },
    });
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

  return (
    <div id="wrapper-detail-page">

        <div id="title-detail-page">{data.Media.title.romaji}</div>

        <div id="section-image-detail-page">
            <img alt={data.Media.title.romaji} width="100%" src={`${data.Media.bannerImage}`} />
        </div>

        <div id="detail-detail-page">
            <div><span>Genres:</span> {data.Media.genres.map((genre:string, index:number) => `${genre}${index === data.Media.genres.length - 1 ? "" : ", "}`)}</div>
            <div><span>Episodes:</span> {data.Media.episodes} eps</div>
            <div><span>Rating:</span> {data.Media.averageScore}%</div>
        </div>
    
        <div id="description-detail-page">
            {data.Media.description}
        </div>
    </div>
  )
}
