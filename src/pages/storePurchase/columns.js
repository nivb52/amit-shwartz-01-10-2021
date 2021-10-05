import { ArchiveOutlined, Storefront } from "@mui/icons-material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IconButton } from "@mui/material";
import { useMemo } from "react";
import { thousandSeparator } from "../../helpers";

export const store_columns = [
  {
    Header: ({ setOpen, isDeliveryView }) => (
      <h2>
        <Storefront />
        Purchase by stores
      </h2>
    ),
    Footer: "",
    id: "title",
    columns: [
      {
        Header: "Store",
        accessor: "store",
        Footer: () => {
          return <div style={{ color:"#00e804",fontSize: "15px", fontWeight: 500 }}>Total</div>;
        },
        filter: "fuzzyText",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
        Cell: ({ row }) => {
          return `X ${row.original.quantity}`;
        },
        Footer: (self) => {
          const total = useMemo(
            () =>
              self.rows.reduce(
                (sum, row) => (row.depth ? sum : row.values.quantity + sum),
                0
              ),
            [self.rows]
          );

          return (
            <div style={{ color:"#00e804",fontSize: "15px", fontWeight: 500 }}>X{' '}{total}</div>
          );
        },
      },

      {
        Header: "Price",
        accessor: "price",

        Cell: ({ row, currencySign }) => {
          return `${currencySign}${thousandSeparator(
            Number(row.original.price).toFixed(2)
          )}`;
        },
        Footer: (self) => {
          const total = useMemo(
            () =>
              self.rows.reduce(
                (sum, row) => (row.depth ? sum : row.values.price + sum),
                0
              ),
            [self.rows]
          );

          return (
            <div style={{ color:"#00e804",fontSize: "15px", fontWeight: 500 }}>{`${
              self.currencySign
            }${thousandSeparator(Number(total).toFixed(2))}`}</div>
          );
        },
      },
    ],
  },
];
