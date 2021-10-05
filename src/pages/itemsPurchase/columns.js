import {
  ArchiveOutlined,
  ArchiveSharp,
  Storefront,
  UnarchiveSharp,
} from "@mui/icons-material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IconButton } from "@mui/material";
import { thousandSeparator } from "../../helpers";

export const delivered_columns = [
  {
    Header: ({ setOpen, isDeliveryView }) => (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>
          {isDeliveryView ? <Storefront /> : <ArchiveOutlined />}
          {isDeliveryView ? "Delivery" : "Archive Items"}
        </h2>
        {isDeliveryView ? (
          <IconButton
            onClick={() => setOpen((prev) => !prev)}
            color="primary"
            aria-label="add item"
            component="span"
          >
            <AddShoppingCartIcon fontSize="large" />
          </IconButton>
        ) : (
          ""
        )}
      </div>
    ),
    id: "title",
    Footer:"",
    columns: [
      {
        Header: "Item Name",
        Footer:"",
        accessor: "title",
        filter: "fuzzyText",
      },
      {
        Header: "Store",
        Footer:"",
        accessor: "store",
      },
      {
        Header: "Price",
        Footer:"",
        accessor: "price",
        Cell: ({ row, currencySign }) => {
          return `${currencySign}${(
            Number(row.original.price).toFixed(2)
          )}`;
        },
      },
      {
        Header: "Delivery Estimate",
        Footer:"",
        accessor: "delivery",
      },
      {
        Header: "",
        Footer:"",
        accessor: "Action",
        Cell: ({ row, action, isDeliveryView }) => {
          console.log(row.original.id);
          return (
            <IconButton
              onClick={() => action(row.original.id)}
              color={isDeliveryView ? "success" : "warning"}
              aria-label="archived"
              component="span"
            >
              {isDeliveryView ? (
                <ArchiveSharp sx={{ fontSize: 30 }} />
              ) : (
                <UnarchiveSharp sx={{ fontSize: 30 }} />
              )}
            </IconButton>
          );
        },
      },
    ],
  },
];
