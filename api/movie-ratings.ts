type KinopoiskMovie = {
  rating?: {
    kp?: number | null;
    imdb?: number | null;
  };
};

type KinopoiskResponse = {
  docs: KinopoiskMovie[];
};

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== "GET") {
      return Response.json({ message: "Method not allowed" }, { status: 405 });
    }

    const url = new URL(request.url);
    const movieId = Number(url.searchParams.get("movieId"));

    if (!Number.isInteger(movieId) || movieId <= 0) {
      return Response.json({ message: "Invalid movieId" }, { status: 400 });
    }

    const apiKey = process.env.KINOPOISK_API_KEY;

    if (!apiKey) {
      return Response.json(
        { message: "API key is not configured" },
        { status: 500 },
      );
    }

    try {
      const params = new URLSearchParams({
        "externalId.tmdb": String(movieId),
        limit: "1",
      });

      const response = await fetch(
        `https://api.poiskkino.dev/v1.4/movie?${params}`,
        {
          headers: {
            accept: "application/json",
            "X-API-KEY": apiKey,
          },
        },
      );

      if (!response.ok) {
        return Response.json(
          { message: "Kinopoisk API request failed" },
          { status: 502 },
        );
      }

      const data = (await response.json()) as KinopoiskResponse;
      const movie = data.docs?.[0];

      return Response.json({
        kp: movie?.rating?.kp ?? null,
        imdb: movie?.rating?.imdb ?? null,
      });
    } catch (error) {
      console.error("Kinopoisk API error:", error);

      return Response.json(
        { message: "Internal server error" },
        { status: 500 },
      );
    }
  },
};
