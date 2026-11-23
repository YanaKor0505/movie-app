import { GenreMovies } from "@/widgets";
import { useParams } from "react-router-dom";

function GenrePage() {
  const { genreId } = useParams();

  return <GenreMovies genreId={Number(genreId)} />;
}

export default GenrePage;
