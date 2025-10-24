import { Fab, useScrollTrigger, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React from "react";

const AutoScroll: React.FC = () => {
  const handleScrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Zoom in={useScrollTrigger({ threshold: 100 })}>
      <Fab
        onClick={handleScrollToTop}
        variant="extended"
        size="small"
        sx={{
          transition: "all 0.3s ease-in-out",
          position: "fixed",
          right: { xs: 16, md: 24 }, // right spacing
          bottom: { xs: 94, md: 24 }, // xs→md = pb-20 (80px), md+ = pb-0
          bgcolor: "primary.main",
          overflow: "hidden",
          "&:hover": {
            bgcolor: "light",
            "& .arrow-icon": {
              transform: "translateY(-100%)",
            },
          },
        }}
        color="primary"
        aria-label="scroll to top"
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            transition: "transform 0.3s ease-in-out",
          }}
          className="arrow-icon"
        >
          <KeyboardArrowUpIcon fontSize="medium" sx={{ flex: "0 0 100%" }} />
          <KeyboardArrowUpIcon fontSize="medium" sx={{ flex: "0 0 100%" }} />
        </div>
      </Fab>
    </Zoom>
  );
};

export default AutoScroll;
