import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import "./App.css";
import Timeline, {
  CustomHeader,
  DateHeader,
  SidebarHeader,
  TimelineHeaders,
  TimelineMarkers,
  TodayMarker,
} from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import {
  format,
  isLastDayOfMonth,
  isSunday,
  isToday,
  isWeekend,
  sub,
} from "date-fns";
import { vi } from "date-fns/locale";
import { useRef, useState } from "react";

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
    start_time: moment("08-30-2024"),
    end_time: moment("09-15-2024"),
    stackItems: true,
    className: "up",
  },
  {
    id: 2,
    group: 1,
    title: "",
    start_time: moment("09-01-2024"),
    end_time: moment("09-21-2024"),
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
  const timelineRef = useRef<any>(null);
  const changeTime = (value: TimeOptionEnums) => {
    setTimeOption(value);
    let newZoom;
    if (value === TimeOptionEnums.MONTH) {
      newZoom = 60 * 60 * 1000 * 24 * 80;
    } else if (value === TimeOptionEnums.WEEK) {
      newZoom = 60 * 60 * 1000 * 24 * 40;
    } else {
      newZoom = 60 * 60 * 1000 * 24 * 300;
    }
    const newVisibleTimeStart = Math.round(Math.abs(new Date().getTime()));
    timelineRef.current.updateScrollCanvas(
      newVisibleTimeStart,
      newVisibleTimeStart + newZoom,
      false
    );
  };

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
            onClick={() => changeTime(TimeOptionEnums.WEEK)}
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
            onClick={() => changeTime(TimeOptionEnums.MONTH)}
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
            onClick={() => changeTime(TimeOptionEnums.PRECIOUS)}
          >
            <Typography>Quý</Typography>
          </Box>
        </Box>
        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={moment(new Date("08-25-2024")).toDate()}
          defaultTimeEnd={moment(new Date("09-25-2024")).toDate()}
          className="calendar"
          sidebarWidth={400}
          ref={timelineRef}
          timeSteps={{
            second: 0,
            minute: 0,
            hour: 0,
            day: 1,
            month: timeOption === TimeOptionEnums.PRECIOUS ? 3 : 1,
            year: 0,
          }}
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
          <TimelineMarkers>
            <TodayMarker>
              {({ styles }) => (
                // date is value of current date. Use this to render special styles for the marker
                // or any other custom logic based on date:
                // e.g. styles = {...styles, backgroundColor: isDateInAfternoon(date) ? 'red' : 'limegreen'}
                <div
                  style={{
                    ...styles,
                    background: "#32a54b",
                  }}
                  className="marker-today"
                ></div>
              )}
            </TodayMarker>
          </TimelineMarkers>
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
            {timeOption !== TimeOptionEnums.PRECIOUS && (
              <DateHeader
                height={50}
                unit="primaryHeader"
                labelFormat={(time) => {
                  return formatDate(time[1].toDate());
                }}
                className="header"
              />
            )}
            {timeOption === TimeOptionEnums.PRECIOUS && (
              <DateHeader
                height={50}
                unit="year"
                intervalRenderer={({
                  getIntervalProps,
                  intervalContext,
                  data,
                }: any) => {
                  return (
                    <Box
                      {...getIntervalProps()}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      bgcolor="#f2f2f2"
                      height={60}
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        borderRight="1px solid #e3e3e3"
                        flex={1}
                        fontSize={12}
                        height="100%"
                      >
                        Tháng 1 - Tháng 3/
                        {formatDate(
                          intervalContext.interval.startTime.toDate(),
                          "yyyy"
                        )}
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        borderRight="1px solid #e3e3e3"
                        flex={1}
                        fontSize={12}
                        height="100%"
                      >
                        Tháng 4 - Tháng 6/
                        {formatDate(
                          intervalContext.interval.startTime.toDate(),
                          "yyyy"
                        )}
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        borderRight="1px solid #e3e3e3"
                        flex={1}
                        fontSize={12}
                        height="100%"
                      >
                        Tháng 7 - Tháng 9/
                        {formatDate(
                          intervalContext.interval.startTime.toDate(),
                          "yyyy"
                        )}
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        borderRight="1px solid #e3e3e3"
                        flex={1}
                        fontSize={12}
                        height="100%"
                      >
                        Tháng 10 - Tháng 12/
                        {formatDate(
                          intervalContext.interval.startTime.toDate(),
                          "yyyy"
                        )}
                      </Box>
                    </Box>
                  );
                }}
              />
            )}
            {timeOption === TimeOptionEnums.WEEK && (
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
                          borderRight: isSunday(interval.startTime.toDate())
                            ? "2px solid #e3e3e3"
                            : "",
                          cursor: "pointer",
                          backgroundColor: "#f2f2f2",
                          color: isWeekend(interval.startTime.toDate())
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
            )}
          </TimelineHeaders>
        </Timeline>
      </Box>
    </Box>
  );
}

export default App;
