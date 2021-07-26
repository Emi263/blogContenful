import { createClient } from "contentful";
import Link from "next/link";
import Post from "../components/Post";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Header from "../components/Header";
export async function getStaticProps() {
  const client = createClient({
    space: "l8hvjl5jmdb6",
    accessToken: "zKDgk4EQgJdVqSGHJc4EfQzLtXELAkpO6NUWSAZotxg",
  });

  const response = await client.getEntries({ content_type: "blog" });

  return {
    props: {
      blogs: response.items,
    },
    revalidate: 1,
  };
}

export default function Blogs({ blogs }) {
  console.log(blogs);
  //need to export it
  return (
    <>
      <Header />
      <div className="posts">
        {blogs.map((blog) => (
          <div key={blog.sys.id}>
            <Post blog={blog} />
          </div>
        ))}
        {blogs.length == 0 && (
          <h1 style={{ textAlign: "center", fontSize: ` calc(1vw + 12px);` }}>
            No posts to show yet :(
          </h1>
        )}

        <style jsx>{`
          .posts {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            grid-gap: 50px;
          }
        `}</style>
      </div>
    </>
  );
}
