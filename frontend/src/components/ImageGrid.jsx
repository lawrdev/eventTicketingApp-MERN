// import {useEffect} from 'react'
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";

function ImageGrid({ images }) {
  return images.length > 0 ? (
    <>
      <Box sx={{ flexGrow: 1 }} className="w-full">
        <Grid
          container
          spacing={{ xs: 1, sm: 1.5 }}
          columns={{ xs: 2, sm: 4, md: 12 }}
        >
          {images.map((img, index) => (
            <Grid xs={2} sm={2} md={4} key={index}>
              <div className="imageGridImgWrapper">
                <img src={img} alt="selected" className="imageGridImg" />
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  ) : null;
}

export default ImageGrid;
