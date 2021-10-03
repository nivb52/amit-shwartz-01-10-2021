import { Archive } from "@mui/icons-material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IconButton } from "@mui/material";

export const delivered_columns = [
  {
    Header: () => (
      <div
        style={{
          disply: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>
          <ShoppingBagIcon />
          Delivery
        </h2>
        <IconButton color="primary" aria-label="add item" component="span">
          <AddShoppingCartIcon />
        </IconButton>
      </div>
    ),
    id: "title",
    columns: [
      {
        Header: "Item Name",
        accessor: "title",
        filter: "fuzzyText",
      },
      {
        Header: "store",
        accessor: "store",
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: ({ row, currency }) => {
          return Number(row.original.price * currency).toFixed(2);
        },
      },
      {
        Header: "Delivery Estimate",
        accessor: "delivery",
      },
      {
        Header: "סטטוס בקשה",
        accessor: "Action",
        Cell: ({ row, onclick }) => {
          return (
            <IconButton color="success" aria-label="archived" component="span">
              <Archive />
            </IconButton>
          );
        },
      },
    ],
  },
];
