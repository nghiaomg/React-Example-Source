'use client'

import React from 'react'
import { 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'
import { Box, Card, CardContent, Typography, Grid } from '@mui/material'

// Mock data - thay thế bằng data thật từ API
const loginData = [
  { name: '00:00', value: 400 },
  { name: '04:00', value: 300 },
  { name: '08:00', value: 600 },
  { name: '12:00', value: 800 },
  { name: '16:00', value: 1000 },
  { name: '20:00', value: 750 },
  { name: '23:59', value: 500 },
]

const deviceData = [
  { name: 'Android', value: 45 },
  { name: 'iOS', value: 35 },
  { name: 'Web', value: 20 },
]

const paymentData = [
  { name: 'Bank Transfer', amount: 120000 },
  { name: 'USDT (BSC)', amount: 85000 },
  { name: 'USDT (TRC20)', amount: 95000 },
]

const advertisingData = [
  { date: '2024-01', remaining: 1200, distributed: 800 },
  { date: '2024-02', remaining: 1000, distributed: 1000 },
  { date: '2024-03', remaining: 800, distributed: 1200 },
  { date: '2024-04', remaining: 600, distributed: 1400 },
  { date: '2024-05', remaining: 400, distributed: 1600 },
  { date: '2024-06', remaining: 200, distributed: 1800 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

const DashboardCharts = () => {
  return (
    <Grid container spacing={3}>
      {/* Login Traffic Chart */}
      <Grid item xs={12} md={8}>
        <Card sx={{ 
          borderRadius: 4,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          height: '100%',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
          }
        }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Lưu Lượng Đăng Nhập
            </Typography>
            <Box sx={{ 
              width: '100%', 
              height: 300,
              borderRadius: 3,
              overflow: 'hidden'
            }}>
              <ResponsiveContainer>
                <LineChart data={loginData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: 8,
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }} 
                  />
                  <Legend wrapperStyle={{ paddingTop: 20 }} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8884d8" 
                    name="Số lượng đăng nhập"
                    strokeWidth={2}
                    dot={{ strokeWidth: 2 }}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Device Distribution Chart */}
      <Grid item xs={12} md={4}>
        <Card sx={{ 
          borderRadius: 4,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          height: '100%',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
          }
        }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Phân Bố Thiết Bị
            </Typography>
            <Box sx={{ 
              width: '100%', 
              height: 300,
              borderRadius: 3,
              overflow: 'hidden'
            }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    paddingAngle={5}
                  >
                    {deviceData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: 8,
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: 20 }} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Payment Gateway Chart */}
      <Grid item xs={12} md={6}>
        <Card sx={{ 
          borderRadius: 4,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          height: '100%',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
          }
        }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Thống Kê Cổng Nạp
            </Typography>
            <Box sx={{ 
              width: '100%', 
              height: 300,
              borderRadius: 3,
              overflow: 'hidden'
            }}>
              <ResponsiveContainer>
                <BarChart data={paymentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: 8,
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                    formatter={(value) => 
                      new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(value)
                    }
                  />
                  <Legend wrapperStyle={{ paddingTop: 20 }} />
                  <Bar 
                    dataKey="amount" 
                    fill="#8884d8" 
                    name="Số tiền nạp"
                    radius={[8, 8, 0, 0]}
                  >
                    {paymentData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Advertising Distribution Chart */}
      <Grid item xs={12} md={6}>
        <Card sx={{ 
          borderRadius: 4,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          height: '100%',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
          }
        }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Phân Phối Quảng Cáo
            </Typography>
            <Box sx={{ 
              width: '100%', 
              height: 300,
              borderRadius: 3,
              overflow: 'hidden'
            }}>
              <ResponsiveContainer>
                <AreaChart
                  data={advertisingData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString('vi-VN', { month: 'short' });
                    }}
                  />
                  <YAxis />
                  <Tooltip
                    contentStyle={{ 
                      borderRadius: 8,
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                    formatter={(value, name) => [
                      value,
                      name === 'remaining' ? 'Quảng cáo tồn' : 'Quảng cáo đã phân phối'
                    ]}
                    labelFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString('vi-VN', { 
                        month: 'long', 
                        year: 'numeric' 
                      });
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: 20 }}
                    formatter={(value) => 
                      value === 'remaining' ? 'Quảng cáo tồn' : 'Quảng cáo đã phân phối'
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="distributed"
                    stackId="1"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    name="distributed"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="remaining"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                    name="remaining"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default DashboardCharts 