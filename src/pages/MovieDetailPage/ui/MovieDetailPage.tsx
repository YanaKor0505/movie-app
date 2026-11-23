import { MovieDetails } from "@/entities";
import { useParams } from "react-router-dom";

function MovieDetailPage() {
  const { movieId } = useParams();

  return <MovieDetails movieId={Number(movieId)} />;
}

export default MovieDetailPage;
