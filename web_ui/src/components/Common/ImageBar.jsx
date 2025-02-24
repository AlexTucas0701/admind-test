import {Box, ImageListItem} from "@mui/material";

const ImageBar = ({image, sx, message}) => {
  sx = sx || {};
  return (
    <ImageListItem>
      {
        image ? (
          <Box
            component="img"
            src={image}
            sx={sx}
          />
        ): (
          <Box sx={{textAlign: "center", alignContent: "center", ...sx}}>
            {message}
          </Box>
        )
      }
    </ImageListItem>
  );
};

export default ImageBar;
