import { MoreVertical } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

interface ReviewUserActionsProps {
  handleEdit?: () => void;
  handleDelete?: () => void;
}

const ReviewUserActions = ({ handleEdit, handleDelete }: ReviewUserActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-5">
        <MoreVertical className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer" onClick={handleEdit}>
          Редактировать
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={handleDelete}>
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ReviewUserActions;