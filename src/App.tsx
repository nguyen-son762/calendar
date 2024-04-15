import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import "./App.css";
import Timeline, {
  CustomHeader,
  DateHeader,
  SidebarHeader,
  TimelineHeaders,
} from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");
import {
  format,
  isLastDayOfMonth,
  isSunday,
  isToday,
  isWeekend,
  sub,
} from "date-fns";
import { vi } from "date-fns/locale";
import { useState } from "react";

const lastDayOfPrecious = [
  new Date("02/28/2024"),
  new Date("05/31/2024"),
  new Date("08/31/2024"),
  new Date("11/30/2024"),
];

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
      <Box display="flex" alignItems="center" gap={2} width={400}>
        <Box display="flex" alignItems="center" width={48}>
          <ExpandMoreIcon />
          <Typography
            display="flex"
            alignItems="center"
            justifyContent="end"
            fontSize={14}
          >
            1.1
          </Typography>
        </Box>
        <Typography
          width={60}
          color="primary"
          fontSize={14}
          className="underline"
        >
          VCB-09
        </Typography>
        <Typography
          flex={1}
          fontSize={14}
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          GIAI ĐOẠN 1: RÀ SOÁT CHUẨN HOÁ HỒ SƠ
        </Typography>
      </Box>
    ),
    stackItems: true,
  },
  {
    id: 2,
    title: (
      <Box display="flex" alignItems="center" gap={2} width={400}>
        <Box display="flex" alignItems="center" width={48} justifyContent="end">
          <Typography
            display="flex"
            alignItems="center"
            justifyContent="end"
            fontSize={12}
          >
            1.2
          </Typography>
        </Box>
        <Typography
          width={60}
          color="primary"
          textAlign="end"
          fontSize={12}
          className="underline"
        >
          VCB-09
        </Typography>
        <Typography
          flex={1}
          fontSize={12}
          pl={1}
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          Cung cấp thông tin cho Rồng Việt
        </Typography>
      </Box>
    ),
    stackItems: true,
  },
  {
    id: 3,
    title: (
      <Box display="flex" alignItems="center" gap={2} width={400}>
        <Box display="flex" alignItems="center" width={48} justifyContent="end">
          <Typography
            display="flex"
            alignItems="center"
            justifyContent="end"
            fontSize={12}
          >
            1.3
          </Typography>
        </Box>
        <Typography
          width={60}
          color="primary"
          textAlign="end"
          fontSize={12}
          className="underline"
        >
          VCB-09
        </Typography>
        <Typography
          flex={1}
          fontSize={12}
          pl={1}
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          Rà soát và tư vấn xây dựng chuẩn hoá các hồ sơ
        </Typography>
      </Box>
    ),
    stackItems: true,
  },
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
    group: 1,
    title: "",
    start_time: moment("09-01-2023"),
    end_time: moment("09-21-2023"),
    stackItems: true,
    className: "down",
  },
];

enum TimeOptionEnums {
  TODAY = "today",
  WEEK = "week",
  MONTH = "month",
  PRECIOUS = "precious",
}

function areMonthDayEqual(date1: Date, date2: Date) {
  return (
    date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
  );
}

