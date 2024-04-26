import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { memo, useRef } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { makeStyles } from "@mui/styles";
import data from "../data/bussiness_plan.json";
import * as XLSX from "xlsx-js-style";

export interface Root {
  report_id: string;
  report_name: string;
  report_data: ReportType[];
  report_code: string;
}

export interface ReportType {
  group_name: string;
  group_code: string;
  departments: Department[];
  total: Total;
}

export interface Department {
  department: string;
  targets: Total;
}

export interface Total {
  annual_plan: number;
  start_of_month: number;
  increment_in_month: number;
  cumulative_to_date: number;
  completion_percentage: number;
}

let rowData: (ReportType | Department)[] = [];
data.report_data.forEach((item) => {
  if (item.total) {
    rowData.push({
      ...item,
    });
  }
  item.departments.forEach((department) => {
    rowData.push({
      ...department,
    });
  });
});

const useStyles = makeStyles({
  bold: {
    fontWeight: "500 !important",
  },
  subRow: {
    paddingLeft: "30px",
  },
});

const border = {
  top: {
    style: "thin",
    color: { rgb: "dbdbdb" },
  },
  right: {
    style: "thin",
    color: { rgb: "dbdbdb" },
  },
  bottom: {
    style: "thin",
    color: { rgb: "dbdbdb" },
  },
  left: {
    style: "thin",
    color: { rgb: "dbdbdb" },
  },
};

