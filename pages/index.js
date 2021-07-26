import { createClient } from "contentful";
import Link from "next/link";
import Post from "../components/Post";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
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
  //need to export it
  return (
    <div className="posts">
      {blogs.map((blog) => (
        <div key={blog.sys.id}>
          <Post blog={blog} />
        </div>
      ))}

      <style jsx>{`
        .posts {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        }
      `}</style>
    </div>
  );
}
