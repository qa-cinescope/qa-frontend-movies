"use client";

import { Card, CardContent, CardHeader } from "@components/ui/card";
import { Review } from "@lib/types";
import Rating from "../../Rating";
import PersonalReviewActions from "./PersonalReviewActions";
import { getUserSession } from "@hooks/getUserSession";
import Link from "next/link";
import { useState } from "react";
import ReviewCard from "../ReviewCard";
import ReviewForm from "./ReviewForm";
import { deleteReview } from "@lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface PersonalReviewProps {
  review?: Review;
  movieId: number;
}

const PersonalReview = ({ review, movieId }: PersonalReviewProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const router = useRouter();

  const { accessToken } = getUserSession();

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleDelete = async () => {
    const status = await deleteReview(movieId, accessToken!);

    if (status !== 200) {
      toast.error("Произошла ошибка");
      return;
    }

    toast.success("Отзыв успешно удален");
    router.refresh();
  };

  if (!accessToken) {
    return (
      <p className="mt-5 text-xl">
        <Link className="underline" href="/login">
          Войдите
        </Link>
        , чтобы оставить отзыв
      </p>
    );
  }

  return (
    <div className="w-full mt-5">
      {isFormOpen || !review ? (
        <ReviewForm review={review} movieId={movieId} closeForm={closeForm} />
      ) : (
        <ReviewCard
          {...review}
          hidden={false}
          actions={<PersonalReviewActions handleDelete={handleDelete} handleEdit={openForm} />}
        />
      )}
    </div>
  );
};

export default PersonalReview;