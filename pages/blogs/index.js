import { createClient } from "contentful";
import Link from "next/link";
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
      revalidate: 1,
    },
  };
}

function index({ blogs }) {
  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.sys.id}>
          <Link href={"/blogs/" + blog.fields.slug}> Read more</Link>

          <Image
            src={`https:` + blog.fields.images.fields.file.url}
            width={400}
            height={400}
          />
        </div>
      ))}
    </div>
  );
}

export default index;
