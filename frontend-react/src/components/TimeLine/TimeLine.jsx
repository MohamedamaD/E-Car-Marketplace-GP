import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineDot from "@mui/lab/TimelineDot";
import "../TimeLine/TimeLine.scss";
import "../../index.css";

export const TimeLine = () => {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot className="time-line-dot" />
          <TimelineConnector className="time-line-connector" />
        </TimelineSeparator>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot className="time-line-dot" />
          <TimelineConnector
            className="time-line-connector"
            sx={{ py: "42px", px: 0 }}
          />
        </TimelineSeparator>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot className="main-color time-line-dot" />
        </TimelineSeparator>
      </TimelineItem>
    </Timeline>
  );
};
