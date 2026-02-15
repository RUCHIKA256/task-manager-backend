import { useEffect, useState } from "react";
import { getTasks } from "../services/api";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTasks()
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CircularProgress />;

  // ✅ Correct Calculations
  const total = tasks.length;

  const completed = tasks.filter(
    (t) => t.status === "completed"
  ).length;

  const pending = tasks.filter(
    (t) => t.status === "pending"
  ).length;

  const high = tasks.filter(
    (t) => t.priority === "high"
  ).length;

  const medium = tasks.filter(
    (t) => t.priority === "medium"
  ).length;

  const low = tasks.filter(
    (t) => t.priority === "low"
  ).length;

  // Chart Data
  const statusData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending }
  ];

  const priorityData = [
    { name: "High", value: high },
    { name: "Medium", value: medium },
    { name: "Low", value: low }
  ];

  const COLORS = ["#4caf50", "#f44336"];

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Smart Task Manager Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h4">{total}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Completed</Typography>
              <Typography variant="h4">{completed}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pending</Typography>
              <Typography variant="h4">{pending}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">High Priority</Typography>
              <Typography variant="h4">{high}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={4}>
        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Task Status
          </Typography>

          <PieChart width={350} height={300}>
            <Pie
              data={statusData}
              dataKey="value"
              outerRadius={100}
              label
            >
              {statusData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Priority Distribution
          </Typography>

          <BarChart width={400} height={300} data={priorityData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#1976d2" />
          </BarChart>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
