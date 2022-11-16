import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../reducers/mockData";
import Header from "../../components/admin/Header";
import { DeleteOutline } from "@mui/icons-material";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {field: "id",
    headerName: "ID"},
    {
      field: "name",
      headerName: "Tên người dùng",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "dateCreated",
      headerName: "Ngày tạo tài khoản",
      type: "date",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "username",
      headerName: "Tên tài khoản",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 1,
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              status === "active"
                ? colors.greenAccent[700]
                : status === "unactive"
                ? colors.redAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {status === "UNACTIVE"}
            {status === "ACTIVE"}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {status}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="userListDelete"
              //onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    }
  ];

  return (
    <Box m="20px">
      <Header title="USER" subtitle="Quản lý hồ sơ người dùng" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
