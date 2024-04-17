import { Role, User } from "@lib/types";
import { ColumnDef } from "@tanstack/react-table";
import UserCellActions from "./UserCellActions";
import { getIsSuperAdmin } from "@hooks/getIsSuperAdmin";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-center text-black">Id</div>,
    cell: ({ row }) => (
      <div className="text-center truncate max-w-[80px]">{row.getValue("id")}</div>
    ),
  },
  {
    id: "email",
    accessorKey: "email",
    header: () => <div className="w-full text-center text-black">Email</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("email")}</div>,
  },
  {
    id: "fullName",
    accessorKey: "fullName",
    header: () => <div className="w-full text-center text-black">ФИО</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("fullName")}</div>,
  },
  {
    id: "roles",
    accessorKey: "roles",
    header: () => <div className="w-full text-center text-black">Роли</div>,
    cell: ({ row }) => {
      const roles = (row.getValue("roles") as Role[]).join(", ");

      return <div className="text-center">{roles}</div>;
    },
  },
  {
    id: "verified",
    accessorKey: "verified",
    header: () => <div className="w-full text-center text-black">Подтверждён</div>,
    cell: ({ row }) => {
      const verified = row.getValue("verified") ? "Да" : "Нет";
      return <div className="text-center">{verified}</div>;
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: () => <div className="w-full text-center text-black">Дата создания</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = date.toLocaleDateString("ru-RU");

      return <div className="text-center">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    enableSorting: false,
    cell: ({ row }) => {
      const isSuperAdmin = getIsSuperAdmin();
      if (isSuperAdmin) {
        return <UserCellActions row={row} />;
      }

      return null;
    },
  },
];

export default columns;