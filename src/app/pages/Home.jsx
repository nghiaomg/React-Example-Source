'use client'

import React from 'react'
import MasterLayout from '@layouts/MasterLayouts'
import { WidgetCard } from '@components/ui'
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  IconButton 
} from '@mui/material'
import { 
  FiUsers, 
  FiDollarSign, 
  FiShoppingBag, 
  FiBarChart2 
} from 'react-icons/fi'
import DashboardCharts from '../components/charts/DashboardCharts'

export default function Home() {
  const stats = [
    {
      title: 'Total Users',
      value: '2,420',
      icon: <FiUsers size={24} />,
      bgColor: '#eef3ff',
      iconColor: '#5d87ff'
    },
    {
      title: 'Total Revenue',
      value: '$13,245',
      icon: <FiDollarSign size={24} />,
      bgColor: '#fbf2ef',
      iconColor: '#fa896b'
    },
    {
      title: 'Total Orders',
      value: '1,345',
      icon: <FiShoppingBag size={24} />,
      bgColor: '#e6fffa',
      iconColor: '#13deb9'
    },
    {
      title: 'Total Sales',
      value: '+23%',
      icon: <FiBarChart2 size={24} />,
      bgColor: '#fef5e5',
      iconColor: '#ffae1f'
    }
  ]

  return (
    <MasterLayout>
      <Box sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        overflow: 'auto'
      }}>
        <Grid 
          container 
          spacing={3} 
          sx={{ 
            width: '100%', 
            m: 0,
            flex: 'none'
          }}
        >
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} sx={{ p: 2 }}>
              <WidgetCard 
                bgColor={stat.bgColor} 
                icon={stat.icon} 
                title={stat.title} 
                iconColor={stat.iconColor} 
                value={stat.value} 
              />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4, px: 2 }}>
          <DashboardCharts />
        </Box>
      </Box>
    </MasterLayout>
  )
}
