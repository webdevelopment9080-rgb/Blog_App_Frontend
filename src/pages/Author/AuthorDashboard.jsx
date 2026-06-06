import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ArticleIcon from "@mui/icons-material/Article";
import LogoutIcon from "@mui/icons-material/Logout";

import { deleteBlog, getBlogs } from "../../features/blogSlice/blogSlice";
import { logout } from "../../features/authenticationSlice/authenticationSlice";

function AuthorDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blogs, loading, error } = useSelector((state) => state.blog);
  const user = useSelector(
    (state) => state.authentication.authentication.user
  );

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Filter only this author's blogs
  const myBlogs = blogs.filter((blog) => blog.userId === user?.id);

  useEffect(() => {
    dispatch(getBlogs());
    
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    setSelectedBlogId(id);
    setDeleteDialogOpen(true);
   console.log(id, "ID from author dashboard")
  };

  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    try {
      await dispatch(deleteBlog(selectedBlogId)).unwrap();
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteLoading(false);
      setDeleteDialogOpen(false);
      setSelectedBlogId(null);
    }
  };

  const handleLogout = () => {
    dispatch(logout);
    navigate("/login");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9fafb" }}>
      {/* Top Navbar */}
      {/* <Box
        sx={{
          bgcolor: "white",
          borderBottom: "1px solid #e5e7eb",
          px: 4,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: "1.3rem",
            color: "#111",
            letterSpacing: "-0.5px",
          }}
        >
          ✍️ Author Dashboard
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: "#6366f1",
              width: 34,
              height: 34,
              fontSize: "0.85rem",
            }}
          >
            {user?.name?.charAt(0).toUpperCase() || "A"}
          </Avatar>
          <Typography
            sx={{ fontWeight: 600, color: "#374151", fontSize: "0.9rem" }}
          >
            {user?.name || "Author"}
          </Typography>
          <Tooltip title="Logout">
            <IconButton
              onClick={handleLogout}
              size="small"
              sx={{ color: "#9ca3af" }}
            >
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box> */}

      {/* Main Content */}
      <Box sx={{ maxWidth: 1100, mx: "auto", px: 3, py: 5 }}>
        {/* Stats Row */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            mb: 5,
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              bgcolor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: 3,
              px: 3,
              py: 2.5,
              flex: 1,
              minWidth: 160,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                bgcolor: "#ede9fe",
                borderRadius: 2,
                p: 1.2,
                display: "flex",
              }}
            >
              <ArticleIcon sx={{ color: "#6366f1" }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  color: "#111",
                  lineHeight: 1,
                }}
              >
                {myBlogs.length}
              </Typography>
              <Typography
                sx={{ fontSize: "0.8rem", color: "#6b7280", mt: 0.3 }}
              >
                Total Blogs
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Blogs Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box>
            <Typography
              sx={{ fontWeight: 700, fontSize: "1.2rem", color: "#111" }}
            >
              My Blogs
            </Typography>
            <Typography sx={{ fontSize: "0.82rem", color: "#9ca3af", mt: 0.3 }}>
              Manage and edit your published posts
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() =>{
              
              
              navigate("/me/author/create-blog")}}
            sx={{
              bgcolor: "#6366f1",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 2,
              px: 2.5,
              "&:hover": { bgcolor: "#4f46e5" },
            }}
          >
            New Blog
          </Button>
        </Box>

        {/* Error */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error?.message || "Failed to load blogs"}
          </Alert>
        )}

        {/* Table */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress sx={{ color: "#6366f1" }} />
          </Box>
        ) : myBlogs.length === 0 ? (
          <Box
            sx={{
              bgcolor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: 3,
              py: 10,
              textAlign: "center",
            }}
          >
            <ArticleIcon sx={{ fontSize: 48, color: "#d1d5db", mb: 2 }} />
            <Typography sx={{ color: "#6b7280", fontWeight: 600 }}>
              No blogs yet
            </Typography>
            <Typography sx={{ color: "#9ca3af", fontSize: "0.85rem", mb: 3 }}>
              Write your first post and share it with the world
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/me/author/create-blog")}
              sx={{
                bgcolor: "#6366f1",
                textTransform: "none",
                fontWeight: 700,
                borderRadius: 2,
                "&:hover": { bgcolor: "#4f46e5" },
              }}
            >
              Create Blog
            </Button>
          </Box>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 3,
              boxShadow: "none",
              border: "1px solid #e5e7eb",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f9fafb" }}>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "#374151",
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Cover
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "#374151",
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Title
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "#374151",
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "#374151",
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "#374151",
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                    align="right"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myBlogs.map((blog) => (
                  <TableRow
                    key={blog.id}
                    sx={{
                      "&:hover": { bgcolor: "#fafafa" },
                      transition: "background 0.15s",
                    }}
                  >
                    {/* Cover Image */}
                    <TableCell>
                      {blog.coverImage ? (
                        <Box
                          component="img"
                          src={blog.coverImage}
                          alt={blog.title}
                          sx={{
                            width: 56,
                            height: 40,
                            objectFit: "cover",
                            borderRadius: 1.5,
                            border: "1px solid #e5e7eb",
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: 56,
                            height: 40,
                            bgcolor: "#f3f4f6",
                            borderRadius: 1.5,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <ArticleIcon
                            sx={{ fontSize: 18, color: "#d1d5db" }}
                          />
                        </Box>
                      )}
                    </TableCell>

                    {/* Title */}
                    <TableCell>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: "#111",
                          fontSize: "0.9rem",
                          maxWidth: 300,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {blog.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#9ca3af",
                          fontSize: "0.78rem",
                          mt: 0.3,
                          maxWidth: 300,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {blog.content?.substring(0, 60)}...
                      </Typography>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Chip
                        label="Published"
                        size="small"
                        sx={{
                          bgcolor: "#d1fae5",
                          color: "#065f46",
                          fontWeight: 600,
                          fontSize: "0.72rem",
                        }}
                      />
                    </TableCell>

                    {/* Date */}
                    <TableCell>
                      <Typography
                        sx={{ color: "#6b7280", fontSize: "0.82rem" }}
                      >
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </Typography>
                    </TableCell>

                    {/* Actions */}
                    <TableCell align="right">
                      <Box
                        sx={{
                          display: "flex",
                          gap: 0.5,
                          justifyContent: "flex-end",
                        }}
                      >
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => navigate(`/me/author/edit-blog/${blog.id}`)}
                            sx={{
                              color: "#6366f1",
                              "&:hover": { bgcolor: "#ede9fe" },
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(blog.id)}
                            sx={{
                              color: "#ef4444",
                              "&:hover": { bgcolor: "#fee2e2" },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: "#111" }}>
          Delete Blog?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#6b7280" }}>
            This action cannot be undone. The blog will be permanently removed.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: 2, px: 3, gap: 1 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{ textTransform: "none", color: "#6b7280", fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            disabled={deleteLoading}
            sx={{
              bgcolor: "#ef4444",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 2,
              "&:hover": { bgcolor: "#dc2626" },
            }}
          >
            {deleteLoading ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AuthorDashboard;
