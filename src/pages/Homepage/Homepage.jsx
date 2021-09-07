import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import BlogTiles from '../../components/BlogTitles/BlogTiles';
import styles from './Homepage.module.scss';

function Homepage(){
    const [blogArr, setBlogArr] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [id, setId] = useState('');

    const url = "https://blog-hosted-backend-server.herokuapp.com/blogs";

    useEffect(()=>{
        fetch(url)
        .then((response)=> response.json())
        .then((data)=>{
            console.log(data.data);
            setBlogArr(data.data);
        })
    },[])

    const clickHandler = (event) => {
        console.log('Hey ', event.target.parentElement.id);
        setId(event.target.parentElement.id);
        setRedirect(true);
    }

    return <div className={styles.blogContainer}>
    {
        redirect ? 
        <Redirect to={`/${id}`} id={id}/>
        :
        blogArr.map((item) => (
            <BlogTiles key={item.blogId} id={item.blogId} item={item} onClick={clickHandler}/>
        ))
    }
    </div>
}

export default Homepage;