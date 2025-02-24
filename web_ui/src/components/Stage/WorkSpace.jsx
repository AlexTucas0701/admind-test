import {useDispatch, useSelector} from "react-redux";
import {Box} from "@mui/material";
import ImageBar from "../Common/ImageBar";
import {useEffect} from "react";
import {clearMergedPortrait} from "../../redux/portraitSlice";

const WorkSpace = () => {
  const {merged_portrait}= useSelector(state => state.portrait);
  const {background}= useSelector(state => state.background);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearMergedPortrait());
  }, [background.key, dispatch]);

  return (
    <Box
      sx={{
        width: "calc(100vw - 349px)",
        height: "calc(100vh - 269px)",
        margin: "0",
        padding: "0",
        border: "none",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <ImageBar
        image={merged_portrait}
        sx={{
          maxWidth: "calc(100vw - 348px)",
          maxHeight: "calc(100vh - 269px)",
          margin: "auto",
        }}
      />
    </Box>
  );
};

export default WorkSpace;
