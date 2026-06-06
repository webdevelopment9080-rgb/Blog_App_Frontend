import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../Services/api";


// Get All Blogs
export const getBlogs = createAsyncThunk('/getBlogs', async (_ , thunkAPI)=>{
    try {
        
        let response = await api.get('/blogs');
        return response.data.data;

    } catch (error) {
        console.log(error)
        return thunkAPI.rejectWithValue(error.response.data || "Error in fetching Blogs")
    }
})

// Get One Blog

export const getBlog = createAsyncThunk('/getBlog', async (id, thunkAPI)=>{
try {
    
     let response = await api.get(`/blogs/${id}`);

     return response.data.data;

} catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error.response.data || "Error in fetching blog")
}
})


// Create Blog

export const createBlog = createAsyncThunk('/createBlog', async (formData, thunkAPI)=>{
  try {
    let response = await api.post("/blogs/create", formData, {
        headers:{
            "Content-Type":'multipart/form-data'
        }
    }
    
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(
      error.response.data || "Error in creating Blog"
    );
  }
})

  // Update Blog
  // async thunk 👇





 export const updateBlog = createAsyncThunk('/updateBlog', async ({ id , formData}, thunkAPI)=>{

    try {

        let response = await api.patch(`/blogs/${id}`, formData, {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })



        return response.data.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data || "Error in updating blog")
    }
 })





// Delete Blog

export const deleteBlog = createAsyncThunk('/deleteBlog', async (id, thunkAPI)=>{
try {
    
    let response = await api.delete(`/blogs/${id}`);

    return response.data.data;
} catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data || "Error in deleting blog")
}
})



let initialState = {
    loading:false,
    blogs:[],
    error: null
}

let blogSlice = createSlice({

    name:"blogSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

        // Get all blogs

        builder.addCase(getBlogs.pending, (state)=>{

            state.loading = true;
            state.error = null;

        }) 

        builder.addCase(getBlogs.fulfilled, (state, action)=>{

            state.loading = false;
            state.blogs = action.payload

        })
        builder.addCase(getBlogs.rejected, (state, action)=>{

            state.loading = false;
            state.error = action.payload;
        })


        // Get One Blog

        builder.addCase(getBlog.pending, (state)=>{
            state.loading = true;
            state.error = null;
        } )

        builder.addCase(getBlog.fulfilled, (state, action)=>{
            state.loading = false;
            state.blogs = [
                ...state.blogs,
                action.payload
            ]
        })

        builder.addCase(getBlog.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Create Blog

        builder.addCase(createBlog.pending, (state)=>{
            state.loading = true;
            state.error = null
        })

        builder.addCase(createBlog.fulfilled, (state, action)=>{
            state.loading = false;
            state.blogs = [
                ...state.blogs,
                action.payload
            ]
        })

        builder.addCase(createBlog.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Update Blog
        // Extra Reducer 👇

        builder.addCase(updateBlog.pending, (state, action)=>{

            state.loading = true;
            state.error = null;

        })

        builder.addCase(updateBlog.fulfilled, (state, action)=>{
            state.loading = false;

            state.blogs = state.blogs.map((eachBlog)=>{
                return eachBlog.id === action.payload.id ? action.payload : eachBlog
            })
        })

        // Delete Blog

        builder.addCase(deleteBlog.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })

        builder.addCase(deleteBlog.fulfilled, (state, action)=>{
            state.loading = false;
            state.blogs = state.blogs.filter((eachBlog)=>{

                return eachBlog.id !== action.payload
            })
        })

        builder.addCase(deleteBlog.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default blogSlice.reducer