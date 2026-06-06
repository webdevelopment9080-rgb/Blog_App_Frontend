import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Pagination,
} from "@mui/material";
import { useState } from "react";
import { getBlogs } from "../../features/blogSlice/blogSlice";

function Homepage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blogs, loading, error } = useSelector((state) => state.blog);

  const [page, setPage] = useState(1);
  const blogsPerPage = 8;

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  // Paginate blogs on frontend
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const paginatedBlogs = blogs.slice(
    (page - 1) * blogsPerPage,
    page * blogsPerPage
  );

  const handlePageChange = (e, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Trim content to a short preview
  const getPreview = (content, limit = 100) => {
    if (!content) return "";
    return content.length > limit ? content.slice(0, limit) + "..." : content;
  };

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-PK", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", pt: 10, pb: 8, px: 2 }}>
      <Box sx={{ maxWidth: 1100, mx: "auto" }}>
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: "text.primary", mb: 1 }}
          >
            Latest Blogs
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Read the latest posts from our authors
          </Typography>
        </Box>

        {/* Loading */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
            <CircularProgress sx={{ color: "#E8720C" }} />
          </Box>
        )}

        {/* Error */}
        {error && !loading && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            Failed to load blogs. Please try again.
          </Alert>
        )}

        {/* Empty state */}
        {!loading && !error && blogs.length === 0 && (
          <Box sx={{ textAlign: "center", mt: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No blogs yet. Be the first to write one!
            </Typography>
          </Box>
        )}

        {/* Blog Grid */}
        {!loading && paginatedBlogs.length > 0 && (
          <Grid container spacing={3} justifyContent="center">
            {paginatedBlogs.map((blog) => (
              <Grid item xs={12} sm={6} md={3} key={blog.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 24px rgba(232,114,12,0.15)",
                    },
                  }}
                >
                  {/* Cover Image */}
                  <CardMedia
                    component="img"
                    height="200"
                    image={
                      blog.coverImage ||
                      "https://placehold.co/600x400/E8720C/ffffff?text=No+Cover"
                    }
                    alt={blog.title}
                    sx={{ objectFit: "cover" }}
                  />

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    {/* Author + Date */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1.5,
                      }}
                    >
                      <Chip
                        label={blog.USER?.name || "Unknown"}
                        size="small"
                        sx={{
                          bgcolor: "#FFF4EC",
                          color: "#E8720C",
                          fontWeight: 600,
                          fontSize: 11,
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(blog.createdAt)}
                      </Typography>
                    </Box>

                    {/* Title */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        fontSize: "1rem",
                        lineHeight: 1.4,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {blog.title}
                    </Typography>

                    {/* Content Preview */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {getPreview(blog.content)}
                    </Typography>
                  </CardContent>

                  {/* Read More */}
                  <CardActions sx={{ px: 3, pb: 3 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => navigate(`/blogs/${blog.id}`)}
                      sx={{
                        borderColor: "#E8720C",
                        color: "#E8720C",
                        borderRadius: 2,
                        fontWeight: 700,
                        "&:hover": {
                          bgcolor: "#E8720C",
                          color: "white",
                        },
                      }}
                    >
                      Read More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              sx={{
                "& .MuiPaginationItem-root": {
                  "&.Mui-selected": {
                    bgcolor: "#E8720C",
                    color: "white",
                    "&:hover": { bgcolor: "#C45E08" },
                  },
                },
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Homepage;
