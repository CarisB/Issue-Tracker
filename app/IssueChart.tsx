"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

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
      <BarChart data={data}>
        <XAxis dataKey="label" />
        <YAxis />
        <Bar dataKey="value" barSize="80" style={{ fill: "var(--accent-9)" }} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default IssueChart;
