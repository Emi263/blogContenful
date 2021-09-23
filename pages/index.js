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
    space: process.env.NEXT_PUBLIC_VERCEL_SPACE,
    accessToken: process.env.NEXT_PUBLIC_VERCEL_TOKEN,
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
      <div
        style={{ position: "relative", width: `100%` }}
        className="allpostsclick"
        onClick={() => setBlogs(blogList)}
      >
        <span
          style={{
            position: "relative",
            display: "inline-block",
            margin: `10px`,
            borderBottom: `2px dashed blue`,
            cursor: "pointer",
            fontSize: `calc(1vw + 10px)`,
            fontFamily: "monospace",
            color: "purple",
            background: "blue",
            color: "white",
            padding: ".2rem",
            borderRadius: "5px",
          }}
        >
          All posts
        </span>
      </div>

      <div className="posts">
        {currentBlogs.map((blog) => (
          <div key={blog.sys.id}>
            <Post
              setCurrentPage={setCurrentPage}
              blog={blog}
              blogs={blogList}
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
            justify-content: center;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 400px));
            grid-gap: 30px;
          }
          .allpostsclick {
            background: red;
          }

          @media screen and (min-width: 700px) {
            .posts {
              grid-template-columns: repeat(auto-fit, minmax(300px, 0.5fr));
            }
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
