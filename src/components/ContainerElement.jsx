import { Box, Stack, Typography } from "@mui/material"
import '../styles/components/_ContainerElement.sass'

const ContainerElement = ({children, Title, Topic}) => {
  return (
    <Stack 
      flexDirection="column" 
      width="max-content"
      height="max-content"
      className="container-element"
    >
      <Stack  className="container-element__header">
        <div className="container-element__header__title">
          <Typography variant='h3'>{Title}</Typography>
        </div>
        <div className="container-element__header__subtitle">
          <Typography variant="body1">{Topic}</Typography>
        </div>
      </Stack>
      <Box className="container-element__content">
        {children}
      </Box>
    </Stack>
  )
}

export default ContainerElement