import {
  ArchiveOutlined,
  ArchiveSharp,
  Storefront,
  UnarchiveSharp,
} from "@mui/icons-material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IconButton, Tooltip } from "@mui/material";

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
          <Tooltip title="Add Item" arrow placement="top">
            <IconButton
              onClick={() => setOpen((prev) => !prev)}
              color="primary"
              aria-label="add item"
              component="span"
            >
              <AddShoppingCartIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        ) : (
          ""
        )}
      </div>
    ),
    id: "title",
    Footer: "",
    columns: [
      {
        Header: "Item Name",
        Footer: "",
        accessor: "title",
        filter: "fuzzyText",
      },
      {
        Header: "Store",
        Footer: "",
        accessor: "store",
      },
      {
        Header: "Price",
        Footer: "",
        accessor: "price",
        Cell: ({ row, currencySign }) => {
          return `${currencySign}${Number(row.original.price).toFixed(2)}`;
        },
      },
      {
        Header: "Delivery Estimate",
        Footer: "",
        accessor: "delivery",
      },
      {
        Header: "",
        Footer: "",
        accessor: "action",
        Cell: ({ row, action, isDeliveryView }) => {
          return (
            <Tooltip
              title={isDeliveryView ? "Move To Archive" : "Move To Delivery"}
              arrow
              placement="top"
            >
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
            </Tooltip>
          );
        },
      },
    ],
  },
];
