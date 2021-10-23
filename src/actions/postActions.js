import axios from "axios";
import { postRouteStaging } from '../constants/urls';

export const GET_POSTS = 'GET_POSTS';
export const GET_A_POST = 'GET_A_POST';
export const ADD_POST = 'ADD_A_POST';
export const GET_POSTS_FOR_A_TAG = 'GET_POST_FOR_A_TAG';
export const SEARCH_POSTS = 'SEARCH_POSTS';


export const getAllPosts = async (page = 1) => {
    let url;
    page === 1 ? url = postRouteStaging : url = postRouteStaging + `?page=${page}`;
    const response = await axios.get(url);
    const posts = await response.data;
    return posts;
};

export const getAPost = async  (slug = 'welcome') => {
    let url = postRouteStaging;
    url = url + '/' + slug;
    const response = await axios.get(url);
    const post = await response.data;
    return post;
};

export const addPost = async (postDetails={}) => {
    let url = postRouteStaging;
    const response = await axios.post(url, postDetails);
    const post = await response.data;
    return post;
};

export const getPostsMatchingTag = async (tag = 'Backend development', page=1) => {
    let url;
    url = postRouteStaging + `/tags?tag=${tag}&page=${page}`;
    const response = await axios.get(url);
    const posts = await response.data;
    return posts;
};

export const search = async (query = 'backend development', page = 1) => {
    let url;
    url = postRouteStaging + `/search?query=${query}&page=${page}`;
    const response = await axios.get(url);
    const posts = await response.data;
    return posts;

};