import { createContext, useReducer, useState } from 'react';
import { postReducer } from '../reducers/postReducer';
import { apiUrl } from './constants';
import axios from 'axios';

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    // State
    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postsLoading: true,
    });

    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null,
    });

    // Get all posts
    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts`);
            if (response.data.success) {
                dispatch({ type: 'POST_LOADED_SUCCESS', payload: response.data.posts });
            }
        } catch (err) {
            dispatch({ type: 'POST_LOADED_FAIL' });
        }
    };

    // Add post
    const addPost = async (newPost) => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, newPost);
            if (response.data.success) {
                dispatch({ type: 'ADD_POST_SUCCESS', payload: response.data.post });
            }
            return response.data;
        } catch (err) {
            return err.response.data ? err.response.data : { success: false, message: 'Server error' };
        }
    };

    // Delete post
    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${postId}`);
            if (response.data.success) {
                dispatch({ type: 'DELETE_POST', payload: postId });
            }
        } catch (err) {
            console.log(err);
        }
    };

    // Find post when user is updating post
    const findPost = (postId) => {
        const post = postState.posts.find((post) => post._id === postId);
        dispatch({ type: 'FIND_POST', payload: post });
    };

    // Update post
    const updatePost = async (updatedPost) => {
        try {
            const response = await axios.put(`${apiUrl}/posts/${updatedPost._id}`, updatedPost);
            if (response.data.success) {
                dispatch({ type: 'UPDATE_POST', payload: response.data.post });
                return response.data;
            }
        } catch (err) {
            return err.response.data ? err.response.data : { success: false, message: 'Server error' };
        }
    };

    // Posts context data
    const postContextData = {
        postState,
        getPosts,
        showAddPostModal,
        setShowAddPostModal,
        showUpdatePostModal,
        setShowUpdatePostModal,
        addPost,
        showToast,
        setShowToast,
        deletePost,
        findPost,
        updatePost,
    };

    return <PostContext.Provider value={postContextData}>{children}</PostContext.Provider>;
};

export default PostContextProvider;
