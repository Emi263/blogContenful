import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import PostDetails from "../../components/PostDetails";
import Image from "next/image";
import { useRouter } from "next/router";
const client = createClient({
  space: "l8hvjl5jmdb6",
  accessToken: "zKDgk4EQgJdVqSGHJc4EfQzLtXELAkpO6NUWSAZotxg",
});

export const getStaticPaths = async () => {
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
};

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
  console.log(blog);
  const router = useRouter();
  if (!blog) return <h1>loading</h1>;

  return (
    <div className="post">
      <div className="home" onClick={() => router.push("/")}>
        Go back home
      </div>

      <div className="title">{blog.fields.title}</div>
      <div className="imgWrapper">
        <Image
          src={`https:` + blog.fields.images.fields.file.url}
          width={500}
          height={400}
          objectFit="cover"
          layout="responsive"
          quality={10}
          className="img"
        />
      </div>

      <div className="postText">
        {documentToReactComponents(blog.fields.post)}
      </div>
      <style jsx>{`
        .home {
          position: absolute;
          left: 20px;
          top: 20px;
          color: #00536b;
          cursor: pointer;
        }
        .title {
          text-align: center;
          font-size: calc(1vw + 12px);
          font-weight: bold;
          font-family: monospace;
          margin-bottom: 20px;
        }

        .imgWrapper {
          max-width: 800px;
          width: 100%;
          margin: 0 auto;
          border-radius: 10px;
          padding: 1rem;
        }

        .postText {
          position: relative;
          width: 100%;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
