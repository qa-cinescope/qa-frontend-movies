"use client";

import { useEffect, useState } from "react";
import { Control, Controller, FieldErrors, SubmitHandler, UseFormRegister } from "react-hook-form";

import LoadingSpinner from "@components/LoadingSpinner";
import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Textarea } from "@components/ui/textarea";
import { getGenres } from "@lib/api";
import { Genre, Location, Movie } from "@lib/types";

import { MovieFormSchema } from "./MovieFormSchema";

interface MovieDialogFormProps {
  title: string;
  description?: string;
  footerButtonText: string;
  register: UseFormRegister<MovieFormSchema>;
  handleSubmit: (onValid: SubmitHandler<MovieFormSchema>) => any;
  errors: FieldErrors<MovieFormSchema>;
  control: Control<MovieFormSchema>;
  onSubmit: SubmitHandler<MovieFormSchema>;
  movie?: Movie;
  isLoading: boolean;
}

const MovieDialogForm = ({
  title,
  description,
  footerButtonText,
  register,
  movie,
  handleSubmit,
  onSubmit,
  errors,
  control,
  isLoading,
}: MovieDialogFormProps) => {
  const [genres, setGenres] = useState<Genre[]>([]);

  const fetchGenres = async () => {
    const genres = await getGenres();

    if (genres) {
      setGenres(genres);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="mt-3">
          <Label htmlFor="name">Название</Label>
          <Input
            id="name"
            defaultValue={movie?.name || ""}
            {...register("name", { required: true, minLength: 1 })}
          />
          {errors.name && (
            <p className="mt-1 text-red-500 text-sm">{errors.name.message as string}</p>
          )}
        </div>
        <div className="mt-3">
          <Label htmlFor="description">Описание</Label>
          <Textarea
            id="description"
            defaultValue={movie?.description || ""}
            {...register("description", { required: true })}
          />
          {errors.description && (
            <p className="mt-1 text-red-500 text-sm">{errors.description.message as string}</p>
          )}
        </div>
        <div className="mt-3">
          <Label htmlFor="price">Цена</Label>
          <Input
            type="number"
            id="price"
            min={1}
            defaultValue={movie?.price || 100}
            {...register("price", { required: true, min: 1, valueAsNumber: true })}
          />
          {errors.price && (
            <p className="mt-1 text-red-500 text-sm">{errors.price.message as string}</p>
          )}
        </div>
        <div className="mt-3">
          <Label htmlFor="location">Местоположение</Label>
          <Controller
            control={control}
            name="location"
            defaultValue={movie?.location || Location.MSK}
            render={({ field }) => (
              <Select value={field.value.toString()} onValueChange={field.onChange}>
                <SelectTrigger id="location">
                  <SelectValue placeholder="Выберите местоположение" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Location).map((location) => (
                    <SelectItem
                      className="cursor-pointer"
                      key={location}
                      value={location}
                      onSelect={field.onChange}
                    >
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.location && (
            <p className="mt-1 text-red-500 text-sm">{errors.location.message as string}</p>
          )}
        </div>
        <div className="mt-3">
          <Label htmlFor="imageUrl">Ссылка на изображение</Label>
          <Input
            id="imageUrl"
            type="url"
            defaultValue={movie?.imageUrl || ""}
            {...register("imageUrl", { required: true })}
          />
          {errors.imageUrl && (
            <p className="mt-1 text-red-500 text-sm">{errors.imageUrl.message as string}</p>
          )}
        </div>
        <div className="mt-3">
          <Label htmlFor="genreId">Жанр</Label>
          <Controller
            control={control}
            name="genreId"
            defaultValue={movie?.genreId || 0}
            render={({ field }) => (
              <Select
                value={field.value.toString()}
                onValueChange={(value) => {
                  field.onChange(+value);
                }}
              >
                <SelectTrigger id="genreId">
                  <SelectValue placeholder="Выберите жанр" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem
                      className="cursor-pointer"
                      key={genre.id}
                      value={genre.id.toString()}
                      onSelect={field.onChange}
                    >
                      {genre.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.genreId && (
            <p className="mt-1 text-red-500 text-sm">{errors.genreId.message as string}</p>
          )}
        </div>
        <div className="mt-3 h-10 flex items-center">
          <Controller
            name="published"
            control={control}
            defaultValue={movie?.published || false}
            render={({ field }) => (
              <>
                <Checkbox
                  id="published"
                  className="h-[18px] w-[18px]"
                  defaultChecked={field.value}
                  onCheckedChange={() => field.onChange(!field.value)}
                  {...register("published")}
                />

                <Label htmlFor="published" className="ml-2">
                  Опубликован
                </Label>
              </>
            )}
          />
          {errors.published && (
            <p className="mt-1 text-red-500 text-sm">{errors.published.message as string}</p>
          )}
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600" disabled={isLoading}>
            {isLoading ? <LoadingSpinner size={16} /> : footerButtonText}
          </Button>
          <DialogClose id="closeDialog" />
        </DialogFooter>
      </form>
    </>
  );
};

export default MovieDialogForm;