const BusinessPlan = () => {
  const classess = useStyles();
  const tableRef = useRef(null);
  const table2Ref = useRef(null);
  const downloadExcel = () => {
    const workbook = XLSX.utils.table_to_book(tableRef.current);
    workbook.Sheets["Sheet1"]["A1"].s = {
      fill: {
        patternType: "solid",
        fgColor: { rgb: "f2f2f2" },
      },
      alignment: {
        vertical: "center",
        horizontal: "center",
      },
      border,
      font: {
        // sz: 16,
        color: { rgb: "000" },
        // bold: false,
        // italic: false,
        // underline: false,
      },
    };

    workbook.Sheets["Sheet1"]["A2"] = workbook.Sheets["Sheet1"]["A1"];
    workbook.Sheets["Sheet1"]["B2"] = workbook.Sheets["Sheet1"]["A1"];
    workbook.Sheets["Sheet1"]["F2"] = workbook.Sheets["Sheet1"]["A1"];

    workbook.Sheets["Sheet1"]["B1"].s = workbook.Sheets["Sheet1"]["A1"].s;
    workbook.Sheets["Sheet1"]["C1"].s = workbook.Sheets["Sheet1"]["A1"].s;
    workbook.Sheets["Sheet1"]["C2"].s = workbook.Sheets["Sheet1"]["A1"].s;
    workbook.Sheets["Sheet1"]["D2"].s = workbook.Sheets["Sheet1"]["A1"].s;
    workbook.Sheets["Sheet1"]["E2"].s = workbook.Sheets["Sheet1"]["A1"].s;
    workbook.Sheets["Sheet1"]["F1"].s = workbook.Sheets["Sheet1"]["A1"].s;
    XLSX.writeFile(workbook, "data.xlsx");
  };

  const downloadExcel2 = () => {
    const workbook = XLSX.utils.table_to_book(table2Ref.current);
    Object.keys(workbook.Sheets["Sheet1"]).map((key) => {
      if (key.includes("A")) {
        workbook.Sheets["Sheet1"][key].s = {
          alignment: {
            vertical: "center",
          },
          border,
        };
      }
    });
    workbook.Sheets["Sheet1"]["A1"].s = {
      fill: {
        patternType: "solid",
        fgColor: { rgb: "f0f0f0" },
      },
      alignment: {
        vertical: "center",
        horizontal: "center",
      },
      border,
      font: {
        // sz: 16,
        color: { rgb: "000" },
        // bold: false,
        // italic: false,
        // underline: false,
      },
    };
    workbook.Sheets["Sheet1"]["A2"] = workbook.Sheets["Sheet1"]["A1"];
    workbook.Sheets["Sheet1"]["B2"] = workbook.Sheets["Sheet1"]["A1"];
    workbook.Sheets["Sheet1"]["C2"] = workbook.Sheets["Sheet1"]["A1"];
    workbook.Sheets["Sheet1"]["D2"] = workbook.Sheets["Sheet1"]["A1"];
    workbook.Sheets["Sheet1"]["E2"] = workbook.Sheets["Sheet1"]["A1"];
    workbook.Sheets["Sheet1"]["G1"] = workbook.Sheets["Sheet1"]["A1"];

    workbook.Sheets["Sheet1"]["B1"].s = workbook.Sheets["Sheet1"]["A1"].s;
    workbook.Sheets["Sheet1"]["C1"].s = workbook.Sheets["Sheet1"]["A1"].s;
    workbook.Sheets["Sheet1"]["D1"].s = workbook.Sheets["Sheet1"]["A1"].s;
    workbook.Sheets["Sheet1"]["E1"].s = workbook.Sheets["Sheet1"]["A1"].s;
    workbook.Sheets["Sheet1"]["F1"].s = workbook.Sheets["Sheet1"]["A1"].s;
    workbook.Sheets["Sheet1"]["F2"].s = workbook.Sheets["Sheet1"]["A1"].s;
    workbook.Sheets["Sheet1"]["G2"].s = workbook.Sheets["Sheet1"]["A1"].s;
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={3} flexWrap="wrap">
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="body2" fontWeight={500}>
            Đơn vị phụ trách
          </Typography>
          <Select
            displayEmpty
            labelId="demo-select-small-label"
            id="demo-select-small"
            defaultValue={1}
            size="small"
            sx={{
              width: 200,
              fontSize: 14,
            }}
          >
            <MenuItem value={1}>Toàn bộ phòng ban</MenuItem>
            <MenuItem value={2}>Phòng ban 1</MenuItem>
            <MenuItem value={3}>Phòng ban 2</MenuItem>
          </Select>
        </Box>
        <Box display="flex" alignItems="center" gap={3}>
          <Typography variant="body2" fontWeight={500}>
            Ngày bắt đầu
          </Typography>
          <DatePicker
            slotProps={{
              textField: {
                size: "small",
                className: "DATE",
                inputProps: {
                  style: {
                    fontSize: 14,
                  },
                },
              },
            }}
          />
        </Box>
        <Box display="flex" alignItems="center" gap={3}>
          <Typography variant="body2" fontWeight={500}>
            Ngày kết thúc
          </Typography>
          <DatePicker
            slotProps={{
              textField: {
                size: "small",
                className: "DATE",
                inputProps: {
                  style: {
                    fontSize: 14,
                  },
                },
              },
            }}
          />
        </Box>
        <Button variant="outlined" color="success">
          Run Report
        </Button>
        <Button variant="outlined" onClick={downloadExcel}>
          <FileUploadOutlinedIcon />
          <span
            style={{
              display: "inline-block",
              marginTop: 2,
            }}
          >
            Export File
          </span>
        </Button>
      </Box>
      <Typography variant="h5" fontWeight={600} color="green" mt={4} mb={3}>
        Báo cáo tình hình thực hiện kế hoạch kinh doanh
      </Typography>
      <table aria-label="simple table" ref={tableRef}>
        <thead
          style={{
            background: "#f2f2f2",
            fontWeight: 500,
          }}
        >
          <tr>
            <td rowSpan={2} align="center">
              Chỉ tiêu
            </td>
            <td rowSpan={2} align="center">
              Kế hoạch năm
            </td>
            <td rowSpan={1} colSpan={3} align="center">
              Tình hình thực hiện
            </td>
            <td rowSpan={2} align="center">
              % hoàn thành kế hoạch
            </td>
          </tr>
          <tr>
            <td rowSpan={1} align="center">
              Đầu tháng
            </td>
            <td rowSpan={1} align="center">
              Tăng thêm trong tháng
            </td>
            <td rowSpan={1} align="center">
              Lũy kế đến nay
            </td>
          </tr>
        </thead>
        <tbody>
          {rowData.map((row) => {
            if ("total" in row) {
              return (
                <tr
                  key={row.group_code}
                  // style={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <td scope="row" className={classess.bold}>
                    {row.group_name}
                  </td>
                  <td align="right" className={classess.bold}>
                    {row.total.annual_plan.toLocaleString("en-US")}
                  </td>
                  <td align="right" className={classess.bold}>
                    {row.total.start_of_month.toLocaleString("en-US")}
                  </td>
                  <td align="right" className={classess.bold}>
                    {row.total.increment_in_month.toLocaleString("en-US")}
                  </td>
                  <td align="right" className={classess.bold}>
                    {row.total.cumulative_to_date.toLocaleString("en-US")}
                  </td>
                  <td align="right" className={classess.bold}>
                    {row.total.completion_percentage}
                  </td>
                </tr>
              );
            } else {
              return (
                <tr
                  key={row.department}
                  // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <td scope="row" className={classess.subRow}>
                    {row.department}
                  </td>
                  <td align="right" className={classess.subRow}>
                    {row.targets.annual_plan.toLocaleString("en-US")}
                  </td>
                  <td align="right" className={classess.subRow}>
                    {row.targets.start_of_month.toLocaleString("en-US")}
                  </td>
                  <td align="right" className={classess.subRow}>
                    {row.targets.increment_in_month.toLocaleString("en-US")}
                  </td>
                  <td align="right" className={classess.subRow}>
                    {row.targets.cumulative_to_date.toLocaleString("en-US")}
                  </td>
                  <td align="right" className={classess.subRow}>
                    {row.targets.completion_percentage}
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      <Typography variant="h5" fontWeight={600} color="green" mt={4} mb={3}>
        Báo cáo tình hình thực hiện các dự án
      </Typography>
      <Button
        variant="outlined"
        sx={{
          marginBottom: 4,
        }}
        onClick={downloadExcel2}
      >
        <FileUploadOutlinedIcon />
        <span
          style={{
            display: "inline-block",
            marginTop: 2,
          }}
        >
          Export File
        </span>
      </Button>
      <table style={{ minWidth: 650 }} ref={table2Ref}>
        <thead
          style={{
            background: "#f2f2f2",
            fontWeight: 500,
          }}
        >
          <tr>
            <td rowSpan={2} align="center">
              Đơn vị phụ trách
            </td>
            <td rowSpan={2} align="center">
              Nhóm dịch vụ
            </td>
            <td rowSpan={2} align="center">
              Tên công ty
            </td>
            <td rowSpan={2} align="center">
              Tên dịch vụ
            </td>
            <td rowSpan={2} align="center">
              Thông tin thương vụ
            </td>
            <td rowSpan={1} colSpan={2} align="center">
              Tiến độ thực hiện
            </td>
          </tr>
          <tr>
            <td rowSpan={1} align="center">
              Cập nhật tiến độ
            </td>
            <td rowSpan={1} align="center">
              Kế hoạch sắp tới
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan={3}>Hội sở-IB-A</td>
            <td>Tư vấn tài chính doanh nghiệp</td>
            <td>CTCP Tập Đoàn Hoà Phát</td>
            <td>Dịch vụ 1</td>
            <td>TTTV 1</td>
            <td>Cập nhật tiến độ</td>
            <td>KH sắp tới</td>
          </tr>
          <tr>
            <td>Tư vấn tài chính doanh nghiệp</td>
            <td>CTCP Tập Đoàn Hoà Phát</td>
            <td>Dịch vụ 1</td>
            <td>TTTV 1</td>
            <td>Cập nhật tiến độ</td>
            <td>KH sắp tới</td>
          </tr>
          <tr>
            <td>Tư vấn tài chính doanh nghiệp</td>
            <td>CTCP Tập Đoàn Hoà Phát</td>
            <td>Dịch vụ 1</td>
            <td>TTTV 1</td>
            <td>Cập nhật tiến độ</td>
            <td>KH sắp tới</td>
          </tr>
        </tbody>
      </table>
    </Box>
  );
};

export default memo(BusinessPlan);
