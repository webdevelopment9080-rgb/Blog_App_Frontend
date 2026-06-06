import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router"
import {
    Box, Typography, Avatar, Chip,
    CircularProgress, Alert, Button, Divider
} from "@mui/material"
import { deleteBlog, getBlog } from "../features/blogSlice/blogSlice"

function SingleBlog() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    const { blogs: allBlogs, loading, error } = useSelector(state => state.blog)




    let singleBlog = allBlogs.find((eachBlog)=>{
        return eachBlog.id === id
    }) ;

    console.log( allBlogs)
    const loggedInUser = useSelector(state => state.authentication.authentication.user)

    useEffect(() => {
        if (!singleBlog || singleBlog.id !== id) {
            dispatch(getBlog(id))
        }
    }, [id])

    const formatDate = (dateStr) => {
        if (!dateStr) return ""
        return new Date(dateStr).toLocaleDateString("en-PK", {
            year: "numeric", month: "long", day: "numeric"
        })
    }

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return
        try {
            await dispatch(deleteBlog(id)).unwrap()
            navigate("/")
        } catch (error) {
            console.log(error, "Error deleting blog")
        }
    }

    // Loading
    if (loading ) {
        return (
            <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress sx={{ color: "blue" }} />
            </Box>
        )
    }

    // Error
    if (error) {
        return (
            <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", px: 2 }}>
                <Alert severity="error">Failed to load blog. Please try again.</Alert>
            </Box>
        )
    }

    // Not found
    if (!singleBlog) return null

    // Check if logged in user is the author
    const isAuthor = loggedInUser && loggedInUser.id === singleBlog.userId

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", pt: 10, pb: 8, px: 2 }}>
            <Box sx={{ maxWidth: 800, mx: "auto" }}>

                {/* Back button */}
                <Button
                    onClick={() => navigate("/")}
                    sx={{ color: "blue", fontWeight: 700, mb: 3, pl: 0 }}
                >
                    ← Back to Blogs
                </Button>

                {/* Main card */}
                <Box sx={{ bgcolor: "white", borderRadius: 3, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", overflow: "hidden" }}>

                    {/* Cover Image */}
                    {singleBlog.coverImage && (
                        <Box
                            component="img"
                            src={singleBlog.coverImage}
                            alt={singleBlog.title}
                            sx={{
                                width: "100%",
                                height: { xs: 220, md: 400 },
                                objectFit: "cover",
                                display: "block"
                            }}
                        />
                    )}

                    <Box sx={{ p: { xs: 3, md: 5 } }}>

                        {/* Title */}
                        <Typography variant="h4" sx={{
                            fontWeight: 800,
                            color: "text.primary",
                            lineHeight: 1.3,
                            mb: 3
                        }}>
                           {singleBlog.title}
                        </Typography>

                        {/* Author + Date + Delete */}
                        <Box sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 2,
                            mb: 3
                        }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                <Avatar sx={{ width: 36, height: 36, bgcolor: "blue", fontSize: 14, fontWeight: 700 }}>
                                    {singleBlog.USER?.name?.charAt(0).toUpperCase()}
                                </Avatar>
                                <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                        {singleBlog.USER?.name || "Unknown"}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {formatDate(singleBlog.createdAt)}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Chip
                                    label={singleBlog.USER?.role || "author"}
                                    size="small"
                                    sx={{ bgcolor: "#FFF4EC", color: "blue", fontWeight: 600, textTransform: "capitalize" }}
                                />

                                {/* Delete button — only visible to the author */}
                                {isAuthor && (
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        color="error"
                                        onClick={handleDelete}
                                        sx={{ borderRadius: 2, fontWeight: 700 }}
                                    >
                                        Delete
                                    </Button>
                                )}
                            </Box>
                        </Box>

                        <Divider sx={{ mb: 4 }} />

                        {/* Full Content */}
                        <Typography variant="body1" sx={{
                            color: "text.secondary",
                            lineHeight: 1.9,
                            fontSize: "1.05rem",
                            whiteSpace: "pre-line"
                        }}>
                            {singleBlog.content}
                        </Typography>

                    </Box>
                </Box>

            </Box>
        </Box>
    )
}

export default SingleBlog 