import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
    Box, Typography, TextField, Button,
    Avatar, Chip, Divider, Alert, CircularProgress
} from "@mui/material"

function UserProfile() {

    const dispatch = useDispatch()

    // 👉 Connect your Redux state here
    const user = useSelector(state => state.authentication.authentication.user)
    console.log(user, "USER FROM USERPROFILE")
    const loading = useSelector(state => state.authentication.loading)

    const [editMode, setEditMode] = useState(false)
    const [serverError, setServerError] = useState("")
    const [successMsg, setSuccessMsg] = useState("")

    const [formData, setFormData] = useState({
        name: "",
        email: "",
    })

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
            })
        }
    }, [user])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // 👉 Add your updateProfile thunk dispatch here
    const handleSubmit = async (e) => {
        e.preventDefault()
        setServerError("")
        setSuccessMsg("")
        try {
            // await dispatch(updateProfile(formData)).unwrap()
            setSuccessMsg("Profile updated successfully")
            setEditMode(false)
        } catch (error) {
            setServerError(error?.message || "Something went wrong")
        }
    }

    if (!user) {
        return (
            <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress sx={{ color: "blue" }} />
            </Box>
        )
    }

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", pt: 12, pb: 6, px: 2 }}>
            <Box sx={{ maxWidth: 600, mx: "auto", display: "flex", flexDirection: "column", gap: 3 }}>

                {/* Header Card */}
                <Box sx={{ bgcolor: "white", borderRadius: 3, boxShadow: 1, p: 4, display: "flex", alignItems: "center", gap: 3 }}>
                    <Avatar sx={{ width: 72, height: 72, bgcolor: "blue", fontSize: 28, fontWeight: 700 }}>
                        {user?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>{user?.name}</Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>{user?.email}</Typography>
                        <Chip label={user?.role} size="small" sx={{ bgcolor: "#FFF4EC", color: "blue", fontWeight: 600, textTransform: "capitalize" }} />
                    </Box>
                </Box>

                {/* Profile Details Card */}
                <Box sx={{ bgcolor: "white", borderRadius: 3, boxShadow: 1, p: 4 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>Profile Details</Typography>
                        <Button
                            variant={editMode ? "outlined" : "contained"}
                            size="small"
                            onClick={() => { setEditMode(!editMode); setServerError(""); setSuccessMsg("") }}
                            sx={{
                                borderRadius: 2, fontWeight: 700,
                                ...(editMode
                                    ? { borderColor: "blue", color: "blue" }
                                    : { bgcolor: "blue", "&:hover": { bgcolor: "gray" } })
                            }}
                        >
                            {editMode ? "Cancel" : "Edit Profile"}
                        </Button>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {serverError && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{serverError}</Alert>}
                    {successMsg && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>{successMsg}</Alert>}

                    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                        <TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleChange} disabled={!editMode} size="small" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                        <TextField fullWidth label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} disabled={!editMode} size="small" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                        <TextField fullWidth label="Role" value={user?.role || ""} disabled size="small" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                        <TextField
                            fullWidth label="Member Since"
                            value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" }) : ""}
                            disabled size="small"
                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                        />
                        {editMode && (
                            <Button type="submit" variant="contained" fullWidth disabled={loading}
                                sx={{ mt: 1, py: 1.5, borderRadius: 2, fontWeight: 700, bgcolor: "blue", "&:hover": { bgcolor: "gray" } }}>
                                {loading ? <CircularProgress size={22} color="inherit" /> : "Save Changes"}
                            </Button>
                        )}
                    </Box>
                </Box>

                {/* Account Info Card */}
                <Box sx={{ bgcolor: "white", borderRadius: 3, boxShadow: 1, p: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Account Info</Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2" color="text.secondary">User ID</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 11, color: "text.secondary" }}>{user?.id}</Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2" color="text.secondary">Account Type</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, textTransform: "capitalize" }}>{user?.role}</Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2" color="text.secondary">Last Updated</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" }) : ""}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Box>
    )
}

export default UserProfile