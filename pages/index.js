import { createClient } from "contentful";
import Link from "next/link";
import Post from "../components/Post";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import { useState } from "react";
export async function getStaticProps() {
  const client = createClient({
    space: "l8hvjl5jmdb6",
    accessToken: "zKDgk4EQgJdVqSGHJc4EfQzLtXELAkpO6NUWSAZotxg",
  });

  const response = await client.getEntries({ content_type: "blog" });

  return {
    props: {
      blogList: response.items,
    },
    revalidate: 1,
  };
}

export default function Blogs({ blogList }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const [blogs, setBlogs] = useState(blogList);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //need to export it
  return (
    <>
      <Header />
      <div className="allpostsclick" onClick={() => setBlogs(blogList)}>
        <span
          style={{
            display: "inline-block",
            margin: `10px`,
            borderBottom: `2px solid blue`,
            cursor: "pointer",
            fontFamily: "monospace",
          }}
        >
          All posts
        </span>
      </div>

      <div className="posts">
        {currentBlogs.map((blog) => (
          <div key={blog.sys.id}>
            <Post
              blog={blog}
              blogs={blogs}
              setBlogs={setBlogs}
              key={blog.sys.id}
            />
          </div>
        ))}
        {blogs.length == 0 && (
          <h1 style={{ textAlign: "center", fontSize: ` calc(1vw + 12px)` }}>
            No posts to show yet :(
          </h1>
        )}

        <style jsx>{`
          .posts {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
            grid-gap: 50px;
          }
          .allpostsclick {
            background: red;
          }
        `}</style>
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={blogs.length}
        paginate={paginate}
      />
    </>
  );
}