function App() {
  const [timeOption, setTimeOption] = useState<TimeOptionEnums>(
    TimeOptionEnums.WEEK
  );

  return (
    <Box>
      <Box overflow="hidden" position="relative">
        <Box
          position="absolute"
          bottom={4}
          right={20}
          display="flex"
          padding={1}
          bgcolor="#fff"
          borderRadius="8px"
          zIndex={999}
          gap={1}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Box width={36} height={8} bgcolor="#e33127" borderRadius={9}></Box>
            <Typography>Kế hoạch</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Box width={36} height={8} bgcolor="#d7aa07" borderRadius={9}></Box>
            <Typography>Thực tế</Typography>
          </Box>
          <Box py="4px" px={1} borderRadius="4px">
            <Typography>Hôm nay</Typography>
          </Box>
          <Box
            bgcolor={timeOption === TimeOptionEnums.WEEK ? "#32a54b" : ""}
            color={timeOption === TimeOptionEnums.WEEK ? "#f2f2f2" : ""}
            py="4px"
            px={1}
            borderRadius="4px"
            className="cursor-pointer"
            onClick={() => setTimeOption(TimeOptionEnums.WEEK)}
          >
            <Typography>Tuần</Typography>
          </Box>
          <Box
            bgcolor={timeOption === TimeOptionEnums.MONTH ? "#32a54b" : ""}
            color={timeOption === TimeOptionEnums.MONTH ? "#f2f2f2" : ""}
            py="4px"
            px={1}
            borderRadius="4px"
            className="cursor-pointer"
            onClick={() => setTimeOption(TimeOptionEnums.MONTH)}
          >
            <Typography>Tháng</Typography>
          </Box>
          <Box
            bgcolor={timeOption === TimeOptionEnums.PRECIOUS ? "#32a54b" : ""}
            color={timeOption === TimeOptionEnums.PRECIOUS ? "#f2f2f2" : ""}
            py="4px"
            px={1}
            borderRadius="4px"
            className="cursor-pointer"
            onClick={() => setTimeOption(TimeOptionEnums.PRECIOUS)}
          >
            <Typography>Quý</Typography>
          </Box>
        </Box>
        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={moment(new Date("08-25-2023")).toDate()}
          defaultTimeEnd={moment(new Date("09-25-2023")).toDate()}
          className="calendar"
          sidebarWidth={400}
          verticalLineClassNamesForTime={(start, end) => [
            (
              timeOption === TimeOptionEnums.MONTH
                ? isLastDayOfMonth(end)
                : timeOption === TimeOptionEnums.PRECIOUS
                ? lastDayOfPrecious.find((item) => {
                    return areMonthDayEqual(item, new Date(end));
                  })
                : isSunday(end)
            )
              ? `border-right`
              : "border-unset",
          ]}
        >
          <TimelineHeaders>
            <SidebarHeader>
              {({ getRootProps }) => {
                return (
                  <div
                    {...getRootProps()}
                    style={{
                      width: "399px",
                      background: "#f2f2f2",
                    }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      paddingY={2}
                      bgcolor="#f2f2f2"
                      pl={2}
                      gap={2}
                    >
                      <Box width={48}>WBS</Box>
                      <Box width={60}>Mã CV</Box>
                      <Box flex={1}>Tên công việc</Box>
                    </Box>
                  </div>
                );
              }}
            </SidebarHeader>
            <DateHeader
              unit="primaryHeader"
              labelFormat={(time) => {
                return formatDate(time[1].toDate());
              }}
              className="header"
            />
            <CustomHeader height={30} unit="day">
              {({
                headerContext: { intervals },
                getRootProps,
                getIntervalProps,
              }: any) => {
                return (
                  <div {...getRootProps()}>
                    {intervals.map((interval: any) => {
                      const intervalStyle = {
                        lineHeight: "30px",
                        textAlign: "center",
                        borderRight: (
                          timeOption === TimeOptionEnums.MONTH
                            ? isLastDayOfMonth(interval.startTime.toDate())
                            : timeOption === TimeOptionEnums.PRECIOUS
                            ? lastDayOfPrecious.find((item) =>
                                areMonthDayEqual(
                                  item,
                                  new Date(interval.startTime.toDate())
                                )
                              )
                            : isSunday(interval.startTime.toDate())
                        )
                          ? "2px solid #e3e3e3"
                          : "",
                        cursor: "pointer",
                        backgroundColor: "#f2f2f2",
                        color: (
                          timeOption === TimeOptionEnums.MONTH ||
                          timeOption === TimeOptionEnums.PRECIOUS
                            ? isLastDayOfMonth(interval.startTime.toDate())
                            : isWeekend(interval.startTime.toDate())
                        )
                          ? "#32a54a"
                          : "#5c5c5c",
                        fontWeight: "500",
                      };
                      return (
                        <div
                          {...getIntervalProps({
                            interval,
                            style: intervalStyle,
                          })}
                        >
                          <Box
                            className="sticky"
                            sx={{
                              textDecoration: isToday(
                                sub(interval.startTime.toDate(), {
                                  months: -1,
                                })
                              )
                                ? "underline"
                                : "",
                              textDecorationColor: isToday(
                                sub(interval.startTime.toDate(), {
                                  months: -1,
                                })
                              )
                                ? "#32a54b"
                                : "",
                            }}
                          >
                            {formatDate(interval.startTime.toDate(), "dd")}
                          </Box>
                        </div>
                      );
                    })}
                  </div>
                );
              }}
            </CustomHeader>
          </TimelineHeaders>
        </Timeline>
      </Box>
    </Box>
  );
}

export default App;
