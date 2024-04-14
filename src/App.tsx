import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, hexToRgb } from "@mui/material";
import "./App.css";
import Timeline, {
  CustomHeader,
  DateHeader,
  LabelFormat,
  SidebarHeader,
  TimelineHeaders,
} from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");
import Moment from "react-moment";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export const formatDate = (
  date: Date | string | number,
  type = "MMMM '-' yyyy"
) => {
  if (!date) {
    return "";
  }
  return format(typeof date === "string" ? new Date(date) : date, type, {
    locale: vi,
  });
};

const WBS_LIST = [
  {
    id: "1",
    code: "VCB-09",
    name: "GIAI ĐOẠN 1: RÀ SOÁT CHUẨN HOÁ HỒ SƠ",
    sub_menu: [
      {
        id: "1.1",
        code: "VCB-09",
        name: "Cung cấp thông tin cho Rồng Việt",
      },
      {
        id: "1.2",
        code: "VCB-09",
        name: "Rà soát và tư vấn xây dựng chuẩn hoá các hồ sơ",
      },
    ],
  },
  {
    id: "2",
    code: "VCB-09",
    name: "GIAI ĐOẠN 2: CHÀO BÁN CỔ PHIẾU...",
    sub_menu: [
      {
        id: "2.1",
        code: "VCB-09",
        name: "Tư vấn  xây dựng phương án IPO cho DN.",
      },
      {
        id: "2.2",
        code: "VCB-09",
        name: "Tổ chức học ĐHĐCĐ thông qua phương án IPO",
      },
      {
        id: "2.3",
        code: "VCB-09",
        name: "Xây dựng chuẩn bị và nộp hồ sơ đăng kí IPO",
      },
      {
        id: "2.2",
        code: "VCB-09",
        name: "Giải trình và bổ sung hồ sơ theo yêu cầu của...",
      },
      {
        id: "2.1",
        code: "VCB-09",
        name: "UBCKNN cấp giấy CN chào bán cho DN",
      },
      {
        id: "2.2",
        code: "VCB-09",
        name: "Triển khai thực hiện IPO",
      },
    ],
  },
];

const groups = [
  {
    id: 1,
    title: (
      <Box display="flex" alignItems="center" pl={2} gap={2} width={300}>
        <Typography
          width={48}
          display="flex"
          alignItems="center"
          justifyContent="end"
          fontSize={14}
        >
          1.1
        </Typography>
        <Typography
          width={80}
          textAlign="end"
          color="primary"
          fontSize={14}
          className="underline"
        >
          VCB-09
        </Typography>
        <Typography
          flex={1}
          pl={1}
          fontSize={14}
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          GIAI ĐOẠN 1: RÀ SOÁT CHUẨN HOÁ HỒ SƠ
        </Typography>
      </Box>
    ),
  },
  { id: 2, title: "group 2" },
];

const items = [
  {
    id: 1,
    group: 1,
    title: "",
    start_time: moment("08-30-2023"),
    end_time: moment("09-15-2023"),
    stackItems: true,
    className: "up",
  },
  {
    id: 2,
    group: 2,
    title: "",
    start_time: moment("09-01-2023"),
    end_time: moment("09-21-2023"),
    stackItems: true,
    className: "down",
  },
  // {
  //   id: 2,
  //   group: 2,
  //   title: "item 2",
  //   start_time: moment().add(-0.5, "hour"),
  //   end_time: moment().add(0.5, "hour"),
  // },
  // {
  //   id: 3,
  //   group: 1,
  //   title: "item 3",
  //   start_time: moment().add(2, "hour"),
  //   end_time: moment().add(3, "hour"),
  // },
];

function App() {
  return (
    <Box>
      <Box overflow="hidden">
        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={moment(new Date("08-25-2023")).toDate()}
          defaultTimeEnd={moment(new Date("09-25-2023")).toDate()}
          className="calendar"
          sidebarWidth={400}
        >
          <TimelineHeaders>
            <SidebarHeader>
              {({ getRootProps }) => {
                return (
                  <div
                    {...getRootProps()}
                    style={{
                      width: "399px",
                      background: "#e5e5e5",
                    }}
                  >
                    {" "}
                    <Box
                      display="flex"
                      alignItems="center"
                      paddingY={2}
                      bgcolor="#e5e5e5"
                      pl={2}
                      gap={2}
                    >
                      <Box width={48}>WBS</Box>
                      <Box width={80}>Mã CV</Box>
                      <Box flex={1}>Tên công việc</Box>
                    </Box>
                  </div>
                );
              }}
            </SidebarHeader>{" "}
            <DateHeader
              unit="primaryHeader"
              labelFormat={(time) => {
                return formatDate(time[1].toDate());
              }}
              className="header"
            />
            <DateHeader
              labelFormat={(time) => moment(time[0]).format("DD")}
              className="date"
            />
          </TimelineHeaders>
        </Timeline>
      </Box>
    </Box>
  );
}

export default App;
