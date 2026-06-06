import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import {
    Box, TextField, Button, Typography,
    Alert, CircularProgress
} from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { createBlog, updateBlog } from "../features/blogSlice/blogSlice"


function BlogForm({ mode = "create" }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
const { id } = useParams()

    const { loading, error } = useSelector(state => state.blog)
   
    const allBlogs = useSelector(state => state.blog.blogs)
    
    const singleBlog = allBlogs.find((eachBlog)=>{
        return eachBlog.id === id
    })


    const [imagePreview, setImagePreview] = useState(null)
    const [serverError, setServerError] = useState("")

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm()

    // If editing, pre-fill the form with existing blog data
    useEffect(() => {
        if (mode === "edit" && singleBlog) {
            setValue("title", singleBlog.title)
            setValue("content", singleBlog.content)
            // Show existing image as preview
            if (singleBlog.coverImage) {
                setImagePreview(singleBlog.coverImage)
            }
        }
    }, [mode, singleBlog, setValue])

    const onSubmit = async (data) => {
        setServerError("")
        try {
            // Build FormData — required for file upload
            const formData = new FormData()
           
            formData.append("title", data.title)
            formData.append("content", data.content)

            // Only append image if user selected a new one
            if (data.coverImage && data.coverImage[0]) {
                formData.append("coverImage", data.coverImage[0])
            }

            if (mode === "create") {
                await dispatch(createBlog(formData)).unwrap()
                navigate("/")
            } else if (mode === "edit") {
                await dispatch(updateBlog({ id, formData })).unwrap()
                navigate("/")
            }

        } catch (error) {
            setServerError(error?.message || "Something went wrong")
        }
    }

    return (
        <Box sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
            bgcolor: "#f5f5f5"
        }}>
            <Box sx={{
                width: "100%",
                maxWidth: 600,
                bgcolor: "white",
                borderRadius: 3,
                boxShadow: 3,
                p: 4
            }}>

                {/* Title */}
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {mode === "create" ? "Create Blog" : "Edit Blog"}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {mode === "create"
                        ? "Share your thoughts with the world"
                        : "Update your blog post"}
                </Typography>

                {/* Server error */}
                {serverError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {serverError}
                    </Alert>
                )}

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                >
                    {/* Title field */}
                    <Controller
                        name="title"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Title is required" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Blog Title"
                                error={!!errors.title}
                                helperText={errors.title?.message}
                                size="small"
                            />
                        )}
                    />

                    {/* Content field */}
                    <Controller
                        name="content"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Content is required" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Content"
                                multiline
                                rows={6}
                                error={!!errors.content}
                                helperText={errors.content?.message}
                            />
                        )}
                    />

                    {/* Cover image */}
                    <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Cover Image {mode === "edit" && "(leave empty to keep existing)"}
                        </Typography>

                        {/* Image preview */}
                        {imagePreview && (
                            <Box sx={{ mb: 1.5 }}>
                                <img
                                    src={imagePreview}
                                    alt="Cover preview"
                                    style={{
                                        width: "100%",
                                        height: 200,
                                        objectFit: "cover",
                                        borderRadius: 8,
                                        border: "1px solid #e0e0e0"
                                    }}
                                />
                            </Box>
                        )}

                        <Controller
                            name="coverImage"
                            control={control}
                            defaultValue="coverImage"
                            render={({ field: { onChange } }) => (
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        onChange(e.target.files)
                                        // Show preview of newly selected image
                                        if (e.target.files[0]) {
                                            setImagePreview(URL.createObjectURL(e.target.files[0]))
                                        }
                                    }}
                                    style={{ width: "100%" }}
                                />
                            )}
                        />
                    </Box>

                    {/* Submit */}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={isSubmitting || loading}
                        sx={{ mt: 1, py: 1.5, fontWeight: 700 }}
                    >
                        {isSubmitting || loading
                            ? <CircularProgress size={22} color="inherit" />
                            : mode === "create" ? "Publish Blog" : "Save Changes"}
                    </Button>

                </Box>
            </Box>
        </Box>
    )
}

export default BlogForm
