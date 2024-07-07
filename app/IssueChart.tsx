"use client";

import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  issueCount: {
    open: number;
    inProgress: number;
    closed: number;
  };
}

function IssueChart({ issueCount }: Props) {
  const data = [
    { label: "Open", value: issueCount.open },
    { label: "In Progress", value: issueCount.inProgress },
    { label: "Closed", value: issueCount.closed },
  ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 25 }}>
        <XAxis dataKey="label" stroke="#2b7a78" />

        <Bar
          dataKey="value"
          barSize="80"
          fill="var(--bar-fill)"
          className="drop-shadow-md"
        >
          <LabelList
            dataKey="value"
            position="top"
            offset={10}
            stroke="var(--bar-fill)"
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default IssueChart;
