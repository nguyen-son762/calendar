import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { memo, useRef } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { makeStyles } from "@mui/styles";
import data from "../data/bussiness_plan.json";
import { DownloadTableExcel } from "react-export-table-to-excel";

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

const BusinessPlan = () => {
  const classess = useStyles();
  const tableRef = useRef(null);
  const table2Ref = useRef(null);

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
        <DownloadTableExcel
          filename="data"
          sheet="users"
          currentTableRef={tableRef.current}
        >
          <Button variant="outlined">
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
        </DownloadTableExcel>
      </Box>
      <Typography variant="h5" fontWeight={600} color="green" mt={4} mb={3}>
        Báo cáo tình hình thực hiện kế hoạch kinh doanh
      </Typography>

      <table style={{ minWidth: 650 }} aria-label="simple table" ref={tableRef}>
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
      <DownloadTableExcel
        filename="data2"
        sheet="users"
        currentTableRef={table2Ref.current}
      >
        <Button
          variant="outlined"
          sx={{
            marginBottom: 4,
          }}
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
      </DownloadTableExcel>
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
