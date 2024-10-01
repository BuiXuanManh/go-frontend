import Crew from 'src/types/Crew';
import Movie from 'src/types/Movie';

export const getColor = (rating: number | undefined) => {
  if (rating === undefined) return 'border-gray-400';
  if (rating >= 8) return 'border-green-600';
  if (rating >= 6) return 'border-primary'; // Assuming 'border-primary' is a valid CSS class name.
  return 'border-red-600';
};
export function mapJsonToCrews(jsonData: any): Crew[] {
  return jsonData.map((crew: string) => {
    const crewData = JSON.parse(crew);
    return {
      id: crewData.id,
      name: crewData.name,
      job: crewData.job,
      department: crewData.department,
      profile_path: crewData.profile_path,
      gender: crewData.gender !== 0
    };
  });
}

export function mapJsonToCasts(jsonData: any): Cast[] {
  return jsonData.slice(0, 9).map(cast => {
    const castData = JSON.parse(cast);
    return {
      id: castData.id,
      name: castData.name,
      character: castData.character,
      profilePath: castData.profile_path,
      order: castData.order,
      gender: castData.gender !== 0
    };
  });
}

export function mapJsonToMovie(jsonData: any): Movie {
  return {
    id: jsonData?.id ?? null,
    title: jsonData?.title ?? null,
    releaseDate: jsonData?.release_date ? new Date(jsonData.release_date) : null,
    rating: jsonData?.vote_average ?? null,
    genres: jsonData?.genres?.map(genre => genre.name) ?? [],
    productionCountries:
      jsonData?.production_countries?.map(country => country.iso_3166_1).join(', ') ?? null,
    posterPath: jsonData?.poster_path ?? null,
    backdropPath: jsonData?.backdrop_path ?? null,
    status: jsonData?.status ?? null,
    originalLanguage: jsonData?.original_language ?? null,
    budget: jsonData?.budget ?? null,
    revenue: jsonData?.revenue ?? null,
    homepage: jsonData?.homepage ?? null,
    runtime: jsonData?.runtime ? minutesToHourMinuteString(jsonData.runtime) : null,
    tagline: jsonData?.tagline ?? null,
    overview: jsonData?.overview ?? null
  };
}
export function formatDateToDDMMYYYY(date: Date | null | undefined): string {
  if (!date) {
    return '';
  }
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export function buildImageUrl(imagePath: string | null | undefined, size: string): string {
  if (!imagePath) {
    return '';
  }
  const baseURL = 'https://image.tmdb.org/t/p/';
  const validSizes = ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'];
  if (validSizes.includes(size)) {
    imagePath = imagePath.replace(/^\//, '');

    const imageUrl = `${baseURL}${size}/${imagePath}`;
    return imageUrl;
  } else {
    throw new Error('Invalid image size');
  }
}

export function buildUserImageUrl(username: string, background = '13b6dc', color: 'fff'): string {
  return `https://ui-avatars.com/api/?background=${background}&name=${username}&color=${color}&size=256`;
}

function minutesToHourMinuteString(minutes: number): string {
  if (minutes < 0) {
    throw new Error('Input must be a non-negative number of minutes.');
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hourString = hours > 0 ? `${hours}h` : '';
  const minuteString = remainingMinutes > 0 ? `${remainingMinutes}m` : '';

  if (hourString && minuteString) {
    return `${hourString} ${minuteString}`;
  } else {
    return hourString || minuteString || '0 minutes'; // Return "0 minutes" if both are zero.
  }
}

export function buildCastWikiReference(castName: string) {
  if (castName === undefined) return '';
  return 'https://en.wikipedia.org/wiki/' + castName.split(' ').join('_');
}

// "backdrop_sizes": [
//     "w300",
//     "w780",
//     "w1280",
//     "original"
//   ],
//   "logo_sizes": [
//     "w45",
//     "w92",
//     "w154",
//     "w185",
//     "w300",
//     "w500",
//     "original"
//   ],
//   "poster_sizes": [
//     "w92",
//     "w154",
//     "w185",
//     "w342",
//     "w500",
//     "w780",
//     "original"
//   ],
//   "profile_sizes": [
//     "w45",
//     "w185",
//     "h632",
//     "original"
//   ],
//   "still_sizes": [
//     "w92",
//     "w185",
//     "w300",
//     "original"
//   ]
// },
