"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { getGenres } from "@lib/api";
import { Genre } from "@lib/types";

const GenresFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [genres, setGenres] = useState<Genre[]>([]);
  const [paramGenreId, setParamGenreId] = useState<string>(searchParams.get("genreId") || "");

  useEffect(() => {
    const fetchGenres = async () => {
      const genres = await getGenres();
      if (!genres) {
        return;
      }
      setGenres(genres);
    };

    fetchGenres();
  }, []);

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("genreId", value);
    params.set("page", "1");

    if (value === "all") {
      params.delete("genreId");
    }

    const newParams = params.toString();

    setParamGenreId(value);

    router.replace(`${pathname}?${newParams}`);
  };

  return (
    <div className="w-36">
      <Select value={paramGenreId} onValueChange={handleChange}>
        <SelectTrigger value={paramGenreId}>
          <SelectValue placeholder="Жанр" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все</SelectItem>
          {genres.map((genre) => (
            <SelectItem key={genre.id} value={String(genre.id)}>
              {genre.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default GenresFilter;