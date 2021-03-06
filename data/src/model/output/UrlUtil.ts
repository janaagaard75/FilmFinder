import { Movie } from "./Movie"

export class UrlUtil {
  private static readonly standardUrlPrefix = "http://www.kino.dk/"
  private static readonly movieUrlPrefix = UrlUtil.standardUrlPrefix + "film/"
  private static readonly showingUrlPrefix = UrlUtil.standardUrlPrefix + "ticketflow/"
  private static readonly theaterUrlPrefix = UrlUtil.standardUrlPrefix + "biografer/"

  public static getMovieUrl(prefixedMovieUrl: string): string | undefined {
    if (prefixedMovieUrl === Movie.noMovieUrl) {
      return undefined
    }

    const movieUrl = prefixedMovieUrl.slice(this.movieUrlPrefix.length)
    return movieUrl
  }

  public static getShowingId(prefixedShowingUrl: string): number {
    const showingId = parseInt(prefixedShowingUrl.slice(UrlUtil.showingUrlPrefix.length), 10)
    return showingId
  }

  public static getTheaterId(prefixedTheaterUrl: string): string {
    const slicedUrl = prefixedTheaterUrl.slice(this.theaterUrlPrefix.length)
    return slicedUrl
  }
}