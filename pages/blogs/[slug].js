import { createClient } from "contentful";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import PostDetails from "../../components/PostDetails";
import Image from "next/image";
import { useRouter } from "next/router";

const client = createClient({
  space: "l8hvjl5jmdb6",
  accessToken: "zKDgk4EQgJdVqSGHJc4EfQzLtXELAkpO6NUWSAZotxg",
});

export async function getStaticPaths() {
  const res = await client.getEntries({ content_type: "blog" });

  const paths = res.items.map((item) => {
    return {
      params: {
        slug: item.fields.slug,
      },
    };
  });
  return {
    paths: paths,
    fallback: true, //shows a 404 page instead a fallback page
  };
}

export async function getStaticProps({ params }) {
  //props is the path.params (above)
  const { items } = await client.getEntries({
    //get res.item
    content_type: "blog",
    "fields.slug": params.slug,
  });
  return {
    props: {
      blog: items[0],
    },
    revalidate: 1,
  };
}

export default function Details({ blog }) {
  const renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        // render the EMBEDDED_ASSET as you need
        return (
          <div className="imageWrapper">
            <Image
              className="img"
              src={`https:${node.data.target.fields.file.url}`}
              height={600}
              width={800}
              alt={node.data.target.fields.description}
            />
          </div>
        );
      },
    },
  };

  const router = useRouter();
  if (!blog) return <h1>loading</h1>;

  return (
    <div className="post">
      <div className="home" onClick={() => router.push("/")}>
        Home
      </div>

      <div className="title">{blog.fields.title}</div>

      <div className="postText">
        {documentToReactComponents(blog.fields.post, renderOptions)}
      </div>
      <style jsx>{`
        .home {
          display: inline-block;
          position: absolute;
          left: 10px;
          top: 10px;
          font-size: 13px;
          color: white;
          padding: 0.3rem;
          cursor: pointer;
          border-radius: 3px;
          background: rgb(0, 110, 200);
        }

        .title {
          margin-top: 2rem;
          text-align: center;
          font-size: calc(1vw + 12px);
          font-weight: bold;
          font-family: "Poppins", sans-serif;
          margin-bottom: 20px;
        }

        .imgWrapper {
          max-width: 800px;
          width: 100%;
          margin: 0 auto;
          padding: 1rem;
        }

        .postText {
          position: relative;
        }
      `}</style>
    </div>
  );
}
