import React from "react";
import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, GitHub } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 4,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        {/* Top Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Brand / About */}
          <Typography variant="h6">MyWebsite</Typography>

          {/* Navigation Links */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Link href="#" color="inherit" underline="hover">
              Home
            </Link>
            <Link href="#" color="inherit" underline="hover">
              About
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Contact
            </Link>
          </Box>

          {/* Social Icons */}
          <Box>
            <IconButton color="inherit">
              <Facebook />
            </IconButton>
            <IconButton color="inherit">
              <Twitter />
            </IconButton>
            <IconButton color="inherit">
              <Instagram />
            </IconButton>
            <IconButton color="inherit">
              <GitHub />
            </IconButton>
          </Box>
        </Box>

        {/* Bottom Section */}
        <Box
          sx={{
            textAlign: "center",
            mt: 3,
            borderTop: "1px solid rgba(255,255,255,0.2)",
            pt: 2,
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} MyWebsite. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
