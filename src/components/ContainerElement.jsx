import { Box, Paper, Stack, Typography } from "@mui/material"
import { FontSize, PaddingSize } from "../utils/constants"

const ContainerElement = ({children, Title, Topic}) => {
  return (
    <Box component={Paper} width="max-content" height="max-content">
      <Stack flexDirection={"row"} alignItems="center" justifyContent={"center"} gap={2} padding={PaddingSize.SMALL}>
        <Typography fontSize={FontSize.HIGH}>{Title}</Typography>
        <Typography>{Topic}</Typography>
      </Stack>
      {children}
    </Box>
  )
}

export default ContainerElement