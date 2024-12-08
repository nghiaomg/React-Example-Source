import { Card, CardContent, Typography, Box } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledCard = styled(Card)(({ theme, bgcolor, bgopacity = 1 }) => ({
  height: '100%',
  backgroundColor: bgcolor ? `${bgcolor}${Math.round(bgopacity * 255).toString(16).padStart(2, '0')}` : theme.palette.background.paper,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-4px)'
  }
}))

const IconWrapper = styled(Box)(({ theme, iconcolor }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1),
  borderRadius: '12px',
  backgroundColor: iconcolor ? `${iconcolor}15` : theme.palette.primary.light,
  color: iconcolor || theme.palette.primary.main,
  '& svg': {
    width: 24,
    height: 24
  }
}))

const WidgetCard = ({ 
  children, 
  bgColor = 'white', 
  bgOpacity = 0.6,
  sx = {}, 
  icon, 
  iconColor,
  title,
  value
}) => {
  return (
    <StyledCard 
      className="widget-card shadow-none"
      bgcolor={bgColor} 
      bgopacity={bgOpacity}
      sx={sx}
    >
      <CardContent>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 2
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '0.875rem',
              color: 'text.secondary',
              fontWeight: 500
            }}
          >
            {title}
          </Typography>
          {icon && (
            <IconWrapper iconcolor={iconColor}>
              {icon}
            </IconWrapper>
          )}
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontSize: '1.5rem' }}>{value}</Typography>
        </Box>
      </CardContent>
    </StyledCard>
  )
}

export default WidgetCard